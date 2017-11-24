# Messages

Messaging is how Sprucebot communicates with humans. Sprucebot currently has 2 means of messaging, `sms` and `push`. Luckily, you don't have to worry about how the `message` is delivered, you just send it.

In order to keep Sprucebot spam free, `messages` are tied to a `Location` so we can ensure a physical visit has ocurred.

While sending a message to a `user` whose `status === 'offline'` is allowed, abuse of this feature will result in banishment... forever.

Sending a `message` to a `guest` should be a last resort. It is much better to send a message to a `teammate` to have them deliver the `message`. It's the human-to-human contact of this type of interaction that makes what we are all doing so unique.

## API

```js
// Send a message
const message = await ctx.sb.message(locationId: UUID4, userId: UUID4, message:
 String, {
    linksToWebView: Bool, // optional (true|false)
    webViewQueryData: Object, // optional (query string sent to skill when user taps it)
    payload: Object // optional, anything else you want to pass through to the messaging layer
});
```

## Gotchya's
 * `Messages` must be routed through a `Location`. This means there is no messaging a `user` who has not visited that `Location`. #nooutbound
 * Focus your messaging on in-store experiences.
 * If you need to deliver a message to the `guest`, try notifying a `teammate` so they can deliver the message.
 * If you must message the `guest`, don't bombard them with messages (how much would you like to be spammed when you walk into a shop?)
 * DO NOT SPAM

# What's next?
Ok, lets dive into [error reporting](errors.md)!