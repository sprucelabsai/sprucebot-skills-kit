import fetch from 'isomorphic-fetch'
import https from 'https'

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DEL']

class ApiClient {
	constructor(endpoint) {
		this.jwt = null

		methods.forEach(method => {
			this[method.toLowerCase()] = (path, options = {}) =>
				new Promise(async (resolve, reject) => {
					const { body } = options
					try {
						console.log('ApiClient request Start %s', `${endpoint}${path}`)
						let headers = {
							Accept: 'application/json',
							'Content-Type': 'application/json'
						}

						if (this.jwt) {
							headers = {
								...headers,
								Authorization: `JWT ${this.jwt}`
							}
						}

						// TODO - DO NO DO THIS IN PRODUCTION
						// Allows Node to accept our self signed cert
						const agent = new https.Agent({
							rejectUnauthorized: false
						})

						// Start network request
						const response = await fetch(`${endpoint}${path}`, {
							method,
							headers,
							body: JSON.stringify(body),
							agent,
							credentials: 'include'
						})

						const json = await response.json()
						if (!response.ok) {
							console.log('Request not okay', response.status, json)
							return reject(json)
						}

						console.log('Response success', json)
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
export default host => new ApiClient(host)
