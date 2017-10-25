class Sprucebot {
	constructor(config) {
		// Check against defaults to see if dev has updated their env vars
		const dqStr = 'you should'
		if (
			config.apiKey.indexOf(dqStr) >= 0 ||
			config.skillId.indexOf(dqStr) >= 0 ||
			config.host.indexOf(dqStr) >= 0 ||
			config.skillName.indexOf(dqStr) >= 0
		) {
			throw new Error(
				'Oi! You need to create an .env file at the root of this repository! 😠  Jk, but for real, you should take a peak at .env.sample and then customize your own but just call it .env . Alternatively, if you prefer, you can use an awesome tool like PM2, Nodemon, or ForeverJS to manage this server-process and environment.'
			)
		}

		// Check required configs for instantiating the class
		const configParamErrorBaseStr =
			'Sprucebot Class requires a single configuration object including'
		if (!config.apiKey) {
			throw new Error(`${configParamErrorBaseStr} an apiKey key/value pair`)
		} else if (!config.host) {
			throw new Error(`${configParamErrorBaseStr} a host key/value pair`)
		} else if (!config.skillId) {
			throw new Error(`${configParamErrorBaseStr} a skillId key/value pair`)
		} else if (!config.skillName) {
			throw new Error(`${configParamErrorBaseStr} a skillName key/value pair`)
		}
		this.apiKey = config.apiKey
		this.host = config.host
		this.skillId = config.skillId
		this.skillName = config.skillName

		console.log(
			`🌲 Sprucebot🌲 Skills Kit instantiated with : \napiKey : ${this
				.apiKey}, \nhost : ${this.host}, \nskillId : ${this
				.skillId} \nskillName : ${this
				.skillName} \n---------------------------------`
		)
	}

	middleware(ctx, next) {
		console.log('Run request through Sprucebot middleware, OkeeThx')
		//await next();
		return async function(ctx, next) {
			await next()
		}
	}

	afterware() {
		console.log('Run request through Sprucebot afterware, OkeeThx')
		/*return async function (ctx, next) {
	    await next();
	  };*/
	}
}

module.exports = Sprucebot
