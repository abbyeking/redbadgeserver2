const { DataTypes } = require('sequelize')
const db = require('../db')

module.exports = db.define('notes', {
    note: {
        type: DataTypes.TEXT,
        allowNull: true
    }
})