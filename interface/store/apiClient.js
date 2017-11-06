import fetch from 'isomorphic-fetch'
import https from 'https'
import http from 'http'
import cookies from 'cookies'

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DEL']

class ApiClient {
	constructor(endpoint, { allowSelfSignedCerts = false }) {
		this.jwt = undefined
		this.ssl = endpoint.search('https') === 0
		this.endpoint = endpoint
		this.allowSelfSignedCerts = allowSelfSignedCerts

		methods.forEach(method => {
			this[method.toLowerCase()] = (path, options = {}) =>
				new Promise(async (resolve, reject) => {
					const { body } = options
					try {
						let headers = {
							Accept: 'application/json',
							'Content-Type': 'application/json'
						}

						let fetchOptions = {
							method,
							headers,
							body: JSON.stringify(body),
							credentials: 'same-origin'
						}

						// Allows Node to accept our self signed cert
						if (this.ssl && this.allowSelfSignedCerts) {
							const agent = new https.Agent({
								rejectUnauthorized: false
							})
							fetchOptions.agent = agent
						}

						if (this.jwt) {
							fetchOptions.headers['x-skill-jwt'] = this.jwt
						}

						// Start network request
						const response = await fetch(`${endpoint}${path}`, fetchOptions)
						const json = await response.json()
						if (!response.ok) {
							console.log('Request not okay', response.status, json)
							return reject(json)
						}

						resolve(json)
					} catch (error) {
						console.error('Response failure', error)
						reject(error)
					}
				})
		})
	}

	setJwt(jwt) {
		this.jwt = jwt
	}
}

/**
 * Creates a new api client to manage network requests
 * @param {string} host
 * @example createClient('https://www.example.com')
 * @returns {ApiClient}
 */
export default (host, options) => new ApiClient(host, options)
