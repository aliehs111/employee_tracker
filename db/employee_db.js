// db.js
const mysql = require('mysql2');

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employee_tracker_db',
};

// Create a connection to the database
const db = mysql.createConnection(dbConfig);

module.exports = db;