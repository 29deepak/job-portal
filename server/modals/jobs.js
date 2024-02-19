const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const Jobs = sequelize.define('job', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true

    },
    company: {
        type: Sequelize.STRING,
        allowNull: true

    },
    position: {
        type: Sequelize.STRING,
        allowNull: true
    },

    status: {
        type: Sequelize.ENUM('pending', 'reject', 'interview'),
        allowNull: false,
        defaultValue: "pending"
    },
    workType: {
        type: Sequelize.ENUM("full-time", "part-time", "internship", 'contaract'),
        allowNull: false,
        defaultValue: "full-time"
    },
    workLocation: {
        type: Sequelize.STRING,
        defaultValue: "Mumbai",
        allowNull: false
    },

}

);

module.exports = Jobs;