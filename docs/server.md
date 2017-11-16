# Your Skill's `Server`
A Skill is comprised of a `Server` and an `Interface`. The `Server` is powered by [`sprucebot-skills-kit-server`](https://github.com/sprucelabsai/sprucebot-skills-kit-server), which depends heavily on [koa](http://koajs.com) for handling requests to the `Server`.

Your Skill's `Interface` can never talk directly to `Sprucebot`. The `Server` proxies all request.

### `Server` is more than just a proxy

Your `Server` does a lot more than just proxy request. It also houses your Skill's business logic using utilities, services, data models, and event listeners.

# Controllers
Inside `server/controllers/1.0` you'll see 3 folders; `guest`, `owner`, & `teammate`. The controller system is pretty dumb; simply putting a `controller.js` inside of `teammate` does not make all the routes defined in it only available to teammates.

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
[`sprucebot-skills-kit-server`](https://github.com/sprucelabsai/sprucebot-skills-kit-server) has comes with built in `middleware` for ensuring requests are being made by a properly authenticated and authorized [`User`](user.md). In fact, the `Auth` object is simply just a [`User`](user.md).

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
Any file in `server/middleware` should return a function that receives a `koa-router`. Middleware is a where you put `router.use()` and `router.params()`. Do **not** put any http verbs (get,post,put,delete) inside `server/middleware`.

# Models
Coming soon...

# Services
Any operation that uses `I/O` should be put in a `service`. A `service.js` should export an object with methods. It's expected that every method in a `service` is `async`.

A `service` is accessed like `ctx.services.${fileName}.${methodName}()`. `Services` has access to `services` and `utilities` as properties on themselves, e.g. `this.services` and `this.utilities`.

# Utilities
Any work that can be done `synchronously` should be done in a `utility`. It is structured exactly the same as a `service` in that it's a simple object with methods. `Utilities` can also access other `utilities` and `services` off `this`.

# Gotchya's
 * `sb` is attached to `ctx`. That is how you'll make calls back to Sprucebot, e.g. `ctx.sb.message(locationId, userId, 'How are you?')`.
 * Routes must start with `/api/1.0/${role}/*`
 * [`sprucebot-skills-kit-server`](https://github.com/sprucelabsai/sprucebot-skills-kit-server) comes with built-in `middleware`, `controllers`, and `utilities` - Make sure you are familar with them.

# Examples

### Sync with Shopify
**Difficulty level**: Medium

***Description***: This scenario will assume we want to sync with Shopify, though it could be any API. We won't write all the logic, but will demo a `listener`, `utility`, `service`, `middleware` and `controller` to demonstrate how they all communicate. Lets sync the guest every time they visit, but also give an owner a way to manually sync them. We'll be acting as a Shared App through Shopify.

***Required reading***:
* [User](user.md)
* [Events](events.md)

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


```js
// server/controllers/1.0/owner/index.js
module.exports = (router) => {

    router.post('/api/1.0/owner/sync/guest/:userId.json', async (ctx, next) => {

        // force sync guest
        await ctx.services.shopify.sync(ctx.shopify, ctx.guest)

        ctx.body = JSON.stringify({
            success
        })

        await next()

    })

}
```


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

        // return whatever you want
		return { reward, loyaltyCode, response }
        
	}
}

```

```js
// server/utilities/loyalty.js
module.exports = {
	code: guest => {

        // some special logic to generate a loyalty code
        const code = ... 

        return code

	}
}

```


