"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			phoneNumber: {
				type: Sequelize.STRING,
				unique: true,
			},
			gender: {
				type: Sequelize.STRING,
			},
			dateOfBirth: {
				type: Sequelize.DATE,
			},
			email: {
				type: Sequelize.STRING,
				unique: true,
			},
			KTP: {
				type: Sequelize.STRING,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Users");
	},
};
