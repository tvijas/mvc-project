const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'library'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the remote database!');
});


module.exports = {
    connection: connection
};