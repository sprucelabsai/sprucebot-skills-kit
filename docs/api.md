# Sprucebot API

```js
try {

    // USER API

    // Fetch a single user
    const guest = await sb.user(locationId, userId)

    console.log(guest) // {User} or null

    // Fetch a bunch of users
    const teammates = await sb.users(locationId, {
        role, // optional (owner|teammate|guest|ownerteammate)
        status, // optional (online|offline)
        page, // optional (defaults to 0)
        limit, // optional (default to 10, max 200)
    })

    console.log(teammates) // [{User},{User},{User}] or []

    // Update a user
    const guest = await sb.updateUser(userId, {
        firstName: 'Taylor'
    })

    console.log(guest) // {User}
    
    // LOCATION API

    // Fetch a single location
    const location = await sb.location(locationId)

    console.log(location) // {} or null

    // All locations where this skill is installed
    const locations = await sb.locations({
        page, // optional (defaults to 0)
        limit // optional (defaults to 10, max 200)
    }) 

    console.log(locations) // [{},{}] or []

    // MESSAGING API

    // Send a message
    const message = sb.message(locationId, userId, message, {
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

} catch (err) {
    console.log(err);
}

```
