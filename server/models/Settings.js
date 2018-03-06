// http://docs.sequelizejs.com/manual/tutorial/models-definition.html

const modelName = 'Settings'

module.exports = (sequelize, DataTypes) => {
	const attributes = {
		id: {
			type: DataTypes.UUID,
			primaryKey: true
		}
	}
	const options = {}
	const Settings = sequelize.define(modelName, attributes, options)

	Settings.associate = function(models) {}

	return Settings
}
