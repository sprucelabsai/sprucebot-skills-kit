module.exports = {
	verbose: true,
	setupFiles: ['<rootDir>/jest/enzymeSetup.js'],
	roots: ['<rootDir>/server/', '<rootDir>/interface/'],
	coverageDirectory: './coverage/',
	collectCoverage: true,
	snapshotSerializers: ['enzyme-to-json/serializer'],
	coveragePathIgnorePatterns: [
		'<rootDir>/config/',
		'<rootDir>/jest/',
		'<rootDir>/node_modules/'
	]
}
