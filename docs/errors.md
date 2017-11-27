# Errors
`Server` side errors are defined in `config/errors.js` and include a `friendlyReason` that you can render on the `interface`.

This kit ships with some errors pre-defined, but undoubtedly you'll be defining your own. Then, when you want to throw an error, you simply `ctx.throw('ERROR_KEY')` or `ctx.assert(assertion,'ERROR_KEY')`. The entire `error` object is returned in the response.

## Error object
```js
module.exports = {
    [key: String]: {
        code: Number, // https status code that will be set in the response
        status: String, // single word description of status, usually 'failure'
        reason: String, // official reason for failure
        friendlyReason: String // something the interface can render
    }
}
```

## Built-in errors
```js
// config/errors.js
module.exports = {
	UNKNOWN: {
		code: 500,
		status: 'failure',
		reason: 'A server side error occurred.',
		friendlyReason:
			"I honestly have no idea what went wrong, but I've let the humans know and they are on it!"
	},
	ROUTE_NOT_FOUND: {
		code: 404,
		status: 'failure',
		reason: 'Invalid route. Check the path and request methods',
		friendlyReason: 'The droids you were looking for could not be found.'
	},
	LOCATION_NOT_FOUND: {
		code: 404,
		status: 'failure',
		reason: 'Location could not be found.',
		friendlyReason: 'I could not find the location you are looking for.'
	},
	USER_NOT_FOUND: {
		code: 404,
		status: 'failure',
		reason: 'User could not be found.',
		friendlyReason: "No joke, I can't find that user."
	},
	INVALID_AUTHENTICATION: {
		code: 401,
		status: 'failure',
		reason: 'Authentication failed.',
		friendlyReason: "Sorry, you can't be here right now."
	},
	NOT_AUTHORIZED: {
		code: 403,
		status: 'failure',
		reason: 'Permission denied.',
		friendlyReason: 'Permission denied.'
	}
}
```

## Throwing errors
There are 2 ways to throw errors. By throwing one manually with `ctx.throw` or through a failed assertion with `ctx.assert`

```js
// server/controllers/1.0/teammate/index.js
module.exports = router => {

    router.post('/api/1.0/teammate/save.json', async (ctx, next) {

        // make sure someValue was POST'ed with this request
        ctx.assert(typeof(ctx.request.body.favoriteColor) === 'string', 'MISSING_FAVORITE_COLOR')

        if (ctx.request.body.favoriteColor === 'blue') {
            ctx.throw('WRONG_COLOR_BRO')
        }

        ...

    }

}

```

## Rendering errors client side
You can safely render `friendlyReason` whenever an error occurs on the `server`. Your `reducer` will 

```js
render() {

	const { shopify } = this.props

	return (
		<Container className="owner-settings">

			{shopify.fetchError && (
				<BotText>{shopify.fetchError.friendlyReason}</BotText>
			)}

		</Container>
	)
}
```

## Defining your errors
Then, all we have to do is define the errors.

```js
// config/errors.js
module.exports = {
    ...,
    MISSING_FAVORITE_COLOR: {
        code: 422,
        status: 'failure',
        reason: 'Missing parameters',
        friendlyReason: 'You forgot to tell me your favorite color!'
    },
    WRONG_COLOR_BRO: {
        code: 409,
        status: 'failure',
        reason: 'Blue is not allowed',
        friendlyReason: 'You can\'t pick blue! Not sure why, but you CAN\'T!'
    }
}

```
## Overriding friendlyReason
```js
// server/controllers/1.0/teammate/index.js
module.exports = router => {

    router.post('/api/1.0/teammate/save.json', async (ctx, next) {

        // make sure someValue was POST'ed with this request
        ctx.assert(typeof(ctx.request.body.favoriteColor1) === 'string', 'MISSING_FAVORITE_COLOR', {
			friendlyReason: 'You forgot the first color'
		})
		
        ctx.assert(typeof(ctx.request.body.favoriteColor2) === 'string', 'MISSING_FAVORITE_COLOR', {
			friendlyReason: 'You forgot the second color'
		})

        if (ctx.request.body.favoriteColor === 'blue') {
            ctx.throw('WRONG_COLOR_BRO')
        }

        ...

    }

}

```

## Gotchya's
 * There is no way (or need) to throw errors in the `interface`. Almost all your logic should be contained in `services` and `utilities` on the `server`. The `interface` is just that, the interface.
 * You can render `friendlyMessage` right in your `interface`, but you don't have to.

# What's next?
We're done with the essentials! Lets get started on something very specific, [uploads](uploads.md)!