const http = require('http');
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'test',
    user: 'root',
    password: 'Raj@08112003'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    } else {
        var sql = `
            CREATE TABLE IF NOT EXISTS cources (
                id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(225) NOT NULL,
                rate INT(50) NOT NULL,
                discription VARCHAR(255) NOT NULL
            ); `;
        connection.query(sql, (err, result) => {
            if (err) {
                console.log('Error creating table:', err);
            } else {
                console.log("Table created or already exists.");
            }
        });
        console.log('Connected to MySQL database');
    }
});

app.get('/', (req, res) => {
    res.send("Hi");
});

const server = http.createServer(app);
server.listen(3000);

module.exports = connection;
