const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8500;

// Middleware:

// If on FLIP, use cors() middleware to allow cross-origin requests from the frontend with your port number:
// EX (local): http://localhost:5173 
// EX (FLIP/classwork) http://flip3.engr.oregonstate.edu:5173
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());

// API Routes for backend CRUD:
app.use("/api/employees", require("./routes/Routes"));


// Add your Connect DB Activitiy Code Below:
// ...

/* Citation for the following var
 * Date: 10/3/2024
 * Copied from Step 1 - Connecting to a MySQL Database
 * Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database/README.md
 */

/*
app.get('/', function(req, res)
    {
        // Define our queries
        const query1 = 'DROP TABLE IF EXISTS diagnostic;';
        const query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
        const query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working for leeperal!")'; //replace with your onid
        const query4 = 'SELECT * FROM diagnostic;';

        // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

        // DROP TABLE...
        pool.query(query1, function (err, results, fields){

            // CREATE TABLE...
            pool.query(query2, function(err, results, fields){

                // INSERT INTO...
                pool.query(query3, function(err, results, fields){

                    // SELECT *...
                    pool.query(query4, function(err, results, fields){

                        // Send the results to the browser
                        res.send(JSON.stringify(results));
                    });
                });
            });
        });
    });

*/

// ...
// End Connect DB Activity Code.


const os = require("os");
const hostname = os.hostname();

app.listen(PORT, () => {
  // flip server should automatically match whatever server you're on 
  console.log(`Server running:  http://${hostname}:${PORT}...`);
});