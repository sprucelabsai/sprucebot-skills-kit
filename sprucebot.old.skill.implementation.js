// EXAMPLE FOR STARTINGS
// SHOULD BE UPLOADED TO NPM as "sprucebot"
// Move to promises

var api = exports,
	http = require('https')

api.apiKey = false
api.host = ''
api.skillId = ''
api._cache = {}

/**
* Clear all cache
*/
api.clearCache = function() {
	this._cache = {}
}

/**
* Turns an object into a query string.
*
* @param obj
* @returns {string}
*/
api.serialize = function(obj) {
	var str = []
	for (var p in obj)
		if (obj.hasOwnProperty(p)) {
			str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
		}
	return str.join('&')
}

/**
* GET request
*
* @param url
* @param cb
* @param query
*/
api.get = function(url, cb, query) {
	var urlWithQuery = url

	if (urlWithQuery.search(/\?/) === -1) {
		urlWithQuery += '?'
	} else {
		urlWithQuery += '&'
	}

	if (this.apiKey) {
		urlWithQuery += 'apiKey=' + this.apiKey
	}

	if (query) {
		urlWithQuery += '&' + this.serialize(query)
	}

	var cacheKey = urlWithQuery

	if (true || !this._cache[cacheKey]) {
		http.get(
			{
				host: this.host,
				path: '/api/1.0/skills/' + this.skillId + urlWithQuery
			},
			function(response) {
				// Continuously update stream with data
				var body = ''
				response.on('data', function(d) {
					body += d
				})

				response.on(
					'end',
					function() {
						try {
							// Data reception is done, do whatever with it!
							var parsed = JSON.parse(body)
							this._cache[cacheKey] = parsed

							if (response.statusCode == 404) {
								cb(new Error('Not Found.'))
							} else if (response.statusCode !== 200) {
								cb(new Error(parsed.reason || parsed))
							} else {
								cb(null, parsed)
							}
						} catch (err) {
							cb(err)
						}
					}.bind(this)
				)

				response.on(
					'error',
					function(err) {
						cb(err)
					}.bind(this)
				)
			}.bind(this)
		)
	} else {
		//results are cached
		cb(null, this._cache[cacheKey])
	}
}

/**
* POST request
*
* @param url
* @param form
* @param cb
* @param query
*/
api.post = function(url, form, cb, query) {
	//reset cache on posts
	this._cache = {}

	var urlWithQuery = url
	cb = cb || function() {}

	if (urlWithQuery.search(/\?/) === -1) {
		urlWithQuery += '?'
	} else {
		urlWithQuery += '&'
	}

	if (this.apiKey) {
		urlWithQuery += 'apiKey=' + this.apiKey
	}

	if (query) {
		urlWithQuery += '&' + this.serialize(query)
	}

	var request = http.request(
		{
			method: 'POST',
			host: this.host,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			path: '/api/1.0/skills/' + this.skillId + urlWithQuery
		},
		function(response) {
			// Continuously update stream with data
			var body = ''
			response.on('data', function(d) {
				body += d
			})

			response.on(
				'end',
				function() {
					try {
						// Data reception is done, do whatever with it!
						var parsed = JSON.parse(body)

						if (response.statusCode !== 200) {
							cb(new Error(parsed.reason || parsed))
						} else {
							cb(null, parsed)
						}
					} catch (err) {
						cb(err)
					}
				}.bind(this)
			)

			response.on(
				'error',
				function(err) {
					cb(err)
				}.bind(this)
			)
		}.bind(this)
	)

	request.write(this.serialize(form))
	request.end()
}

/**
* PATCH request
*
* @param url
* @param form
* @param cb
* @param query
*/
api.patch = function(url, form, cb, query) {
	//reset cache on posts
	this._cache = {}

	var urlWithQuery = url
	cb = cb || function() {}

	if (urlWithQuery.search(/\?/) === -1) {
		urlWithQuery += '?'
	} else {
		urlWithQuery += '&'
	}

	if (this.apiKey) {
		urlWithQuery += 'apiKey=' + this.apiKey
	}

	if (query) {
		urlWithQuery += '&' + this.serialize(query)
	}

	var request = http.request(
		{
			method: 'PATCH',
			host: this.host,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			path: '/api/1.0/skills/' + this.skillId + urlWithQuery
		},
		function(response) {
			// Continuously update stream with data
			var body = ''
			response.on('data', function(d) {
				body += d
			})

			response.on(
				'end',
				function() {
					try {
						// Data reception is done, do whatever with it!
						var parsed = JSON.parse(body)

						if (response.statusCode !== 200) {
							cb(new Error(parsed.reason || parsed))
						} else {
							cb(null, parsed)
						}
					} catch (err) {
						cb(err)
					}
				}.bind(this)
			)

			response.on(
				'error',
				function(err) {
					cb(err)
				}.bind(this)
			)
		}.bind(this)
	)

	request.write(this.serialize(form))
	request.end()
}

