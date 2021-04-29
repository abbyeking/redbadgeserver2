const { DataTypes } = require('sequelize')
const db = require('../db')

module.exports = db.define('podcast', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    images: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    publisher: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})
