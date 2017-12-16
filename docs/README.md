# 🌲  Sprucebot Skills Kit 🌲

# TLDR;
A Skill is a "micro-app". That is, a bit of functionality hyper focused on a single use-case. It consists of a `server` and an `interface`. Together, with `events` and `messages`, Skills can connect people in whole new ways.

 * [Skills](skills.md) <- Start here after reading below
 * [Server](server.md)
 * [Interface](interface.md)
 * [Core API](api.md)
 * [User](user.md)
 * [Meta](meta.md)
 * [Events](events.md)
 * [Lang](lang.md)
 * [Messages](messages.md)
 * [Errors](errors.md)
 * [Uploading Files](uploads.md)

<p align="center">
<img src="images/architecture.gif?raw=true" />
</p>
# WTF?
This is a highly opinionated approach on how to rapidly build skills for Sprucebot.  Ultimately, you could build a skill on any stack. 🤘🏼 This particular kit uses NodeJS + ReactJS with Next + Koa as supporting frameworks... May the force be with you.

# Sprucebot skills manifesto

Skills are programs with a purpose: [human-to-human connection](https://vimeo.com/204933933).

They accomplish this in one of two ways:

1. Automation - tech runs the show, people enable
2. Augmentation - people run the show, tech enables

## Automation
Lets say there is a lady named Becca. She nerds the f\*\*k out over fashion. So, she decided to open a menswear boutique. She loves it. But, do you know what she didn't expect? That she'd be spending all her f\*\*king time doing boring ass admin work. There are so many aspects of running a business that need to be automated, it literally warranted this document being created.

## Augmentation
Good augmentation is much harder to achieve than good automation. Automation comes natural. You think, "What processes can I get rid of?" Augmentation is the opposite. The question becomes, "What processes can I make better?" When considering augmentation, it helps to think about the things a human brain can't do well (e.g. remembering names or personal details of 100 people a day).

## Making small business successful
This two pronged approach is the crux of our small business strategy. We want Becca to be able to focus on fashion, not all that other sh\*t. But, Becca's boutique needs more than good automation to succeed. She needs to be:

## Un-Amazon'able
Amazon rocks, doesn't it? Pretty much everything you need, bargain basement prices, delivered right to your door. If Becca tried to compete with Amazon, she'd get smoked. She's gotta focus on the things that make brick-and-mortar unique. This means she needs to be building human-to-human relationships.

You've never logged into Amazon, had it say, "Welcome back ${firstName}" and thought to yourself, "Wow, that was nice!" But, when you walk into your favorite boutique, coffeeshop, outdoor shop, barbershop, or salon and are welcomed by name, everything changes.

## Promote human-to-human connection
If your skill connects two people, it is considered a win. See, in order for Becca to beat Amazon, she's gotta build relationships. Relationships, true relationships, are built without a middleman.

*"Remember that a person's name is, to that person, the sweetest and most important sound in any language."* - Dale Carnegie

## Technical requirements
- node v7.6+ : Koa requires node v7.6.0 or higher for ES2015 and async function support.
- Yarn is installed (you can use NPM if you really want)
