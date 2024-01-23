'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.createTable('Projects', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        startDate: {
          type: Sequelize.DATE
        },
        endDate: {
          type: Sequelize.DATE
        },
        description: {
          type: Sequelize.TEXT
        },
        technologies: {
          type: Sequelize.JSON
        },
        uploadImage: {
          type: Sequelize.STRING
        },
        authorId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Authors',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        userid: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
    },
  

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Projects')
  }
};
