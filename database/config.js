const mysql = require('mysql');

/* Citation for the following var
 * Date: 10/3/2024
 * Copied from Step 1 - Connecting to a MySQL Database
 * Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database/README.md
 */
// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_leeperal',
    password        : '',
    database        : 'cs340_leeperal'
})

module.exports = {
    pool
};