// https://github.com/lorenwest/node-config/wiki/Configuration-Files
const path = require('path')
const { omit, pick } = require('lodash')
const fs = require('fs')

// Check for .env
try {
	require('dotenv').config()
} catch (e) {
	console.error('Missing .env file for this project')
}

module.exports = {
	API_KEY: process.env.API_KEY,
	API_HOST: process.env.API_HOST,
	SKILL_ID: process.env.SKILL_ID,
	SKILL_NAME: process.env.SKILL_NAME,
	SKILL_ICON: fs
		.readFileSync(path.join(__dirname, '../icon/icon.svg'))
		.toString(),
	SKILL_DESCRIPTION: process.env.SKILL_DESCRIPTION,
	SKILL_SERVER_HOST: process.env.SKILL_SERVER_HOST,
	SKILL_SERVER_PORT: process.env.SKILL_SERVER_PORT,
	SKILL_INTERFACE_HOST: process.env.SKILL_INTERFACE_HOST,
	SKILL_INTERFACE_PORT: process.env.SKILL_INTERFACE_PORT,
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
		pick(config, [
			'SKILL_SERVER_HOST',
			'SKILL_SERVER_PORT',
			'log_colors',
			'nextConfig'
		])
}
