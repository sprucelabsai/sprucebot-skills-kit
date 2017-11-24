# The Sprucebot User
A Skill cannot access a user directly. It's gotta go through a `Location`. So, when a `user` is retrieved, it comes with more than just `firstName`. It includes the `Location` as well as things like `role`, `status`, and number of `visits`.

## User object

```js
{
    id: UUID4,
    createdAt: Date, // date the user joined the location
    updatedAt: Date, // date the user changed their subscription to the location
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
## Roles
There are only 3 roles in Sprucebot, `owner`, `teammate`, and `guest`. These roles are tied to a `Location`. Here is how each role functions in core.

 * `owner` - Can enable/disable skills, manage `teammates` and `guests`. All done from the `Biz Dashboard`.
 * `teammate` - Can manage `guests`. Also has access to `Biz Dashboard`. Tends to get a more restricted view of a skill.
 * `guest` - Can only see their `Dashboard`.

## API
```js
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
## Gotchya's
 * A `User` isn't just a user, so pay attention to what you are accessing.  ~~`user.firstName`~~ ->  `user.User.firstName`
 * A `User` always comes with a `Location`, so access it via `user.User.Location`
 * `user.User.name` is "Friend" or "${firstName} ${lastInitial}.". 
 * Use `user.User.name` when sending one person's name to another (to help identify)
 * Use ``${`user.User.firstName || user.User.name`}`` when sending a person's name to themselves, e.g. "Welcome back Anthony!" vs ~~"Welcome back Anthony C.!"~~
 * You will rarely have to call `ctx.sb.user()` since it's attached as `ctx.auth` for the currently logged in `User`
 * A user doesn't have much besides a `firstName` and `profilePhotos`, everything you need to store beyond that can be done using `Meta`.
 * To search for both teammates and owners, search against `role=ownerteammate`

# Examples

## Sending a message to all teammates at the shop when a guest enters
**Difficulty level**: Easy

**Description**: You run a Vip service and want to make sure to let `teammates` know when a `guest` arrives. No interface will be covered in this example.

**Required Reading**:
* [Server](server.md)
* [Messaging](messaging.md)
* [Lang](lang.md)
* [Events](events.md)

### Setup listener
Since we want to send a message when a `guest` arrives, we'll create a `did-enter` listener. We'll check `ctx.event.User.role` to make sure the `user` entering is a `guest`.

```js
// server/events/did-enter.js
module.exports = async (ctx, next) => {

    // only notify about guests arriving
    if (ctx.event.User.role === 'guest') {

        next() // Core can move on to whatever it was gonna do

        // load all teammates and owners whe are currently logged onto the wifi
        const teammates = ctx.sb.users(ctx.event.Location.id, {
            role: 'ownerteammate',
            status: 'online'
        })

        // message everyone, one at a time
        await Promise.all(teammates.map((teammate) => 
            ctx.sb.message(
                ctx.event.Location.id, 
                teammate.User.id, 
                ctx.utilities.lang.getText('didEnterMessage', { guest: event, teammate })
            )
        )
    } else {

        // pass control back to server
        await next()

    }

}

```


```js
// interface/lang/default.js
module.exports = {
    didEnterMessage: ({ guest, teammate }) => `${event.User.name} just showed up!`
}

```
# What's next?
We've had to pull in bits from all over to make these examples work, but now would be a good time to dive into the [`meta` object](meta.md).