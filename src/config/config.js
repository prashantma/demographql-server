/**
 *
 * Author:  AppSeed.us
 *
 * License: MIT - Copyright (c) AppSeed.us
 * @link https://github.com/app-generator/nodejs-starter
 *
 */

const options = {
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
  }
};

module.exports = {
	development: {
		dialect: 'sqlite',
    storage: './todo.development.sqlite',
    ...options,
	},
	test: {
		dialect: 'sqlite',
    storage: ':memory:',
    ...options,
	},
	production: {
		dialect: 'sqlite',
    storage: ':memory:',
    ...options,
	},
	/**
	production: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOSTNAME,
		dialect: 'mysql',
		use_env_variable: 'DATABASE_URL'
	}
	 */
};
