// https://github.com/lorenwest/node-config/wiki/Configuration-Files
const path = require('path')
const { omit } = require('lodash')
try {
	require('dotenv').config()
} catch (e) {
	console.error('Missing .env file for this project')
}
module.exports = {
	API_KEY: process.env.API_KEY || '62a22141-fb9d-48b3-8a5b-e27b374f60b4',
	HOST: process.env.HOST || 'https://api.sprucebot.com/api/1.0',
	SKILL_ID: process.env.SKILL_ID || '62a22141-fb9d-48b3-8a5b-e27b374f60b4',
	SKILL_NAME: process.env.SKILL_NAME || 'Base Sprucebot Skill',
	PORT: process.env.PORT || 3006,
	log_colors: {
		error: 'red',
		warn: 'orange',
		info: 'yellow',
		verbose: 'green',
		debug: 'white',
		silly: 'pink'
	},
	nextConfig: {
		dir: path.resolve(__dirname, '../interface'),
		dev: true // next.js development mode
	},
	// Omit keys from client.json config
	sanitizeClientConfig: config =>
		omit(config, ['API_KEY', 'sanitizeClientConfig'])
}
