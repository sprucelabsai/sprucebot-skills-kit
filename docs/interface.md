# Your skill's interface
The `interface`, without a doubt, has the steepest learning curve for those who are unfamiliar with [reactjs](https://reactjs.org) and [redux](https://redux.js.org/#the-gist). Seriously, if you don't know these technologies, you are gonna wanna read up now.

We have done are best to abstract away most of the ceremony involved (such as routing, setup of redux store, etc), but it still, familiarity with React and Redux is going to be important.

## Routes
So you wanna create a `/owner/settings` page? Easy, create a `Component` at `interface/pages/owner/settings.js`. So easy! This is thanks to the powerful [Nextjs](https://github.com/zeit/next.js/).

```js
// interface/owner/settings.js

import React from 'react'
import Page from '../../containers/Page'
import { Container, H1 } from 'react-sprucebot'

class OwnerSettings extends React.Component {

    // this method can be run both server side and client side
    // so be aware of your environment (tips below)
    static getInitialProps({ props }) {
        return {}
    }

    // always runs client side, so you can be certain you are
    // in a browser
    componentDidMount() {

        // always call skill.ready() to let Sprucebot know 
        // your skill is ready to display
        this.props.skill.ready()
    }

    // can run both server and client side, which should not
    // be a problem since you should only be accessing local
    // props and state
    render() {

        // you can always be certain auth exists and is an 
        // owner because we are in the "owner" dir
        const { auth } = this.props;

        // Container should always be the outer most component
        return (
            <Container className="owner-settings">
                <H1>{this.props.lang.getText('ownerSettingsHeading', {
                    owner: auth
                })}</H1>
                <BotText>{this.props.lang.getText('ownerSettingsBotTex', {
                    owner: auth
                })}</BotText>
            </Container>
        )
    }
}

// Wrapping your component in Page is what make the whole thing work
export default Page(OwnerSettings)

```

## Restricting by role
The `interface` restricts using the same rules as `server`, but does it all automatically for you. Simply creating a page under `owner`, `guest`, or `teammate` will restrict based off the following: 

 * `/owner/*` - must be an `owner`
 * `/teammate/*` - must be an `owner` or `teammate`
 * `/guest/*` - must be an `owner` or `teammate` or `guest`

## `Auth` object
This mirrors exactly the functionality `server` side. But, in React tradition, the `auth` is attached to `this.props`.

## Making calls to `server`
So you've got your `server` side `routes` setup and want to make some calls. You'd follow these steps.

 * Create your `action`
 * Create your `reducer`
 * Dispatch the `action` in `componentDidMount`

## Actions
This is how you change state in your app. They are stored in `interface/store/actions`.In most cases, it means making an `https` request. We'll use the Shopify sync example from `server`. All `https` requests are made using the [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) library under the hood. Everything is a passthrough.

All actions need 3 states, `REQUEST`, `SUCCESS`, `ERROR`. They are all used and the state being set is handled for you (though you'll still need to reduce the state changes).

```js
// interface/store/actions/shopify.js
export const GET_SHOPIFY_SETTINGS_REQUEST = 'shopify/GET_SHOPIFY_SETTINGS_REQUEST'
export const GET_SHOPIFY_SETTINGS_SUCCESS = 'shopify/GET_SHOPIFY_SETTINGS_SUCCESS'
export const GET_SHOPIFY_SETTINGS_ERROR = 'shopify/GET_SHOPIFY_SETTINGS_ERROR'

export const UPDATE_SHOPIFY_SETTINGS_REQUEST = 'shopify/UPDATE_SHOPIFY_SETTINGS_REQUEST'
export const UPDATE_SHOPIFY_SETTINGS_SUCCESS = 'shopify/UPDATE_SHOPIFY_SETTINGS_SUCCESS'
export const UPDATE_SHOPIFY_SETTINGS_ERROR = 'shopify/UPDATE_SHOPIFY_SETTINGS_ERROR'

export function get() {
    return {
		types: [GET_SHOPIFY_SETTINGS_REQUEST, GET_SHOPIFY_SETTINGS_SUCCESS, GET_SHOPIFY_SETTINGS_ERROR],
		promise: client => client.get(`/api/1.0/owner/shopify/settings.json`)
	}
}

export function update(settings) {
	return {
		types: [UPDATE_SHOPIFY_REQUEST, UPDATE_SHOPIFY_SUCCESS, UPDATE_SHOPIFY_ERROR],
		promise: client => client.post(`/api/1.0/owner/shopify/settings.json`, {
            body: settings
        })
	}
}

```
After you create actions, you need to add them `interface/store/reducers/index.js` so the `interface` is aware of them.

```js
// interface/store/actions/index.js
import * as users from './users'
import * as locations from './locations'
import * as shopify from './shopify'

module.exports = {
	users,
    locations,
    shopify
}

```

## Reducers
Every time state changes, you need to take that new state and update the current state. Reducers are located in `interface/store/reducers`.

```js
// interface/store/reducers/shopify.js
import {
	UPDATE_SHOPIFY_SETTINGS_REQUEST,
	UPDATE_SHOPIFY_SETTINGS_SUCCESS,
    UPDATE_SHOPIFY_SETTINGS_ERROR,
    GET_SHOPIFY_SETTINGS_REQUEST,
    GET_SHOPIFY_SETTINGS_SUCCESS,
    GET_SHOPIFY_SETTINGS_ERROR
} from '../actions/shopify'

export default function reducer(state = null, action) {
	switch (action.type) {
		case GET_SHOPIFY_SETTINGS_REQUEST:
			return {
				...state,
				getting: true
			}
		case GET_SHOPIFY_SETTINGS_SUCCESS:
			return {
				...state,
                settings: action.result,
                getError: false,
				getting: false
			}
		case GET_SHOPIFY_SETTINGS_ERROR:
			return {
				...state,
				getError: action.error,
				getting: false
			}
		case UPDATE_SHOPIFY_SETTINGS_REQUEST:
			return {
				...state,
				updating: true
			}
		case UPDATE_SHOPIFY_SETTINGS_SUCCESS:
			return {
				...state,
                settings: action.result,
                getError: false,
				updating: false
			}
		case UPDATE_SHOPIFY_SETTINGS_ERROR:
			return {
				...state,
				updateError: action.error,
				updating: false
			}
		default:
			return state
	}
}

```

Similar to `actions`, we gotta drop in our new `reducers` to `interface/store/reducers/index.js`.

```js
// interface/store/reducers/index.js
import users from './users'
import locations from './locations'
import shopify from './shopify'

module.exports = {
	users,
    locations,
    shopify
}
``` 

Phew, ok, now we can make requests and expect `state` to be accurate. Lets try incorporating it into the above `interface/owner/settings.js` page with a fancy `<Loader />` and everything.

```js
// interface/owner/settings.js

import React from 'react'
import Page from '../../containers/Page'
import { 
    Container, 
    H1, 
    Loader, 
    Form, 
    Input,
    SubmitWrapper,
    Button } from 'react-sprucebot'

class OwnerSettings extends React.Component {

    static getInitialProps(props) {
        return {}
    }

    componentDidMount() {
        this.props.skill.ready()

        // get the shopify settings using our new action
        this.props.actions.shopify.get()
    }

    onSubmit(e) {
        console.log(e)
    }

    render() {

        // our reducer will set the props for us as the state of the app changes
        // and this will trigger a re-render
        const { auth, shopify, lang, skill } = this.props;

        // we'll handle the 3 states we setup; request, success, error
        return (
            <Container className="owner-settings">

                <H1>{lang.getText('ownerSettingsHeading', {
                    owner: auth
                })}</H1>

                {!shopify.getError && (
                    <BotText>{lang.getText('ownerSettingsBotTex', {
                        owner: auth
                    })}</BotText>
                )}
                
                {shopify.getError && (
                    <BotText>{shopify.getError.friendlyReason}</BotText>
                )}

                {shopify.getting && <Loader />}

                {shopify.settings && (
                    <Form>
                        <Input label={lang.getText('shopNameLabel')} defaultValue={shopify.settings.shopName} />
                        <Input label={lang.getText('apiKeyLabel')} defaultValue={shopify.settings.shopName} />
                        <Input label={lang.getText('accessTokenLabel')} defaultValue={shopify.settings.shopName} />
                        <SubmitWrapper>
                            <Button alt onClick={skill.back()}>{lang.getText('backToDashboardButtonLabel')}</Button>
                            <Button type="submit" primary>{lang.getText('saveButtonLabel')}</Button>
                        </SubmitWrapper>
                    </Form>
                )}
                
            </Container>
        )
    }
}

// Wrapping your component in Page is what make the whole thing work
export default Page(OwnerSettings)

```

## getInitialProps()
We've added some behaviors here for convenience. These are `redirect` and `public`. 
```js
getInitialProps(props) {
    return {
        redirect: '/where/you/want', // sends 302 Location: to client
        public: false // will skip the auth check, so user could be anonymous
    }
}

```
## Config
If there are any `config/default.js` (or any environment) settings you need available on the client, it's a 2 step process. First, inside of `config/default.js` you will see a `sanitizeClientConfig` block. Anything in there will be passed to the client.

```js
// config/default.js
module.exports = {
    ...,
    myNewSetting: 'What the!??',
    sanitizeClientConfig: config => 
        pick(config), [
            ...,
            'myNewSetting'
        ])
}
```
Once your setting is dropped in, you can access it from your `Component`'s `props`.

```js

// server side
static getInitialProps(props) {
    console.log(props.config.myNewSetting) // 'What the!??'
    return {
        anotherNewSetting: 'Totally!'
    }
}

// client side
componentDidMount() {
    alert(this.props.config.myNewSetting) // 'What the!??'
    alert(this.props.config.anotherNewSetting) // 'Totally!'
}
```

## Styleguide
When you first visit your skill, you'll be taken to the `Styleguide`. This guide has every `Component` defined in `react-sprucebot` with examples on how they can be configured. As soon as you set `.env` `DEV_MODE=false`, this page goes away.

## Custom styling
Currently it is against Sprucebot rules to add custom styles to your Skill. If you find our control library is not sufficient, put your styles inline, take a screen, and shoot it to scientists (at) sprucelabs.ai and we'll see how we can enhance the kit to accommodate.

## Gotchya's
 * We say `interface` and not `client` because this code can render on the `server` as well.
 * `getInitialProps` can run both `server` side and `client` side, so check for `window` or anything else you expect to use.
 * Dispatch actions `client` side and use a `<Loader />` so things load quickly.
 * **NEVER** `import config from 'config'` client side. It'll expose all your settings! Use `sanitizeClientConfig` && `this.props.config` instead.
 * Deving through a proxy (like ngrok) is really slow. One way to make development faster is to inspect the `iframe` in Sprucebot, copy the `src`, and paste it into a new window.  
 * Make sure you set the `error` to `false` on `REQUEST_SUCCESS` so any previous error is removed.

# What's next?
Ok, we're almost end-to-end... but it's probably a good time to get more familiar with all the things you can do with the [api](api.md).