# Sprucebot API
This kit uses [`sprucebot-node`](https://github.com/sprucelabsai/sprucebot-node) to communicate with Sprucebot. `sb` is only available on the `server` via `ctx`.

## User API
Learn about the `user` object [here](user.md).
```js
  // USER API

// Fetch a single user
const guest = await ctx.sb.user(locationId: UUID4, userId: UUID4)

console.log(guest) // {User} or null

// Fetch a bunch of users
const teammates = await ctx.sb.users(locationId: UUID4, {
    role: String, // optional (owner|teammate|guest|ownerteammate)
    status: String, // optional (online|offline)
    page: Number, // optional (defaults to 0)
    limit: Number, // optional (default to 10, max 200)
})

console.log(teammates) // [{User},{User},{User}] or []

// Update a user
const guest = await ctx.sb.updateUser(userId: UUID4, {
    firstName: String
})

console.log(guest) // {User}
```
## Location API
```js
// Fetch a single location
const location = await ctx.sb.location(locationId: UUID4)

console.log(location) // {} or null

// All locations where this skill is installed
const locations = await ctx.sb.locations({
    page: Number, // optional (defaults to 0)
    limit: Number // optional (defaults to 10, max 200)
}) 

console.log(locations) // [{},{}] or []
```

## Messaging API
```js
// Send a message
const message = await ctx.sb.message(locationId: UUID4, userId: UUID4, message:
 String, {
    linksToWebView: Bool, // optional (true|false)
    webViewQueryData: Object, // optional (query string sent to skill when user taps it)
    payload: Object // optional, anything else you want to pass through to the messaging layer
});
```

## Meta API
Learn about the goodness [here](meta.md).
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
## Mutex API
Any operations that are prone to race conditions, such as "check if a record exists, if not, create it", need a way to block to ensure 2 simultaneous requests don't create duplicate records. 

```js
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
```
