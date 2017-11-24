# Your skill's title
Describe the experience you wish to create from the perspective of the `guest`, `owner`, or `teammate`...

## Technical overview
Describe how your skill works for anyone who may need to come in and maintain or add to it. Example; Hooks into `did-enter` and sends a `message` to a `teammate`.

### Services
 * `vip` - Tells us who to send to.

### Utilities
 * `rewards` - Does something else.

## Custom events
Describe any custom events your skill emits. Make sure you include whether or not it honors `preventDefault` and include the `payload`'s schema.

### `vip-alerts:will-send` 
Just before a vip alert is triggered when a `guest` or `teammate` arrives. Honors `preventDefault`. Mutate `messages` to your heart's content. Whatever `messages` you return will be what is sent.

#### Payload

```js
[
    {
        teammateId: UUID4, // teammate receiving the alert
        body: String // the message
    },
    {
        teammateId: UUID4, // teammate receiving the alert
        body: String // the message
    }
]
```

### `my-slug:custom-event`
This is just a placeholder for now, put in yours! Honors `preventDefault`.

#### Payload
```js
{
    hello: 'world'
}
```

## Gotchya's

 * Describe anything else dev's should know when working on your skill.

## Credits
 * John Doe
 * Billy Joe
 * Tom Snow

