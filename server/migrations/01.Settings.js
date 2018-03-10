// http://docs.sequelizejs.com/manual/tutorial/migrations.html#creating-first-model-and-migration-
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Settings', // The model.name
			[
				{
					id: 'd5c75a52-77ec-45f1-a6ba-556d4cca83a1',
					createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
					updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
				}
			],
			{}
		)
	}
}
