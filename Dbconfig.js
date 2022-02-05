require('dotenv').config();
const Sequelize = require('sequelize');

const { DataTypes } = Sequelize;
const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: false,
    freezeTableName: true,
};

const sequelize = new Sequelize({
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    host: process.env.host,
    password: process.env.DB_PASSWORD,
    dialect: 'mysql',
    operatorsAliases: false
});


module.exports = { sequelize, DataTypes, DISABLE_SEQUELIZE_DEFAULTS }