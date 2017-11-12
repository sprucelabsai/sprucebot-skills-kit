module.exports = async (ctx, next) => {
	// to stop VIP Alert from sending (assuming you will send your own message)
	// but, it's better practice to modify the payload: https://github.com/sprucelabsai/sprucebot-skill-vip-alerts
	// ctx.body = JSON.stringify({
	// 	preventDefault: true
	// })

	let payload = ctx.event.payload
	payload.attachments.push({
		title: 'Membership Level',
		value: 'Gold',
		image:
			'https://s3.amazonaws.com/bucket/f5dc7fd7-1d12-4cc9-a7e3-15bdbba9c377--X60.png'
	})

	ctx.body = JSON.stringify(payload)
	await next()
}
