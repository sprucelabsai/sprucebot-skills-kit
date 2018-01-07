# Meta API
A way to store any JSON.stringify'able object and query against it.

### For when you don't quite need a database

There will come a time when you need to store some data about a guest, teammate, owner, location, or even your own skill.
The `Meta API` is a basic key/value store. As such, it can not run aggregate operations (avg, sum, etc.) on the data. If you need a more advanced data store, see [models.md](models.md).

## Meta object
```js
{
    id: UUID4,
    createdAt: Date,
    updatedAt: Date,
    key: String,
    value: *, // anything JSON.stringify'able
    LocationId: UUID4,
    SkillId: UUID4,
    UserId: UUID4
}
```

## API
```js

// fetch single Meta (returns first match)
let response = await ctx.sb.meta(key: String, {
    locationId: UUID4, // optional
    userId: UUID4, // optional (requires locationId to be set)
    sortBy: String, // createdAt|updatedAt
    order: String // ASC|DESC (defaults to DESC)
})

console.log(response) // {Meta} or null

// fetch many Metas
let response = await ctx.sb.metas({
    locationId: UUID4, // optional
    userId: UUID4, // optional (requires locationId to be set)
    value: *, // optional (can search against key in object)
    sortBy: String, // createdAt|updatedAt,
    order: String, // ASC|DESC (defaults to DESC)
    key: String, // optional
    page: Number, // optional (defaults to 0)
    limit: Number // optional (defaults to 10, max 200)
})

console.log(response) // [{Meta}, {Meta}, {Meta}] or []

// create Meta
let response = await ctx.sb.createMeta(key: String, value: *, {
    locationId: UUID4, // optional
    userId: UUID4, // optional (requires locationId to be set)
})

console.log(response) // {Meta}

// create Meta if matching one does not exist
let response = await ctx.sb.metaOrCreate(key: String, value: *, {
    locationId: UUID4, // optional
    userId: UUID4, // optional (requires locationId to be set)
});

console.log(response) // {Meta}

// create Meta if no match found, update any matches found
let response = await ctx.sb.upsertMeta(key: String, value: *, {
    locationId: UUID4, // optional
    userId: UUID4, // optional (requires locationId to be set)
});

console.log(response) // {Meta}

// delete
let response = await ctx.sb.deleteMeta(id: UUID4)

console.log(response) // {??}
```

## Values
`Meta` can store anything `JSON.stringify`able, which means anything like this works. But note how `Date`s come back as a string. Under the hood it's running `JSON.parse` when pulling the value from Sprucebot. So, if you want to know how something will work, do `JSON.stringify` tests in your favorite browser's developer console.

```js
// will save this meta "skill wide"
await ctx.sb.createMeta('my-key', {
    name: 'Sprucebot',
    today: new Date(),
    numbers: [2,2,5]
})

const meta = await ctx.sb.meta('my-key')

console.log(meta.value) // { name: 'Sprucebot', today: "2017-11-23T00:15:34.676Z", numbers: [2,2,5] }

```

## Advanced Queries
If you wanna get down and dirty, you can checkout `sprucebot-node`'s [unit tests](https://github.com/sprucelabsai/sprucebot-node/blob/dev/index.test.js). 

### Searching values
If your `meta.value` is an object, you can search inside it. Here we'll quickly create 3 `meta` objects and test querying against them.

```js
// start with 2 metas
await sb.createMeta('meta-key', {
    hello: 'world',
    world: 'hello'
}, {
    userId: teammate1.User.id
})

await sb.createMeta('meta-key', {
    hello: 'world'
}, {
    userId: teammate2.User.id
})

await sb.createMeta('meta-key', {
    hello: 'again?'
}, {
    userId: teammate3.User.id
})

// finds first 2
let matches = await sb.metas({
    value: {
        hello: 'world'
    }
})

// finds first only
matches = await sb.metas({
    value: {
        hello: 'world',
        world: 'hello'
    }
})

// finds all 
matches = await sb.metas({
    value: {
        $or: [
            { hello: 'world' },
            { hello: 'again?' }
        ]
    }
})

// first 1
matches = await sb.metas({
    userId: teammate1.User.id
})

// finds 2
matches = await sb.metas({
    userId: { $or: [teammate1.User.id, teammate2.User.id] }
})

```
## Uniqueness
`Meta.key` is **not** unique. That means, you have to ensure any `Meta` you expect to be unique, actually is. This is where `metaOrCreate` & `upsertMeta` come in handy. Something to keep in mind is the handling of race conditions in an async I/O environment like `nodejs`, e.g. 

 * An `owner` hits "Save" twice and 2 requests come in. 
 * The first request hits and you call `ctx.sb.meta()` to see if a `Meta` exists.
    * Since I\O is async, while `ctx.sb.meta()` is doing it's lookup, control is passed back to `koa-router` who is waiting for the next request.
 * The second request hits and you call `ctx.sb.meta()` and `Meta` still does not exist.
    * As this call happens, and the first call finishes, control is passed back to the first call, and the following check happens.
 * The first request does an `if(!meta)` check, and since `meta` is `null`, it'll pass and a new `Meta` will be created
 * The second request also passes `if(!meta)` because `meta` is `null`, it'll create a new `Meta`
 * Now you have 2 `Metas` that are identical

