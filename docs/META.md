# Meta API
A way to store any JSON.stringify'able object and query against it.

### For when you don't quite need a database

There will come a time when you need to store some data about a guest, teammate, owner, location, or even your own skill.

The `Meta API` is a basic key/value store. As such, it can run no aggregate operations (avg, sum, etc.) on the data.

# Meta data model
```js
{
    id: UUID4,
    createdAt: Date,
    updatedAt: Date,
    key: String,
    value: *,
    LocationId: UUID4,
    SkillId: UUID4,
    UserId: UUID4
}
```

# API
```js
let response = await ctx.sb.metas({
    locationId, // optional
    userId, // optional (requires locationId to be set)
    value, // optional (can search against key in object)
    sortBy, // createdAt|updatedAt,
    order, // ASC|DESC (defaults to DESC)
    key, // optional
    page, // optional (defaults to 0)
    limit // optional (defaults to 10, max 200)
})

console.log(response) // [{Meta}, {Meta}, {Meta}] or []

let response = await ctx.sb.createMeta(key, value, {
    locationId, // optional
    userId, // optional (requires locationId to be set)
})

console.log(response) // {Meta}

let response = await sb.meta(key, {
    locationId, // optional
    userId, // optional (requires locationId to be set)
    sortBy, // createdAt|updatedAt
    order // ASC|DESC (defaults to DESC)
})

console.log(response) // {Meta} or null

let response = await sb.metaOrCreate(key, value, { // find or create
    locationId, // optional
    userId, // optional (requires locationId to be set)
});

console.log(response) // {Meta}

let response = await sb.upsertMeta(key, value, { // update or insert
    locationId, // optional
    userId, // optional (requires locationId to be set)
});

console.log(response) // {Meta}

let response = sb.deleteMeta(id)

console.log(response) // {??}
```
# Gotchya's
 * If you want to save `Meta` for a `User`, you MUST also provide a `Location`. In other words, if you set `userId`, you must set `locationId`
 * `Meta` saved to a `Location` only needs `locationId`
 * `Meta` that is available globally only needs `key` and `value`
 * Utility methods like `metaOrCreate` and `upsertMeta` are prone to race conditions with all their fetching, checking, saving, updating. Easily fixed with `ctx.sb.wait(waitKey)`

# Examples


### Saving a teammate's favorite color
**Difficulty level**: Easy

**Description**: Every teammate has a favorite color, so you decide to let them save it. Then, you tell Sprucebot to text it to them whenever they show up (do not do this, ever). We will not cover any of the interface here. Assume a `<List>` of teammates with a text field next to each and a "Save" button.

**Required reading**:
 * [User](user.md)
 * [Server](server.md)
 * [Messaging](messaging.md)
 * [Lang](lang.md)
 * [Events](events.md)


```js
// server/controllers/1.0/teammate/index.js
module.exports = router => {

    router.post('/api/1.0/teammate/color/save.json', async (ctx, next) => {

        // make sure favorite color is a string (our only required field)
        ctx.assert(typeof(ctx.body.favoriteColor) === 'string', 'MISSING_FAVORITE_COLOR')

        // get the currently authed [user](user.md)
        const user = ctx.auth

        // it's good practice to lock unique requests to handle race conditions
        // e.g. someone hitting save 100x in 2 seconds
        const waitKey = `save-color-for-${user.User.id}`

        // drop everything in a try/catch/finally to ensure you can always unlock the request
        try {

            // subsequent requests will be stuck here until .go() is invoked
            await ctx.sb.wait(waitKey)
            
            // upsert the meta data for this user
            const meta = await ctx.sb.upsertMeta('favorite-color', ctx.body.favoriteColor, {
                locationId: user.Location.id,
                userId: user.User.id
            })
    
            // respond to the request
            ctx.body = JSON.stringify({
                favoriteColor: meta.value
            })

        } catch(err) {

            console.error(err)
            ctx.throw('FAILED_TO_SAVE_FAVORITE_COLOR')

        } finally() {

            ctx.sb.go(waitKey)
            await next()

        }

    })
}
```
```js
// server/events/did-enter.js
module.exports = (ctx, next) => {
    
    // grab the event
    const event = ctx.event

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

    // move on
	await next()
}
```

```js
// interface/lang/default.js
module.exports = {
    didEnterMessage: ({ favoriteColor, event }) => 
        favoriteColor
            ? `Welcome back ${event.User.firstName || event.User.name}! Your favorite color is ${favoriteColor.value}. That's pretty alright. 👊🏼`
            : `Hey ${event.User.firstName || event.User.name}, why haven't you set your favorite color?`
}

```