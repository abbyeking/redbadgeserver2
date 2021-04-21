// const Sequelize = require('sequelize')

// const db = new Sequelize(process.env.DATABASE_URL)

// module.exports = db

const Sequelize = require('sequelize');

// const sequelize = new Sequelize(process.env.DATABASE_URL,
    
const sequelize = new Sequelize('podcast-list',
'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    // dialectOptions: { ssl : {require: true, rejectUnauthorized: false}}
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to podcast-list postgress database');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;