Lets create some meta we 100% want to be unique. In this example, an `owner` is saving some setting to their `Location`.
```js
// server/controllers/1.0/owner/index.js
module.exports = router => {

    router.post('/api/1.0/owner/save.json', async (ctx, next) {

        ctx.assert(typeof(ctx.request.body.someValue) === 'string', 'MISSING_SOME_VALUE')

        // because this setting is Location wide, we'll only lock for this location
        // the scenarios being same user hits submit too many times or two owners
        // are in the settings at the same time
        const waitKey = `save-some-value-${ctx.auth.Location.id}`

        try {

            // this will block all requests matching this key until go() is invoked
            await ctx.sb.wait(waitKey)

            // rather than doing a lookup, then a check, then an update, lets upsert!
            const meta = ctx.sb.upsertMeta('some-value', ctx.body.someValue, {
                locationId: ctx.auth.Location.id
            })

            // pass back whole meta and let client sort it out
            ctx.body = meta

        } catch (err) {
            console.error(err)
            ctx.throw('FAILED_TO_SAVE_SOME_VALUE')
        } finally {
            // unlock this request
            ctx.sb.go(waitKey)
        }

        // pass back to koa
        next() 

    })
}

```

## Gotchya's
 * A `Metas` `key` is **not** unique. In fact, nothing in `Meta` is unique. Meaning, you must manage uniqueness.
 * If you want to save `Meta` for a `User`, you MUST also provide a `Location`. In other words, if you set `userId`, you must set `locationId`
 * `Meta` saved to a `Location` only needs `locationId`
 * `Meta` that is available globally only needs `key` and `value`
 * Utility methods like `metaOrCreate` and `upsertMeta` are prone to race conditions with all their fetching, checking, saving, updating. Easily fixed with `ctx.sb.wait(waitKey)`
 * Don't let owners share information about teammates with owners of other businesses. That is, make sure you're keep data segmented by `locationId` nearly 100% of the time. Sharing data between `Locations` is coming soon.

## Examples

### Saving a teammate's favorite color
**Difficulty level**: Easy

**Description**: Every teammate has a favorite color, so you decide to let them save it. Then, you tell Sprucebot to text it to them whenever they show up (do not do this, ever). We will not cover any of the interface here. Assume a `<List>` of teammates with a text field next to each and a "Save" button.

**Required reading**:
 * [User](user.md)
 * [Server](server.md)
 * [Messaging](messaging.md)
 * [Lang](lang.md)
 * [Events](events.md)
 * [Errors](errors.md)

#### Saving the color
First thing we're going to do is create the route that will handle our ability to save a color.

```js
// server/controllers/1.0/teammate/index.js
module.exports = router => {

    router.post('/api/1.0/teammate/color/save.json', async (ctx, next) => {

        // make sure favorite color is a string (our only required field)
        ctx.assert(typeof(ctx.request.body.favoriteColor) === 'string', 'MISSING_FAVORITE_COLOR')

        // get the currently authed [user](user.md)
        const user = ctx.auth

        // it's good practice to lock unique requests to handle race conditions
        // e.g. someone hitting save 100x in 2 seconds
        const waitKey = `save-color-for-${user.User.id}`

        // drop everything in a try/catch/finally to ensure you can always unlock the request
        try {

            // subsequent requests will be stuck here until .go() is invoked
            await ctx.sb.wait(waitKey)

            // upsert the meta data for this user, we save location and user so this teammate can
            // save a different favorite color at their "other" job
            const meta = await ctx.sb.upsertMeta('favorite-color', ctx.request.body.favoriteColor, {
                locationId: user.Location.id,
                userId: user.User.id
            })

            // respond to the request
            ctx.body = {
                favoriteColor: meta.value
            }

        } catch(err) {

            console.error(err)
            ctx.throw('FAILED_TO_SAVE_FAVORITE_COLOR')

        } finally() {
            ctx.sb.go(waitKey)
        }


        // pass back to koa if no error
        next()
    })
}
```
#### Send the teammate their color on arrival
Or, you know, remind them to set one if they haven't.  
```js
// server/events/did-enter.js
module.exports = await (ctx, next) => {

    // grab the event
    const event = ctx.event

    // only if a teammate enters
    if (event.User.role === 'teammate') {

        // stop Sprucebot from sending the default did-enter message
        ctx.body = { preventDefault: true }
        next() // respond immediately or Sprucebot will move on (no await)

        // the favorite color (may be null)
        await favoriteColor = await ctx.sb.meta('favorite-color', {
            locationId: event.Location.id,
            userId: event.User.id
        })

        // use lang to construct the message body
        // we prefer to pass entire objects so lang can make some decisions
        const body = ctx.utilities.lang.getText('didEnterMessage', { favoriteColor, event })

        // fire the message
        await ctx.sb.message(event.Location.id, event.User.id, body, {
            linksToWebView: !favoriteColor // take them to set their color if they have not
        })

    } else {
        
        // move on
        await next()
    }



}
```
#### Define the terms
Notice we run a bit of logic in the `didEnterMessage` term. Check [lang](lang.md) for more deets.

```js
// interface/lang/default.js
module.exports = {
    didEnterMessage: ({ favoriteColor, event }) =>
        favoriteColor
            ? `Welcome back ${event.User.casualName}! Your favorite color is ${favoriteColor.value}. That's pretty alright. 👊🏼`
            : `Hey ${event.User.casualName}, why haven't you set your favorite color?`
}

```

#### Errors
We need to define our errors. This kit comes with some built in, but we will be adding our own.

```js
// config/errors.js
module.exports = {
    ...,
    MISSING_FAVORITE_COLOR: {
        code: 422,
        status: 'failure',
        reason: 'Missing parameters',
        friendlyReason: 'You forgot to tell me your favorite color!'
    },
    FAILED_TO_SAVE_FAVORITE_COLOR: {
        code: 500,
        status: 'failure',
        reason: 'Failed to save favorite color',
        friendlyReason: 'Oh no! I couldn`t save your favorite color. I\'m not sure what happened!'
    }
}

```
# What's next?
Cool, we're pretty ramped up on all the data passed to and from Sprucebot, lets dive into [`events`](events.md)!