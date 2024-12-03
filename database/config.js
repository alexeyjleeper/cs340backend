const mysql = require('mysql2');

/* Citation for the following var
 * Date: 10/3/2024
 * Copied from Step 1 - Connecting to a MySQL Database
 * Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database/README.md
 */
// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    waitForConnections: true,
    host : process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}).promise();

module.exports = {
    pool
};