# Sprucebot API
This kit uses [`sprucebot-node`](https://github.com/sprucelabsai/sprucebot-node) to communicate with Sprucebot.

Below is every method with a note on what it does, the parameters it accepts, and what it returns.


```js
try {

    // USER API

    // Fetch a single user
    const guest = await ctx.sb.user(locationId, userId)

    console.log(guest) // {User} or null

    // Fetch a bunch of users
    const teammates = await ctx.sb.users(locationId, {
        role, // optional (owner|teammate|guest|ownerteammate)
        status, // optional (online|offline)
        page, // optional (defaults to 0)
        limit, // optional (default to 10, max 200)
    })

    console.log(teammates) // [{User},{User},{User}] or []

    // Update a user
    const guest = await ctx.sb.updateUser(userId, {
        firstName: 'Taylor'
    })

    console.log(guest) // {User}
    
    // LOCATION API

    // Fetch a single location
    const location = await ctx.sb.location(locationId)

    console.log(location) // {} or null

    // All locations where this skill is installed
    const locations = await ctx.sb.locations({
        page, // optional (defaults to 0)
        limit // optional (defaults to 10, max 200)
    }) 

    console.log(locations) // [{},{}] or []

    // MESSAGING API

    // Send a message
    const message = ctx.sb.message(locationId, userId, message, {
        linksToWebView, // optional (true|false)
        webViewQueryData // optional (query string sent to skill when user taps it)
    });

    // META API

    // Search meta data
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

    let response = await ctx.sb.meta(key, {
        locationId, // optional
        userId, // optional (requires locationId to be set)
        sortBy, // createdAt|updatedAt
        order // ASC|DESC (defaults to DESC)
    })

    console.log(response) // {Meta} or null

    let response = await ctx.sb.metaOrCreate(key, value, { // find or create
        locationId, // optional
        userId, // optional (requires locationId to be set)
    });

    console.log(response) // {Meta}

    let response = await ctx.sb.upsertMeta(key, value, { // update or insert
        locationId, // optional
        userId, // optional (requires locationId to be set)
    });

    console.log(response) // {Meta}

    let response = ctx.sb.deleteMeta(id)

    console.log(response) // {??}

    // MUTEX API

    // create keys that include any variables that result in unique operations
    // the following blocks by location. sometimes you may want to block by user
    const waitKey = `long-operation-by-location-${locationId}`;

    try {
        // stop many requests from causing a race condition
        ctx.sb.wait(waitKey)

        ... 

        
    } catch (err) {
        console.error(err)
    } finally {
        // no matter what, don't forget to stop waiting
        ctx.sb.go(waitKey)
    }

} catch (err) {
    console.log(err);
}

```
