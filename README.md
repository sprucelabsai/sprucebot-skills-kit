# sprucebot-skills-kit
🌲  Sprucebot Skills Kit 🌲

TLDR; Create skills for Sprucebot

Skills are programs with a purpose: help [small business](https://vimeo.com/204933933). 

They accomplish this in one two ways:

1. Automation - tech runs the show, poeple enable
2. Augmentation - people run the show, tech enables

## Automation
Lets say there is a lady named Becca. She nerds the f\*\*k out over fashion. So, she decided to open a menswear boutique. She loves it. But, do you know what she didn't expect? That she'd be spending all her f\*\*king time doing boring ass `backend` work. There are so many aspects of running a business that neet to be automated, it literally warranted this document being created.

## Augmentation
Good augmentation is much harder to acheive than good automation. Automation comes natural. You think, "What processes can I get rid of?" Augmentation is the opposite. The question becomes, "What processes can I make better?" It turns out it's much easier to point at something and say, "eliminate that" than it is to imagine something that does not yet exist.

## Making Small Business Successful 
This two pronged approach is the crux of our small business strategy. We want Becca to be able to focus on fashion, not all that other sh\*t. But, Becca's boutique needs more than good automation to succeed. She needs to be:

## Un-Amazon'able
Amazon rocks, doesn't it? Pretty much everything you need, basement bargain products, delivered right to your door. If Becca tried to compete with Amazon, she'd get smoked. She's gotta focus on the things that make brick-and-mortar unique. This means she needs to be building human-to-human relationships.

You've never logged into Amazon, had it say, "Welcome back ${firstName}" and thought to yourself, "Wow, that was nice!" But, when you walk into your favorite boutique, coffeeshop, outdoor shop, barbershop, or salon and are welcomed by name, everything changes.

## Promote Human-to-Human Connection
If your skill connects two people, we consider it a win. If you can manage to start a conversation, the small business wins.

# Using the CLI
The best way to work with [sprucebot-cli](https://github.com/sprucelabsai/sprucebot-cli).

# Setting Up Client Side Routes

```bash
sprucebot skill create route /owner/settings
```

Routes are stored in `routes.js` to setup all your client side routes. 


```js
// routes.js
module.exports = {
    '/owner/:someVariable/settings': 'pages/owner/settings'
}

```

Once your routes are configured, create the corresponding page.


```js
// pages/owner/settings.js
import React, { Component } from 'react'
import BotText from '../sprucebot/BotText'

export default class OwnerSettings extends Component {
    render() {
        return ('<BotText>Yay!</BotText>')
    }
}


```

## Setting Up Server Side Routes
Routes are automatically setup based on the controllers you create and the keys of the controller.

For example, to create `/owner/:someVariable/save` that allows an owner to POST, you would simply create the following:

```js
// controllers/owner.js

modules.export = {
    'post /owner/:someVariable/save': async (sb, req, res) => {
        const someVariable = req.someVariable;
        return {
            success: true,
            message: 'Your variable was saved, happy now?' // always include a message with your response
        }
    }
}

```


## Sprucebot API
These are calls your skill makes from event listeners, REST endpoints, etc.

```js
try {

    // USER API
    const guest = await sb.user(locationId, userId)
    
    console.log(guest) // {} or null

    const teammates = await sb.users(locationId, {
        role, // optional (owner,teammate,guest,ownerteammate)
        status, // optional (online, offline)
        page, // optional (defaults to 0)
        limit, // optional (default to 20)
    })

    console.log(teammates) // [{},{},{}] or []

    // LOCATION API
    const location = await sb.location(locationId)

    console.log(location) // {} or null

    const locations = await sb.locations()

    console.log(locations) // [{},{}] or []

    // MESSAGING API
    const message = sb.message(userId, body, {
        linksToWebView, // optional (true|false)
        webViewQueryData // optional (query string sent to skill)
    });

    // META API
    let response = await sb.getMeta({
        locationId, // optional
        userId, // optional
        key, // required
        sortBy, // createdAt|updatedAt
		limit
    })

    console.log(response) // [{}, {}, {}] or []

    let response = await sb.getOneMeta({
        locationId, // optional
        userId, // optional
        key // required
    })

    console.log(response) // {} or null

    let response = await sb.getOneMetaOrCreate({
        locationId, // optional
        userId, // optional
        key, // required
        value // optional
    });

    console.log(response) // {}

    let response = sb.saveMeta({
        locationId, // optional
        userId, // optional
        key, // required
        value, // required
        id // optional (updates if exists)
    })

    console.log(response) // {...}

    let response = sb.deleteMeta({
        id // required
    })

    console.log(response) // {...}

} catch (err) {
    console.log(err);
}

```


## Sending a message to a teammate when a guest arrives

```js
// controllers/owner.js
// have a way to save which teammates get notified when a guest arrives
module.exports = {

    'post :locationId/save' : async (sb, req, res) => {

        const key = 'teammatesThatNeedToBeNotified';

        let teammateIds = await sb.getOneMetaOrCreate({
            locationId: req.params.locationId,
            key
        });


        teammateIds.value = req.body.teammateIds;
        await sb.saveMeta(teammateIds);

        return res.json({
            success: true,
            message: 'Teammate ids saved for arrival messages'
        });

    }


}

```

```js
// pages/owner.js
// On the front end, build a form to collect which teammates need to be notified
client.post(`/owner/${locationId}/save-teammates-getting-notified`, {
    teammateIds: [1,2,3]
})

```


```js
// events/did-enter.js
// When a guest arrives, let every teammate that is to be notified, know
module.exports = async (sb, req, res) => {

    const guest = req.user
    const location = req.location

    if (guest.role === 'guest') {

        // Load teammate who wants a notification about this guest entering
        let meta = sb.getMetaOrCreate({
            locationId: location.id,
            values: [],
            key: 'teammatesThatWantToBeNotified'
        });

        meta.values.forEach((teammateId) => {

            sb.sendMessage({
                userId: teammateId,
                message: `Yo! ${guest.firstName} has arrived!`
            })

        })

        return {
            success: true,
            message: `Alerts sent to ${meta.values.length} teammates!`
        }

        
    }

}

```

## Emitting a Custom Event

When you emit a custom event, it MUST be namespaced `vip:event-name`. The response is an an object with the following keys.

 - event.data
 - event.errors
 
Data is an array of payloads returned from each skill enabled for a particular location


```js
// events/did-enter.js

module.export = async (sb, req, res) => {

    const message = `${req.user.firstName} has arrived.`
    const attachments = [
        {
            title: 'last visit',
            value: lastVisit
        },
        {
            title: 'photo',
            value: '<img src="">' 
        }
    ]

    // give everyone a chance to add their own attachments to this message
    const event = sb.emit(req.location.id, 'vip:will-send', attachments)

    // all the responses from every skill enabled for this location
    console.log(event.data) 
    /*

        [
            {
                skill: "little-black-book",
                data: { // whatever the skill responded with
                    title: 'Notes',
                    value: 'Is a really cool dude'
                }
            },
            {
                skill: 'some-other-skill',
                data: {}
            }

        ]
    */


}

```

## Listening to Someone's Custom Event
Listening to custom, namespaced events, is the same as listening to other events, but you create a `directory` inside `events` that is the `namespace`.

So, if you want to listen to `vip:will-send` you'd create:

```js
// events/vip/will-send.js
modules.export = async (sb, req, res) => {

    const attachments = req.params.data;

    // anything sent back to sb would be appended to event.data
    return res.json([
        {
            title: 'Notes',
            value: 'Is a really cool dude'
        }
    ])

}

```