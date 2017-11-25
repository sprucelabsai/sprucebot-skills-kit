# Your Skill's Server
A Skill is comprised of a `server` and an `interface`. The `server` is powered by [`sprucebot-skills-kit-server`](https://github.com/sprucelabsai/sprucebot-skills-kit-server), which depends heavily on [koa](http://koajs.com) for handling requests.

Your Skill's `interface` can never talk directly to Sprucebot. The `server` proxies all request.

### `Server` is more than just a proxy

Your `server` does a lot more than just proxy request. It also houses your Skill's business logic using utilities, services, data models, and event listeners.

## <a name="controllers">Controllers</a>
Inside `server/controllers/1.0` you'll see 3 folders; `guest`, `owner`, & `teammate`. The controller system is pretty dumb; Simply put a `.js` file inside of `controllers` and it'll be loaded. A `controller` is a function that accepts a [koa-router](https://github.com/alexmingoia/koa-router). Note, putting a `controller` inside the `teammate` folder does **not** make all the routes defined in it only available to teammates. You must start the route with `/api/1.0/teammate/*` to restrict by role.

## Routes
Each `controller.js` must return a function that accepts a [koa-router](https://github.com/alexmingoia/koa-router).

```js
// server/controllers/1.0/teammate/index.js
module.exports = router => {

    // end in an extension that represents your response's content-type (json)
    router.get('/api/1.0/teammate/profile.json', async (ctx, next) => {

        const teammate = ctx.auth
        console.log('Teammate name', teammate.User.name)
        console.log('Location name', teammate.Location.name)

        ctx.body = {
            favoriteColor: 'blue',
            birthday: new Date()
        }

        await next();

    })

    // starting with /api/1.0/teammate will restrict access to only
    // teammates and above (owners)
    router.post('/api/1.0/teammate/profile.json', async (ctx, next) => {

        ctx.assert(typeof(ctx.body.favoriteColor) === 'string', 'INVALID_PARAMETERS')

        ctx.body = {
            favoriteColor: ctx.body.favoriteColor
        }

    })

}
```
## Restricting by role
Access to an endpoint is restricted by role **only** by looking at the start of the `path`, ie `/api/1.0/${role}` Throws a `403` if access is denied.

 * `/api/1.0/owner/*` - must be an `owner`
 * `/api/1.0/teammate/*` - must be an `owner` or `teammate`
 * `/api/1.0/guest/*` - must be an `owner` or `teammate` or `guest`


## <a name="auth">`Auth` object</a>
[`sprucebot-skills-kit-server`](https://github.com/sprucelabsai/sprucebot-skills-kit-server) comes with built-in `middleware` for ensuring requests are being made by a properly authenticated and authorized [`User`](user.md). When the built-in `auth` middleware detects the appropriate tokens in the request, it'll load the `user` and attach them to `ctx.auth`. If no `user` is found or a `user` is trying to access a route they do not have permission to access, a `NOT_AUTHORIZED` error is thrown. 

The `auth` object is simply a [`user`](user.md) object, so you'll get pretty used to working with it. Once you get the to the [`user` docs](user.md), it'll all start to click =).

```js
// server/controllers/1.0/owner/index.js
module.exports = router => {
    router.get(`/api/1.0/teammate/reviews.json`, async (ctx, next) {

        const teammate = ctx.auth

        // see user.md for more a breakdown
        console.log('Teammate name', teammate.User.name)
        console.log('Location name', teammate.Location.name)

        const reviews = await ctx.services.reviews(teammate)

        ctx.body = reviews

        await next()
    })
}

```
## Events
See [events](events.md).

## Errors
See [errors](errors.md).

## <a name="middleware">Middleware</a>
Any file in `server/middleware`. Should return a function that receives a `koa-router`. Middleware is a where you put `router.use()` and `router.param()`. Do **not** put any http verbs (get,post,put,delete) inside `server/middleware`.

```js
// server/middleware/user.js
module.exports = router => {

    // comes built into this kit
    router.param('userId', async (id, ctx, next) => {
		try {

            // searching against the auth'ed user's location 
            ctx.user = await ctx.sb.user(ctx.auth.Location.id, id)

        
        } catch (err) {

            // log a helpful description
            console.error('user middleware failed with error', err)
            
            // will throw an error defined in config/errors.js
            ctx.throw('USER_NOT_FOUND')

        }
        
        await next() // pass control back to koa

    })
}


```

## Models
See [models](models.md).

## <a name="services">Services</a>
Any file in `server/services`. Should return an object with `async` methods(). Any operation that uses `I/O` should be put in a `service`.

A `service` is accessed like `ctx.services.${fileName}.${methodName}()`. `Services` have access to `services` and `utilities` as properties on themselves, e.g. `this.services` and `this.utilities`.

```js
const didSend = await ctx.services.vip.send()
const reward = await ctx.services.rewards.generate()
```

## Utilities
Any file in `server/utilities`. Should return an object with methods that are synchronous. Access a `utility` using `ctx.utilities.${fileName}.${methodName}()`. `Utilities` can also access other `utilities` and `services` off `this`.

```js
const randomNumber = ctx.utilities.random.generate()
```
## Configuring Services + Utilities
Inside `config/default.js` you'll see `utilities` and `services` blocks. Any options you pass there will be passed through to your `service` or `utility` through a call to `init(options)`.

```js
// config/default.js
module.exports = {
    ...
    utilities: {
        rewards: {
            foo: 'bar',
            hello: 'world'
        }
    },
    services: {
        twilio: {
            fromNumber: '+1 123-123-1234'
        }
    }
    ...
}

```

### Passed to rewards utility
`options` are pulled from `utilities.rewards` in the config above. **Note:** This is the **only** time you should be setting `state` on a `utility` or `service`. Any settings you need that are unique to the request, use `middelware` to populate the `ctx` and pass it to the `method()` you are invoking.

```js
// server/utilities/rewards.js
module.exports = {
    init({ setting1, setting2 }) {
        this.setting1 = setting1
        this.setting2 = setting2
        console.log(options) // { foo: 'bar', hello: 'world' }
    }
}
```

### Passed to Twilio service
`options` are pulled from `utilities.twilio` in the config above.
```js
// server/services/twilio.js
module.exports = {
    init(options) {
        console.log(options) // { fromNumber: '+1 123-123-1234' }
    }
}
```

## Gotchya's
 * Put as much logic as you can in `services` and `utilities`. If you put most your logic in a `controller`, you're gonna have a bad time (especially once you start hooking into events and want to reuse that logic).
 * `sb` is attached to `ctx` passed to each route. That is how you'll make calls back to Sprucebot, e.g. `ctx.sb.message(locationId, userId, 'How are you?')`.
 * Routes must start with `/api/1.0/${role}/*`
 * [`sprucebot-skills-kit-server`](https://github.com/sprucelabsai/sprucebot-skills-kit-server) comes with built-in `middleware`, `controllers`, and `utilities` - Make sure you are familiar with them.
 * `Services` and `utilities` are **not** loaded recursively, so `server/utilities/messaging/twilio.js` will not be automatically loaded, but `server/utilities/twilio.js` will.
 * At the moment, you cannot listen to any `route` that has an `interface` page, e.g. `router.get('/owner')` will never get called.

## Examples

### Sync with Shopify
**Difficulty level**: Medium

***Description***: We want to sync with Shopify, though it could be any API. We won't write all the logic, but will generate a `listener`, `utility`, `service`, `middleware` and `controller` to demonstrate how they all communicate. Lets sync the guest every time they visit, but also give an owner a way to manually sync them.

***Required reading***:
* [User](user.md)
* [Meta](meta.md)
* [Lang](lang.md)
* [Events](events.md)

#### Start with `middleware`.
We want to have the `shopify-node-api` object available in every request and event listener. We do that by configuring it in the `middleware` for each request. We'll make it available as `ctx.shopify`. 

```js
// server/middleware/shopify.js
const Shopify = require('shopify-node-api')

module.exports = (router) => {

    // lets make the shopify object available to all requests and listeners
    // through the ctx
    router.use(async (ctx, next) => {

        // location can be on an auth or event
        const location = (ctx.auth && ctx.auth.Location) || (ctx.event && ctx.event.Location)

        if (location) {

            // check if shopify settings have been saved
            await settings = await ctx.sb.meta('shopify', {
                locationId: location.id
            })

            if (settings) {
                
                // instantiate a new Shopify using settings saved by owner
                ctx.shopify = new Shopify({
                    shop: settings.value.shopName,
                    shopify_api_key: settings.value.apiKey,
                    access_token: settings.value.accessToken,
                })
            }
        }

        await next()
    })

}

```

#### Saving Shopify Settings
We won't cover the `interface` for this example, but assume we're `POST`ing the 3 fields we determined we needed above, `shopName`, `apiKey`, and `accessToken`, for Shopify to work.

```js
// server/controllers/1.0/owner/shopify.js
module.exports = (router) => {

    router.post('/api/1.0/owner/shopify/settings.json', async (ctx, next) => {

        const { shopName, apiKey, accessToken } = ctx.body

        // make sure required vars are set
        ctx.assert(typeof(shopName) === 'string', 'INVALID_PARAMETERS')
        ctx.assert(typeof(apiKey) === 'string', 'INVALID_PARAMETERS')
        ctx.assert(typeof(accessToken) === 'string', 'INVALID_PARAMETERS')

        const waitKey = `save-shopify-${ctx.auth.Location.id}`

        try {
            
            // stop race conditions (hitting submit 100 times too fast)
            await ctx.sb.wait(waitKey)

            // save the shopify settings to this location
            await ctx.sb.upsertMeta('shopify', {
                shopName,
                apiKey,
                accessToken
            }, {
                locationId: ctx.auth.Location.id
            })

            // respond with something friendly
            ctx.body = {
                status: 'success',
                message: ctx.utilities.lang.getText('saveShopifyResponseMessage')
            }

        } catch (err) {

            console.error(err)
            ctx.throw('FAILED_TO_SAVE_SHOPIFY_SETTINGS')

        } finally {
            
            ctx.sb.go(waitKey)
            await next()

        }

    })

}
```

#### Sync on arrival
Rather than trying to batch sync users, it's much easier to have them sync when they visit. Because we've broken out all the syncing goodness into a `service`, we can do it super fast. We simply create a `did-enter` `listener` and call our `service`. See the [event docs](events) for more deets on events.

```js
// server/events/did-enter.js
module.exports = async (ctx, next) => {

    // Event is a User, see events.md
    const guest = ctx.event

    // sync with our Shopify server, pass the configured Shopify lib
    await ctx.services.shopify.sync(ctx.shopify, guest)

    await next()

}
```

#### Allowing an owner to force sync a guest
Maybe an owner is browsing through past guests and realizes one is out of sync. Perhaps the first name is still `friend`. We'll give the `owner` a way to force sync. No `interface` is shown here, but assume a `<List>` of users with a 'Sync' `<Button>` as the `rightControl`. Hitting it `POST`s to the new `route` we're adding to `server/controllers/1.0/owner/index.js`. This is a perfect example of why we want to put our syncing logic in a `service`.

```js
// server/controllers/1.0/owner/shopify.js
module.exports = (router) => {

    router.post('/api/1.0/owner/shopify/save.json', async (ctx, next) => {...}

    // New route for handling force sync
    router.post('/api/1.0/owner/sync/guest/:userId.json', async (ctx, next) => {

        // force sync guest
        await ctx.services.shopify.sync(ctx.shopify, ctx.user)

        ctx.body = {
            status: 'success',
            message: ctx.utilities.lang.getText('forceSyncResponseMessage')
        }

        await next()

    })

}
```

#### Actually syncing the guest with Shopify
Since Sprucebot only really cares about `firstName` and `profilePhotos`, there isn't that much to keep in sync. We won't show the syncing logic here, but assume it does a check on `updatedAt` in both systems (Sprucebot & Shopify) and uses the `firstName` and `profilePhoto` of the newer one.

**Callout:** NEVER SET STATE ON A SERVER/UTILITY EXCEPT THROUGH `config/default.js`. We attached `shopify` to the `ctx` and pass it to the `service` every time we use it because `services` & `utilities` are only created once when your skill boots. This means anything unique to the `user` currently using your skill must be put on the `ctx`. It also means you should rarely change the state of your `service` (e.g. `this.favoriteColor = 'blue'`) because it'll apply to every `user` and `location` using your skill.

```js
// server/services/shopify.js
module.exports = {
	sync: async (shopify, guest) => {

        // a whole bunch of operations on shopify
        const response = ...

        // access `server/services/rewards.js`
        const reward = await this.services.rewards.generate(guest)

        // access `server/utilities/loyalty.js`
        const loyaltyCode = this.utilities.loyalty.code(guest)

        // access sb meta 
        const meta = await this.sb.meta('shopify-id', { locationId, userId })

        // return whatever you want, yo
		return { reward, loyaltyCode, response }
        
	}
}

```
# What's next?
Now you have a feel for the `server`, lets start tinkering with the [`interface`](interface.md)!
