const { version } = require('../package.json')
const path = require('path')
const serve = require('sprucebot-skills-kit-server')
const Sprucebot = require('sprucebot-node')

const {
	API_KEY,
	API_HOST,
	ID,
	NAME,
	ICON,
	DESCRIPTION,
	PORT,
	SERVER_HOST,
	INTERFACE_HOST,
	API_SSL_ALLOW_SELF_SIGNED,
	nextConfig,
	errors
} = require('config')

// Construct a new Sprucebot
const sprucebot = new Sprucebot({
	apiKey: API_KEY,
	id: ID,
	host: API_HOST,
	name: NAME,
	description: DESCRIPTION,
	interfaceUrl: INTERFACE_HOST,
	serverUrl: SERVER_HOST,
	svgIcon: ICON,
	allowSelfSignedCerts: API_SSL_ALLOW_SELF_SIGNED
})

// serve the skill, wait 2 seconds for debugger to connect
setTimeout(() => {
	serve({
		sprucebot,
		port: PORT,
		serverHost: SERVER_HOST,
		interfaceHost: INTERFACE_HOST,
		nextConfig: nextConfig,
		servicesDir: path.join(__dirname, 'services'),
		utilitiesDir: path.join(__dirname, 'utilities'),
		controllersDir: path.join(__dirname, 'controllers'),
		listenersDir: path.join(__dirname, 'events'),
		middlewareDir: path.join(__dirname, 'middleware'),
		staticDir: path.join(__dirname, 'static'),
		langDir: path.join(__dirname, '..', 'interface', 'lang'),
		errors
	})
}, 2000)
