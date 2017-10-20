const Config = {
	API_KEY: process.env.API_KEY
		? process.env.API_KEY
		: '32f90a43-4d2d-4224-9e7b-d55b706f564d',
	HOST: process.env.HOST
		? process.env.HOST
		: 'https://my.dev.sprucebot.com',
	SKILL_ID: process.env.SKILL_ID
		? process.env.SKILL_ID
		: '3eab57bb-62dc-4d3e-adde-f3ec96192a90',
	log_colors: {
		error: 'red',
		warn: 'orange',
		info: 'yellow',
		verbose: 'green',
		debug: 'white',
		silly: 'pink'
	}
};

module.exports = Config;

