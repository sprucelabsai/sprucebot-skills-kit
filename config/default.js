// https://github.com/lorenwest/node-config/wiki/Configuration-Files
const path = require('path')
const { omit, pick } = require('lodash')
const fs = require('fs')
const errors = require('./errors')
// Check for .env
try {
	require('dotenv').config()
} catch (e) {
	console.error('Missing .env file for this project')
}

module.exports = {
	DEV_MODE: process.env.DEV_MODE === 'true',
	API_HOST: process.env.API_HOST,
	API_KEY: process.env.API_KEY,
	SKILL_STYLESHEET: process.env.SKILL_STYLESHEET,
	ID: process.env.ID,
	NAME: process.env.NAME,
	SLUG: process.env.SLUG,
	DESCRIPTION: process.env.DESCRIPTION,
	ICON: fs.readFileSync(path.join(__dirname, '../icon/icon.svg')).toString(),
	PORT: process.env.PORT,
	SERVER_HOST: process.env.SERVER_HOST,
	VIMEO_ID: process.env.VIMEO_ID,
	INTERFACE_HOST: process.env.INTERFACE_HOST,
	INTERFACE_SSL_ALLOW_SELF_SIGNED:
		process.env.INTERFACE_SSL_ALLOW_SELF_SIGNED === 'true',
	API_SSL_ALLOW_SELF_SIGNED: process.env.API_SSL_ALLOW_SELF_SIGNED === 'true',
	WHITELABEL: process.env.WHITELABEL,
	utilities: {}, // Settings for any utilities.
	services: {
		'uploads.disabled': {
			uploader: './uploads/s3',
			options: {
				Bucket: 'some-bucket-name',
				accessKeyId: process.env.AWS_ACCESS_KEY_ID,
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
			}
		}
	}, // Settings for any services.
	bodyParserOptions: {
		// passthrough to https://github.com/koajs/bodyparser
		jsonLimit: '1mb'
	},
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
		dev: process.env.DEV_MODE === 'true', // next.js development mode
		quiet: false
	},
	// Error responses
	errors,
	// Omit keys from client.json config
	sanitizeClientConfig: config =>
		pick(config, [
			'NAME',
			'ICON',
			'DESCRIPTION',
			'SERVER_HOST',
			'SKILL_STYLESHEET',
			'INTERFACE_SSL_ALLOW_SELF_SIGNED',
			'VIMEO_ID',
			'DEV_MODE',
			'log_colors',
			'nextConfig',
			'WHITELABEL',
			'SLUG'
		])
}
