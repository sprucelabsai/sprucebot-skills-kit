# Your skill's title

[![Greenkeeper badge](https://badges.greenkeeper.io/sprucelabsai/sprucebot-skills-kit.svg)](https://greenkeeper.io/)
Describe the experience you wish to create from the perspective of the `guest`, `owner`, or `teammate`...

## Technical overview
Describe how your skill works for anyone who may need to come in and maintain or add to it. Example; Hooks into `did-enter` and sends a `message` to a `teammate`.

### Services
 * `vip` - Tells us who to send to.

### Utilities
 * `rewards` - Does something else.

### Sequelize Adapter
Allow your skill to an external sql database.
* In .env enable with `DB_ENABLED=true`
* Configure the `DB_MIGRATIONS=true` to enable automatically running migrations
* Create `server/models/Example.js` from `.example`
* Setup a migration to build the table in `server/migrations/*_example.js#up()` from `.example`

All of your models are available via koa `ctx.db.models.Example.*` and `ctx.db.sequelize.*`

We also ship with three "Core" models
`ctx.db.models.User`
`ctx.db.models.Location`
`ctx.db.models.UserLocation`

### Custom events
Describe any custom events your skill emits. Make sure you include whether or not it honors `preventDefault` and include the `payload`'s schema.

#### `vip-alerts:will-send` 
Just before a vip alert is triggered when a `guest` or `teammate` arrives. Honors `preventDefault`. Mutate `messages` to your heart's content. Whatever `messages` you return will be what is sent.

**Payload**

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

#### `my-slug:custom-event`
This is just a placeholder for now, put in yours! Honors `preventDefault`.

**Payload**
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

