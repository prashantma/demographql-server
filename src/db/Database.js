const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const Sequelize = require('sequelize');

console.log(config);
const sequelize = new Sequelize(config);

module.exports = sequelize;
