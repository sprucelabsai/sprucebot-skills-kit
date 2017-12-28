# Training

Ok, so you have a great skill! But, does anyone know how to use it? Luckily, we all share this problem and are working hard to find solutions.

The expected behavior for any skill is that it provides value from day one. But, teammates and owners may need a little help getting setup.

## The `will-send-training` event
This `event` is emitted whenever Sprucebot thinks it's a good time to ask the `user` if they want to take a few minutes to setup a new Skill.

Here is an exampled pulled right from Vip Alerts 💥.
```js
// server/events/will-send-training.js
module.exports = async (ctx, next) => {
	// only send training if this is a teammate or owner
	if (ctx.event.role === 'teammate' || ctx.event.role === 'owner') {
		// have they configured VIP alerts yet?
		const hasConfigured = await ctx.services.vip.hasConfiguredVipAlerts(
			ctx.event
		)

		// if not, lets invite them to do that
		if (!hasConfigured) {
			// construct a new and improved payload
			const payload = {
				...ctx.event.payload,
				message: ctx.utilities.lang.getText('trainingMessage', {
					teammate: ctx.event
				}),
				webViewQueryData: { training: 1 }
			}
			ctx.body = payload
		}
	}
	await next()
}
```
## Responding
Your response to `will-send-training` should match the [`messaging`](messages.md) API.
```js
{
    message: String, // message you want sent to the user
    linksToWebView: Bool, // defaults to true, so only set to false if needed
    webViewQueryData: Object, // passed to your skill after they click the link
}
```

## Gotchya's
 * You can never count on your message being delivered because Sprucebot may decide another skill has a more important training message to send. 
 * To combat this, always send the next training message you decide the user needs until you see they have completed some step.
 * For some skills, it may be better to have them "dormant" until training is done. Vip Alerts 💥 enables for each user as they complete training.