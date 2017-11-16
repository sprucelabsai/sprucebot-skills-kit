# The user object
A Skill cannot access a user directly. It's gotta go through a location. So, when a user is retrieved, it comes with more than just firstName.

### User data model

```js
{
    id: UUID4,
    createdAt: Date,
    updatedAt: Date,
    role: String, // owner|teammate|guest
    status: String, // offline|online
    visits: Number, // how many visits to this location
    lastRecordedVisit: Date, // when they last visited the shop
    Location: {
        id: UUID4,
        createdAt: Date,
        updatedAt: Date,
        name: String,
        addressLine1: String,
        addressLine2: String,
        addressCity: String,
        addressState: String
        addressZip: String,
        addressCountry: String,
        geo: (-105.1021021,39.9223797), // geo coded using google
        OrganizationId: UUID4
    },
    User: {
        id: UUID4,
        createdAt: Date,
        updatedAt: Date,
        firstName: String,
        profileImages: { // null if no profile image uploaded
            profile60: String,
            profile60@2x: String,
            profile150: String,
            profile150@2x: String
        },
        defaultProfileImages: { // always used as fallback
            profile60: String,
            profile60@2x: String,
            profile150: String,
            profile150@2x: String
        }

    }
}
```
# API
```js

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

```
# Gotchya's
 * A 'User` isn't just a user, so pay attention to what you are accessing.
 * You will rarely have to call `user()` since it's attached as `ctx.auth` for the currently logged in `User`
 * A user doesn't have much besides a `firstName` and `profilePhotos`, mostly everything you need to save can be done using `Meta`.
 * To search for both teammates and owners, search against `role=ownerteammate`

# Examples

### Sending a message to all teammates at the shop when a guest enters
**Difficulty level**: Easy

**Description**: You run a VIP service and want to make sure to let teammates know when a guest arrives. No interface will be covered in this example.

**Required Reading**:
* [Server](server.md)
* [Messaging](messaging.md)
* [Lang](lang.md)
* [Events](events.md)

```js
// server/events/did-enter.js
module.exports = async (ctx, next) => {

    if (ctx.event.User.role === 'guest') {

        const teammates = ctx.sb.users(ctx.event.Location.id, {
            role: 'ownerteammate',
            status: 'online'
        })

        await Promise.all(teammates.map((teammate) => 
            ctx.sb.message(
                ctx.event.Location.id, 
                ctx.event.User.id, 
                ctx.utilities.lang.getText('didEnterMessage', { event, teammate })
            )
        )


    }

}

```


```js
// interface/lang/default.js
module.exports = {
    didEnterMessage: ({ event, teammate }) => `${event.User.name} just showed up!`
}

```

