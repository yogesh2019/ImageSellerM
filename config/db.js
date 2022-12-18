const { Sequelize } = require('sequelize');
const { user, pass } = require('./credential');
const createDb = new Sequelize('test-db', user, pass,
    {
        dialect: 'sqlite',
        host: '.config/db.sqlite',
    }
);
const connectDB = () => {
    createDb.sync().then(() => {
        console.log('connected to db');
    }
    ).catch((e) => {
        console.log('db connection failed', e);
    })
};

module.exports = { connectDB, createDb };