module.exports = {
	verbose: true,
	setupFiles: ['<rootDir>/jest/enzymeSetup.js'],
	testPathIgnorePatterns: [
		'<rootDir>/interface/.next',
		'<rootDir>/config/test.js'
	],
	coverageDirectory: './coverage/',
	collectCoverage: true,
	snapshotSerializers: ['enzyme-to-json/serializer'],
	coveragePathIgnorePatterns: [
		'<rootDir>/config/',
		'<rootDir>/jest/',
		'<rootDir>/node_modules/'
	]
}
