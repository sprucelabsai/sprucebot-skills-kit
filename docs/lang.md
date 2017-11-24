# Language
At the time of this writing, we do not have full multi-lingual support. But, we've setup the foundation for when the time comes. :D If you need multi-lingual support now, email `scientists@sprucelabs.ai` and we'll get it added ASAP!

## Defining `terms`
All your `terms` go into `interface/lang/default.js`. A `term` can be a String or a Function that returns a String.

```js
// interface/lang/default.js
module.exports = {
	botName: 'Sprucebot',
	botNamePlural: 'Sprucebots',
	teamDashboardWelcome: ({ user, botName }) => `Welcome back ${user.User.firstName}!`,
	teamDashboardBotText: ({ user }) =>
		user.status === 'online'
			? `You are at ${user.Location.name} as we speak! That's so cool! 🙌🏼`
			: `Next time you get into ${user.Location
					.name}, don't forget to join the wifi! 👊🏼`,
	teammateDashboardHeading: `Who's Online`,
	errorLoadingGuests: `Oh no! I could not load guests!`,
	errorLoadingTeammates: `Oh no! I could not load teammates!`,
	guestsTabTitle: `Guests`,
	teammatesTabTitle: `Teammates`
}

```

There are 2 big reasons we like making `terms` a Function.

 * Placeholder support: `How are you ${user.User.name}`!
 * Simple logic: user.status === 'online' ? `online message` : `offline message`

## When to put logic in a `term`
There are 2 reasons we like to put **simple** logic in a `term`.

 * Messages can change often depending on context (e.g. `user.status`), so rather than trying to build every case into our code (with many calls to `getText()`), we like to let the copy writers handle the variations.
 * Many languages are more complicated than English and rely on context for structure, so we're prepping for handling those cases.

## `Server` side
On the `server` you can access `lang` on the `ctx`, as follows:

```js
// server/controllers/1.0/owner/index.js
module.exports = (router) => {

    router.post('/api/1.0/owner/settings.json', async (ctx, next) => {

        const message = ctx.lang.getText('aLanguageKey')

    }

}
```

## `Interface` side
The same, but using `this.props.lang`.

```js
render() {

    const { auth } = this.props;

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

```

# What's next?
Ok, now that we know how to handle language, lets dive into [`messaging`](messages.md).