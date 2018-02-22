// http://docs.sequelizejs.com/manual/tutorial/models-definition.html

const modelName = 'Settings'

module.exports = (sequelize, DataTypes) => {
	const attributes = {
		id: {
			type: DataTypes.UUID,
			primaryKey: true
		}
	}
	const options = {
		classMethods: {
			associate(models) {}
		}
	}
	return sequelize.define(modelName, attributes, options)
}
