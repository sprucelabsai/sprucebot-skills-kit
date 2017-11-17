# Your Skill's `Server`
A Skill is comprised of a `Server` and an `Interface`. The `Server` is powered by [`sprucebot-skills-kit-server`](https://github.com/sprucelabsai/sprucebot-skills-kit-server), which depends heavily on [koa](http://koajs.com) for handling requests.

Your Skill's `Interface` can never talk directly to `Sprucebot`. The `Server` proxies all request.

### `Server` is more than just a proxy

Your `Server` does a lot more than just proxy request. It also houses your Skill's business logic using utilities, services, data models, and event listeners.

# Controllers
Inside `server/controllers/1.0` you'll see 3 folders; `guest`, `owner`, & `teammate`. The controller system is pretty dumb; Simply putting a `.js` file inside of `controllers` will cause it to load. A `controller` is a function that accepts a [koa-router](https://github.com/alexmingoia/koa-router). Note,putting a `controller` in side the `teammate` folder does not make all the routes defined in it only available to teammates.

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

        ctx.body = JSON.stringify({
            favoriteColor: 'blue',
            birthday: new Date()
        })

        await next();

    })

    // starting with /api/1.0/teammate will restrict access to only
    // teammates and above (owners)
    router.post('/api/1.0/teammate/profile.json', async (ctx, next) => {

        ctx.assert(typeof(ctx.body.favoriteColor) === 'string', 'INVALID_PARAMETERS')

        ctx.body = JSON.stringify({
            favoriteColor: ctx.body.favoriteColor
        })

    })

}
```
## Restricting by role
Access to an endpoint is restricted by role **only** by looking at the start of the `path`, ie `/api/1.0/${role}` Throws a `403` if access is denied.

 * `/api/1.0/owner/*` - must be an owner
 * `/api/1.0/teammate/*` - must be an owner or teammate
 * `/api/1.0/guest/*` - must be an owner or teammate or guest


## `Auth` Object
[`sprucebot-skills-kit-server`](https://github.com/sprucelabsai/sprucebot-skills-kit-server) comes with built-in `middleware` for ensuring requests are being made by a properly authenticated and authorized [`User`](user.md). In fact, the `Auth` object is simply a [`User`](user.md).

```js
// server/controllers/1.0/owner/index.js
module.exports = router => {
    router.get(`/api/1.0/teammate/reviews.json`, async (ctx, next) {

        const teammate = ctx.auth

        // see user.md for more a breakdown
        console.log('Teammate name', teammate.User.name)
        console.log('Location name', teammate.Location.name)

        ctx.body = JSON.stringify(teammate)

        await next()
    })
}

```
# Events
See [events](events.md).

# Middleware
Any file in `server/middleware`. Should return a function that receives a `koa-router`. Middleware is a where you put `router.use()` and `router.params()`. Do **not** put any http verbs (get,post,put,delete) inside `server/middleware`.

# Models
Coming soon...

# Services
Any file in `server/services`. Should return an object with `async` methods(). Any operation that uses `I/O` should be put in a `service`.

A `service` is accessed like `ctx.services.${fileName}.${methodName}()`. `Services` has access to `services` and `utilities` as properties on themselves, e.g. `this.services` and `this.utilities`.

# Utilities
Any file in `server/utilities`. Should return an object with methods that are synchronous. Access a `utility` using `ctx.utilities.${fileName}.${methodName}()`. `Utilities` can also access other `utilities` and `services` off `this`.

# Gotchya's
 * `sb` is attached to `ctx`. That is how you'll make calls back to Sprucebot, e.g. `ctx.sb.message(locationId, userId, 'How are you?')`.
 * Routes must start with `/api/1.0/${role}/*`
 * [`sprucebot-skills-kit-server`](https://github.com/sprucelabsai/sprucebot-skills-kit-server) comes with built-in `middleware`, `controllers`, and `utilities` - Make sure you are familar with them.

# Examples

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
const config = require('config')

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

### Saving Shopify Settings
We won't cover the `interface` for this example, but assume we're `POST`ing the 3 fields we determined we needed above, `shopName`, `apiKey`, and `accessToken`, for Shopify to work.

```js
// server/controllers/1.0/owner/index.js
module.exports = (router) => {

    router.post('/api/1.0/owner/shopify/save.json', async (ctx, next) => {

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

            // responde with something friends
            ctx.body = JSON.stringify({
                status: 'success',
                message: ctx.utilities.lang.getText('saveShopifyResponseMessage')
            })

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

### Sync on arrival
Rather than trying to batch sync users, it's much easier to have them sync when they visit. Because we've broken out all the syncing goodness into a `server`, we can do it super fast. We simply create a `did-enter` `listener` and call our `service`. See the [event docs](events) for more deets on events.

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

### Allowing an owner to force sync a guest
Maybe an owner is browsing through past guests and realizes one is out of sync. Perhaps the first name is still `friend`. We'll give the `owner` a way to force sync. No `interface` is shown here, but assume a `<List>` of users with a 'Sync' `<Button>` as the `rightControl`. Hitting it `POST`s to the new `route` we're adding to `server/controllers/1.0/owner/index.js`.

```js
// server/controllers/1.0/owner/index.js
module.exports = (router) => {

    router.post('/api/1.0/owner/shopify/save.json', async (ctx, next) => {...}

    // New route for handling force sync
    router.post('/api/1.0/owner/sync/guest/:userId.json', async (ctx, next) => {

        // force sync guest
        await ctx.services.shopify.sync(ctx.shopify, ctx.user)

        ctx.body = JSON.stringify({
            status: 'success',
            message: ctx.utilities.lang.getText('forceSyncResponseMessage')
        })

        await next()

    })

}
```

### Actually syncing the guest with Shopify
Since Sprucebot only really cares about `firstName` and `profilePhotos`, there isn't that much to keep in sync. We won't show the syncing logic here, but assume it does a check on `updatedAt` in both systems (Sprucebot & Shopify) and uses the `firstName` and `profilePhoto` of the newer one.

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

        // return whatever you want
		return { reward, loyaltyCode, response }
        
	}
}

```
