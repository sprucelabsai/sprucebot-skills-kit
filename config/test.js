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
	DEV_MODE: false,
	API_HOST: 'http://localhost-api',
	API_KEY: 'womp',
	SKILL_STYLESHEET: 'http://localhost/skill.css',
	ID: 'xxx',
	NAME: 'Running unit tests',
	SLUG: 'jest-run-test',
	DESCRIPTION: 'Just running my Jest tests',
	PORT: 9000,
	SERVER_HOST: 'http://localhost-server',
	VIMEO_ID: 'xxx',
	INTERFACE_HOST: 'http://localhost-interface',
	INTERFACE_SSL_ALLOW_SELF_SIGNED: false,
	API_SSL_ALLOW_SELF_SIGNED: false
}
