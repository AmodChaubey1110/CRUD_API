const { Sequelize, DataTypes } = require('sequelize');

const dbUser=process.env.DB_USERNAME
const dbPassword=process.env.DB_PASSWORD

const sequelize = new Sequelize('company', dbUser, dbPassword, {
	host: 'localhost',
	dialect: 'mysql',
});

try {
	sequelize.authenticate();
	console.log('Connection has been established successfully.');
} catch (error) {
	console.error('Unable to connect to the database:', error);
}

const db = {};

db.Sequelize = Sequelize;
db.Sequelize = sequelize;

db.user = require('./user')(sequelize, DataTypes);

// sequelize.sync({alter:true});

module.exports = db;
