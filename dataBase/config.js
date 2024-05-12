const Sequelize = require('sequelize');
const sequelize = new Sequelize('library', 'root', 'password', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});
sequelize.authenticate().then(() => {
    console.log("Connection established successful")
}).catch(() => {
    console.log("Error occurred")
});

module.exports = sequelize;