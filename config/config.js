const Config = {
	API_KEY: process.env.API_KEY
		? process.env.API_KEY
		: 'you should have a .env file with API_KEY filled in for your skill',
	HOST: process.env.HOST ? process.env.HOST : 'https://your.dev.sprucebot.com',
	SKILL_ID: process.env.SKILL_ID
		? process.env.SKILL_ID
		: 'you should have a .env file with SKILL_ID filled in for your skill',
	log_colors: {
		error: 'red',
		warn: 'orange',
		info: 'yellow',
		verbose: 'green',
		debug: 'white',
		silly: 'pink'
	}
}

module.exports = Config
