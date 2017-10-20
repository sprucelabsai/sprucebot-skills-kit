const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')


const port = parseInt(process.env.PORT, 10) || 3333
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// create new sprucebot api accesss
const sprucebot = new Sprucebot({
	apiKey: process.env.API_KEY,
	host: process.env.HOST || 'https://api.sprucebot.com',
	skillId: process.env.SKILL_ID
})

app.prepare().then(() => {
	createServer((req, res) => {
		const parsedUrl = parse(req.url, true)

		// Render the route using next.js route handling
		handle(req, res, parsedUrl)
	}).listen(port, err => {
		if (err) throw err
		console.log(`> Ready on http://localhost:${port}`)
	})
})
