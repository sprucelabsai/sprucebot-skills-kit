# 🌲  Sprucebot Skills Kit 🌲

### Table of Contents
<!-- MarkdownTOC depth=3 -->

- Sprucebot Skills Manifesto
    - Automation
    - Augmentation
    - Making Small Business Successful
    - Un-Amazon'able
    - Promote Human-to-Human Connection
- Using the CLI
- First, about the Skills Kit
- What Skills Kit is Built on...
    - NextJS
        - Why?
    - Koa
        - Why?
        - Getting Started
- Skill Requirements
    - Know the rules
    - Technical Requirements
- Getting Started
- Development Guide
    - Tools
        - Event Simulator \(didEnter/didLeave\)
    - Setting Up Client Side Routes
    - Setting Up Server Side Routes
    - Sprucebot API
    - Sending a message to a teammate when a guest arrives
    - Emitting a Custom Event
    - Listening to Someone's Custom Event
- Deployment
    - Heroku
    - AWS
    - IBM Bluemix
    - Other servers
- Support

<!-- /MarkdownTOC -->


# Sprucebot Skills Manifesto

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
If your skill connects two people, we consider it a win. If you can manage to start a conversation, the small business wins. See, in order for Becca to beat amazon, she's gotta build relationships. Relationships, true relationships, are built face-to-face.

*"Remember that a person's name is to that person the sweetest and most important sound in any language"* - Dale Carnegie

# Using the CLI
The best way to work with [sprucebot-cli](https://github.com/sprucelabsai/sprucebot-cli).

# First, about the Skills Kit
This is a highly opinionated approach on how to rapidly build skills for Sprucebot.  Ultimately, you could build a skill on any stack. 🤘🏼 This particular kit uses NodeJS + ReactJS with Next and Koa as supporting frameworks... May the force be with you.

- ~~Diagram of the skills architecture~~

# What Skills Kit is Built on...

## NextJS
Next.js is a minimalistic framework for server-rendered React applications. Visit [learnnextjs.com](https://learnnextjs.com/basics/getting-started) to get started with Next.js.

### Why?
- Server-rendered by default
- Automatic code splitting for faster page loads
- Simple client-side routing (page based)
- Webpack-based dev environment which supports Hot Module Replacement (HMR)
- Able to implement with Express or any other Node.js HTTP server
- Customizable with your own Babel and Webpack configurations

## Koa
[Koa](http://koajs.com/) is a next generation web framework for NodeJS designed by the team behind Express, which aims to be a smaller, more expressive, and more robust foundation for web applications and APIs.

### Why?
Through leveraging generators Koa allows you to ditch callbacks and greatly increase error-handling. Koa does not bundle any middleware within core, and provides an elegant suite of methods that make writing servers fast and enjoyable.

A Koa application is an object containing an array of middleware functions which are composed and executed in a stack-like manner upon request. Koa is similar to many other middleware systems that you may have encountered such as Ruby's Rack, Connect, and so on - however a key design decision was made to provide high level "sugar" at the otherwise low-level middleware layer. This improves interoperability, robustness, and makes writing middleware much more enjoyable.

This includes methods for common tasks like content-negotiation, cache freshness, proxy support, and redirection among others. Despite supplying a reasonably large number of helpful methods Koa maintains a small footprint, as no middleware are bundled.

### Getting Started
Koa is on the bleeding edge of Javascript development.  Koa uses generators. If you are not familiar with generators, [check this out](https://davidwalsh.name/es6-generators). They are much easier to debug, and much faster to develop.

# Skill Requirements

## Know the rules
Add rules about building skills...

## Technical Requirements
- node v7.6+ : Koa requires node v7.6.0 or higher for ES2015 and async function support.
- Yarn is installed (you can use NPM if you really want)

# Getting Started
- Clone this repository
- Run `yarn install`
- Run `yarn start`

# Development Guide

## Tools

### Event Simulator (didEnter/didLeave)

The Sprucebot CLI ships with an event simulator.  With the CLI running, press the UP arrow to simmulate a `didEnter` event.  Press the DOWN arrow to simulate a `didLeave` event.

(Add some notes on how these are configured and their payloads)

## Setting Up Client Side Routes

With NextJS, client-side routing becomes super simple... it's the file system based on the `pages` directory you find here.

```bash
sprucebot skill create route /owner/settings
```

Winds up scaffolding a page (i.e. a React component)

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
        limit, // optional (default to 10, max 200)
    })

    console.log(teammates) // [{},{},{}] or []

    // LOCATION API
    const location = await sb.location(locationId)

    console.log(location) // {} or null

    const locations = await sb.locations({
        page, // optional (defaults to 0)
        limit // optional (defaults to 10, max 200)
    }) // all locations where this skill is installed

    console.log(locations) // [{},{}] or []

    // MESSAGING API
    const message = sb.message(locationId, userId, message, {
        linksToWebView, // optional (true|false)
        webViewQueryData // optional (query string sent to skill when user taps it)
    });

    // META API
    let response = await sb.metas({
        locationId, // optional
        userId, // optional
        sortBy, // createdAt|updatedAt,
        key, // optional
		limit // optional (defaults to 10, max 200)
    })

    console.log(response) // [{}, {}, {}] or []

    let response = sb.createMeta(key, value, {
        locationId, // optional
        userId, // optional
    })

    console.log(response) // {}

    let response = await sb.meta(key, {
        locationId, // optional
        userId, // optional
        sortBy // createdAt|updatedAt,
    })

    console.log(response) // {} or null

    let response = await sb.metaOrCreate(key, value, {
        locationId, // optional
        userId, // optional
    });

    console.log(response) // {}

    let response = sb.deleteMeta(id)

    console.log(response) // {??}

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

# Deployment

## Heroku
Simply configure your environmental variables in your Heroku control pannel and push your app.  This skillskit is very Heroku friendly if not modified extensively.

- Add Screenshot
- Add link to **Sprucebot Skill Deployment Guide - Heroku**

## AWS
Skills built on this kit are easily deployed to EC2. You will need to start the application process.  The Spruce team recommends managing your node processes with PM2.  Hint hint, PM2 has some nifty power tools for AWS deployments.  Just configure the provided `sample.ecosystem.js` file and run `pm2 deploy`

Simply configure your environmental variables in your Heroku control pannel and push your app.  This skillskit is very Heroku friendly if not modified extensively.

- Add link to **Sprucebot Skill Deployment Guide - AWS**

## IBM Bluemix
Simply configure your environmental variables in your Cloud Foundry control pannel and push your app.  This skillskit is very Cloud Foundry friendly if not modified extensively.

- Add Screenshot
- Add link to **Sprucebot Skill Deployment Guide - Cloud Foundry**

## Other servers
A Sprucebot skill should be able to be deployed to most web servers. Please see the below guide

- Add link to **Sprucebot Skill Deployment Guide - Custom Server**

# Support

Call Randy Cotten