/**
* DELETE request
*
* @param url
* @param cb
* @param query
*/
api['delete'] = function(url, cb, query) {
	//reset cache on posts
	this._cache = {}

	var urlWithQuery = url
	cb = cb || function() {}

	if (urlWithQuery.search(/\?/) === -1) {
		urlWithQuery += '?'
	} else {
		urlWithQuery += '&'
	}

	if (this.apiKey) {
		urlWithQuery += 'apiKey=' + this.apiKey
	}

	if (query) {
		urlWithQuery += '&' + this.serialize(query)
	}

	var request = http.request(
		{
			method: 'DELETE',
			host: this.host,
			path: '/api/1.0/skills/' + this.skillId + urlWithQuery
		},
		function(response) {
			// Continuously update stream with data
			var body = ''
			response.on('data', function(d) {
				body += d
			})

			response.on(
				'end',
				function() {
					try {
						// Data reception is done, do whatever with it!
						var parsed = JSON.parse(body)

						if (response.statusCode !== 200) {
							cb(new Error(parsed.reason || parsed))
						} else {
							cb(null, parsed)
						}
					} catch (err) {
						cb(err)
					}
				}.bind(this)
			)

			response.on(
				'error',
				function(err) {
					cb(err)
				}.bind(this)
			)
		}.bind(this)
	)

	request.write('')
	request.end()
}

/**
* Gets you data on a skill by any arbitrary query.
*
* @param cb
* @param query {  }
*/
api.getData = function(cb, query) {
	cb = cb || function() {}

	this.get(
		'/data',
		function(err, data) {
			if (err) {
				cb(err)
				return
			}

			data.forEach(function(row) {
				try {
					row.value = JSON.parse(row.value)
				} catch (err) {
					console.log('error parsing data', err)
				}
			})

			cb(err, data)
		},
		query
	)
}

api.getDataAsObject = function(cb, query) {
	cb = cb || function() {}

	this.getData(function(err, data) {
		if (err) {
			cb(err)
			return
		}

		var dataObject = {}

		data.forEach(function(row) {
			dataObject[row.key] = row.value
		})

		cb(null, dataObject)
	}, query)
}

api.postData = function(key, value, form, cb, query) {
	form = form || {}
	form.key = key
	form.value = JSON.stringify(value)
	this.post('/data', form, cb, query)
}

api.deleteData = function(skillId, cb) {
	api.delete('/data/' + skillId, cb)
}

api.patchData = function(id, value, form, cb, query) {
	form.value = JSON.stringify(value)
	this.patch('/data/' + id, form, cb, query)
}

api.patchDataAsObject = function(dataObject, cb, query) {
	api.getData(function(err, data) {
		if (err) {
			console.log(err)
			cb(err)
			return
		}

		var keys = Object.keys(dataObject),
			errored = false,
			results = [],
			count = 0,
			remaining = keys.slice(0)

		keys.forEach(function(key) {
			data.forEach(function(row) {
				if (row.key === key) {
					remaining.splice(remaining.indexOf(key), 1)

					api.patchData(row.id, dataObject[key], {}, function(err, _results) {
						if (err) {
							errored = true
							cb(err)
							return
						}

						if (errored) {
							return
						}

						results.push(_results)
						count++

						if (count === keys.length) {
							cb(null, results)
						}
					})
				}
			})
		})

		if (remaining.length > 0) {
			cb(
				new Error(
					'Cannot patch data for missing keys (' +
						remaining.join(', ') +
						'). Make sure you set them in exports.defaultData at the top of controller.js'
				)
			)
			errored = true
		}
	}, query)
}

api.sendMessage = function(locationId, userId, message, cb, form, query) {
	form = form || {}
	form.userId = userId
	form.message = message

	this.post('/locations/' + locationId + '/messages', form, cb, query)
}

api.locations = function(cb, query) {
	this.get('/locations', cb, query)
}

api.skill = function(cb, query) {
	this.get('', cb, query)
}

api.users = function(locationId, cb, query) {
	this.get('/locations/' + locationId + '/users', cb, query)
}

/**
* Get a user by id.
*
* @param locationId
* @param userId
* @param cb
* @param query
*/
api.user = function(locationId, userId, cb, query) {
	this.get('/locations/' + locationId + '/users/' + userId, cb, query)
}

/**
* Clear all your data for this location
*
* @param locationId
* @param cb
*/
api.clearDataForLocation = function(locationId, cb) {
	this.getData(
		function(err, data) {
			;(data || []).forEach(function(row) {
				this.deleteData(row.id, function(err) {
					console.log('data cleared for ' + locationId)
				})
			})
		}.bind(this),
		{
			locationId: locationId
		}
	)
}

/**
* Setup the default data for skill and location
*
* @param locationId
* @param defaults
*/
api.setupDefaultDataForLocation = function(locationId, defaults) {
	//get all data for this location
	this.getData(
		function(err, data) {
			if (err) {
				console.log('Could not get data for location ' + locationId)
				console.log(err)
			}

			var keys = Object.keys(defaults)

			data.forEach(function(row) {
				var idx = keys.indexOf(row.key)

				if (idx > -1) {
					keys.splice(idx, 1)
				}
			})

			//make sure each location has the data we need
			keys.forEach(function(key) {
				this.postData(
					key,
					defaults[key],
					{
						locationId: locationId
					},
					function(err, response) {
						if (!err) {
							console.log('created setting', key)
						} else {
							console.log('failed to create data with key', key)
							console.log(err)
						}
					}
				)
			}, this)
		}.bind(this),
		{
			locationId: locationId,
			guestId: 'null'
		}
	)
}

/**
* Setup default data for all locations for this skill
*
* @param defaults
*/
api.setupDefaultData = function(defaults) {
	//get all the locations where I'm installed
	this.locations(
		function(err, locations) {
			if (err) {
				console.log('failed loading locations')
				console.log(err)
				return
			}

			//install my required data for each location
			locations.forEach(
				function(location) {
					this.setupDefaultDataForLocation(location.id, defaults)
				}.bind(this)
			)
		}.bind(this)
	)
}
