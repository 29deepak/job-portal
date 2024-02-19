const Sequelize = require('sequelize');
const uuid = require('uuid')
const sequelize = require('../utils/database');
const User = sequelize.define('user', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true

    },
    name: {
        type: Sequelize.STRING,
        allowNull: true

    },
    lastName: {
        type: Sequelize.STRING
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    location: {
        type: Sequelize.STRING,
        defaultValue: "India"
    }

}

);

module.exports = User;