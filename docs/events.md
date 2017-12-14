# Events
Events are a wicked powerful part of Sprucebot. They make your Skill relevant. Example; messaging "Welcome to ``${`user.Location.name`}``, ``${`user.User.firstName || user.User.name`}``!" is way more powerful when it's sent on `did-arrive`!

## Event object
The `event` object is really a [`user`](user.md) object, with one exception; `event.User` and associated fields are optional. Whether or not an `event.User` exists in the `event` is up to the Skill that emits it. For core and 99% of skills, you can expect `event.User` and it's associated fields to exist. Each skill *should* document the events they `emit`, so you won't be guessing. In fact, at the time of this writing, there is not a single case where a `event.User` is not provided.

```js
{
    Location: Location, // Required
    User: User, // optional
    createdAt: Date, // date the guest joined the location (optional)
    updatedAt: Date, // date the guest changed their subscription to the location (optional)
    role: String, // owner|teammate|guest (optional)
    status: String, // offline|online (optional)
    visits: Number, // how many visits to this location (optional)
    lastRecordedVisit: Date, // when they last visited the shop (optional)
    payload: Object // data the skill or core is passing on (optional)
}

```
## Core Events
These events are built in. They all come with `event.User`.

 * `did-signup` - When a guest joins wifi at a location for the first time
 * `did-remote-signup` - When guest remotely opts in to a location (from the guest dashboard)
 * `did-enter` - When a guest returns and their phone hits the wifi
 * `did-leave` - Triggered an hour after a guest leaves
 * `did-message` - A guest has sent a text to Sprucebot
 * `did-add-device` - When a guest adds a new device to a location. Like adding their laptop
 * `did-update-profile` - When any user updates their first or last name
 * `did-opt-out` - When any guest opts out of a location. By now you have already lost access to their meta data.


## Listening to events
Creating an `event` listener is as simple as dropping a `.js` file into `server/events` that matches the `event`'s name. Note, you only have 2 seconds to respond to an event, so the order you do things matters.

 * `did-signup` -> `server/events/did-signup.js`
 * `did-enter` -> `server/events/did-enter.js`
 * `did-leave` -> `server/events/did-leave.js`
 * `did-message` -> `server/events/did-message.js`
 * `did-add-device` -> `server/events/did-add-device.js`

```js
// server/events/did-enter.js
module.exports = await (ctx, next) => {
    console.log('a did enter was just fired, eff yeah!')
    next() // respond, but no need to await

    const { event } = ctx

    console.log(event) // Event
}
```

## Listening to custom events
A custom `event` is broken into 2 segments, the `slug` of the skill emitting it and the `event-name`. For example, the `Vip Alert` skill will emit `vip-alerts:will-send` just before an alert is sent to the team. You can hook into this event and cancel it, modify the messages sent, or send your own alerts. If you replace the `:` with a `/`, you'll have your file path.

 * `vip-alerts:will-send` -> `server/events/vip-alerts/will-send.js`
 * `scratch-win:will-manually-send` -> `server/events/scratch-win/will-manually-send.js`

## Emitting custom events
Skills communicate with each other using the `event` system. 

```js
const responses = await ctx.sb.emit(ctx.auth.Location.id, 'scratch-and-win:will-manually-send', {
    userId: ctx.user.User.id, // the id of the guest (ctx.user set in middleware)
    message: ctx.utilities.lang('manualSendMessage', {
        to: ctx.user.User.id,
        from: ctx.auth.User.id
    }),
    teammateId: ctx.auth.User.id,
    sendToSelf: config.DEV_MODE // this event will emit back to you (for testing)
})

console.log(responses) // [EventResponse, EventResponse]

```

## EventResponse object
```js
{
    skill: {
        name: String, // fancy name of the skill (Vip Alert or Scratch & Win)
        slug: String // slug of the skill, used in it emits custom events
    },
    payload: Object // anything JSON.stringify'able
}

```

## Cancelling an event's default behavior
Events, such as `did-signup`, have an expected behavior. In this case, core sends a `message` to the `user` with a link to their profile. If you wanted to stop that message and send your own, you could do this.

```js
// server/events/did-signup.js
module.exports = async (ctx, next) => {
    ctx.body = { preventDefault: true } // stop the default "Thanks for joining" and push them a reward."

    // since we have 2 seconds to respond, we'll invoke next()
    // but, we don't need to wait around, so we won't await.
    next() 
    
    try {
        // send some rewards and do some error handling
        await ctx.services.rewards.send(ctx.event) 
    } catch (err) {
        console.error('failed to send rewards in did-signup')
        console.error(err.stack || err)
    }
}

```

## Gotchya's
 * Event listeners need to respond in 2 seconds or they will be ignored. That means you may need to respond to Sprucebot right away and run your logic after.
 * Custom events will not `emit` back to your skill unless you set `sendToSelf=true`. This makes testing way easier, but should def be off in production (why we tie it to `DEV_MODE=true`).
 * Your skill's `slug` can't be arbitrary. It is assigned to you by Spruce Labs when you begin creating your skill.

## Examples
### Modifying the Vip Alert 💥 message to something we like better

**Difficulty level**: Easy

**Description:** The Vip Alert 💥 skill allows teammates and owners to configure who triggers an arrival alert. We don't wanna have to rebuild all that functionality, we just want to change the message that is sent when a guest arrives.

**Required reading:**

 * [Meta](meta.md)
 * [Lang](lang.md)
 * [Vip Alerts](https://github.com/sprucelabsai/sprucebot-skill-vip-alerts)

#### Hook into the event
We'll simply create the listener by creating our `.js` file.

```js
// server/listeners/vip-alerts/will-send.js
module.exports = async (ctx, next) => {

    // pull out a few things
    const { event, event: { payload } } = ctx

    // this is an array of messages [{teammateId: String, body: String}, {...}]
    // we want to preserve the teammateId because that is who is receiving the alert
    // but we want to make the message better.
    const messages = payload.messages.map((message) => {
        return {
            teammateId: message.teammateId,
            body: ctx.utilities.lang.getText('betterVip', { guest: event })
        }

        // note: an `event` object has the same schema as the `user` object

    });
	
    // vip alert skill will take it from here
    ctx.body = {
        messages 
    }

    next()


}
```
#### Define the terms
Please don't ever make a message like this. It'll land you in hot water. ;)
```js
// interface/lang/default.js
module.exports = {
    didEnterMessage: ({ guest }) => `Oh no! ${guest.User.name} is here. Better get the f*** out!`
}

```

# What's next?
Sweet! Since we've been doing a lot with `lang`, lets learn some more about it in the [`lang` docs](lang.md).