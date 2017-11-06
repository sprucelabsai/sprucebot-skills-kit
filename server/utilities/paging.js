module.exports = {
	normalize: ({ page, limit }) => {
		return { page: page || 0, limit: limit || 10 }
	}
}
