# 🌲  Sprucebot Skills Kit 🌲

# TLDR;
 * [Server](server.md)
 * [Interface](interface.md)
 * [Core API](api.md)
 * [Meta](meta.md)
 * [User](user.md)

# WTF?
This is a highly opinionated approach on how to rapidly build skills for Sprucebot.  Ultimately, you could build a skill on any stack. 🤘🏼 This particular kit uses NodeJS + ReactJS with Next + Koa as supporting frameworks... May the force be with you.

# Sprucebot Skills Manifesto

Skills are programs with a purpose: help [small business](https://vimeo.com/204933933).

They accomplish this in one of two ways:

1. Automation - tech runs the show, people enable
2. Augmentation - people run the show, tech enables

## Automation
Lets say there is a lady named Becca. She nerds the f\*\*k out over fashion. So, she decided to open a menswear boutique. She loves it. But, do you know what she didn't expect? That she'd be spending all her f\*\*king time doing boring ass `backend` work. There are so many aspects of running a business that need to be automated, it literally warranted this document being created.

## Augmentation
Good augmentation is much harder to achieve than good automation. Automation comes natural. You think, "What processes can I get rid of?" Augmentation is the opposite. The question becomes, "What processes can I make better?" It turns out it's much easier to point at something and say, "eliminate that" than it is to imagine something that does not yet exist.

## Making Small Business Successful
This two pronged approach is the crux of our small business strategy. We want Becca to be able to focus on fashion, not all that other sh\*t. But, Becca's boutique needs more than good automation to succeed. She needs to be:

## Un-Amazon'able
Amazon rocks, doesn't it? Pretty much everything you need, bargain basement prices, delivered right to your door. If Becca tried to compete with Amazon, she'd get smoked. She's gotta focus on the things that make brick-and-mortar unique. This means she needs to be building human-to-human relationships.

You've never logged into Amazon, had it say, "Welcome back ${firstName}" and thought to yourself, "Wow, that was nice!" But, when you walk into your favorite boutique, coffeeshop, outdoor shop, barbershop, or salon and are welcomed by name, everything changes.

## Promote Human-to-Human Connection
If your skill connects two people, it is considered a win. See, in order for Becca to beat Amazon, she's gotta build relationships. Relationships, true relationships, are built face-to-face.

*"Remember that a person's name is, to that person, the sweetest and most important sound in any language."* - Dale Carnegie

## Technical Requirements
- node v7.6+ : Koa requires node v7.6.0 or higher for ES2015 and async function support.
- Yarn is installed (you can use NPM if you really want)

# Getting Started
- Clone this repository
- Run `yarn install`
- Run `yarn start`

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
