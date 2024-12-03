const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require('./database/config.js');

const app = express();
const PORT = process.env.PORT || 8500;

// Middleware:

// If on FLIP, use cors() middleware to allow cross-origin requests from the frontend with your port number:
// EX (local): http://localhost:5173 
// EX (FLIP/classwork) http://flip3.engr.oregonstate.edu:5173
app.use(cors());
app.use(express.json());

// API Routes for backend CRUD:
app.use("/api/employees", require("./routes/employeesRoutes.js"));

// define a new GET request with express:
app.get('/api/diagnostic', async (req, res) => {
    let connection;
  
    try {
      // Get a connection from the pool
      connection = await db.pool.getConnection();
      console.log('Connection established.');
  
      // Drop the table if it exists
      try {
        await connection.query('DROP TABLE IF EXISTS diagnostic;');
        console.log('Table dropped successfully.');
      } catch (err) {
        console.error('Error dropping the table:', err.message);
        return res.status(500).send('Failed to drop table');
      }
  
      // Create the table
      try {
        await connection.query('CREATE TABLE diagnostic (id INT AUTO_INCREMENT, text VARCHAR(255) NOT NULL, PRIMARY KEY (id));');
        console.log('Table created successfully.');
      } catch (err) {
        console.error('Error creating the table:', err.message);
        return res.status(500).send('Failed to create table');
      }
  
      // Insert a new row
      try {
        await connection.query('INSERT INTO diagnostic (text) VALUES ("MySQL is working!");');
        console.log('Row inserted successfully.');
      } catch (err) {
        console.error('Error inserting row:', err.message);
        return res.status(500).send('Failed to insert row');
      }
  
      // Select all rows from the table
      try {
        const results = await connection.query('SELECT * FROM diagnostic;');
        console.log('Query results:', results);
  
        // Send the results as JSON response
        res.json(results);
      } catch (err) {
        console.error('Error selecting rows:', err.message);
        return res.status(500).send('Failed to retrieve rows');
      }
  
    } catch (error) {
      console.error('General error:', error);
      res.status(500).send('Server error');
    } finally {
      // Release the connection back to the pool
      if (connection) {
        connection.release();
        console.log('Connection released back to the pool.');
      }
    }
  });

app.get('/api/getEmployeesTable', async (req, res) => {
  let connection;

  try {
    //establish connection
    connection = await db.pool.getConnection();
    console.log('Connection established.');

    try {
      const results = await connection.query('SELECT * FROM Employees;');

      //workable format
      const output = results[0];

      //init 2d array of values
      const values = [];

      console.log(output);

      //populate 2d array of values
      for (let i = 0; i < output.length; i++) {
        const row = [];
        row.push(output[i]['employee_id']);
        row.push(output[i]['name']);
        row.push(output[i]['age']);
        values.push(row);
      }

      console.log("got past calculations");

      // Send the results as JSON response
      res.json(values);
    } catch (err) {
      console.error('Error selecting rows:', err.message);
      return res.status(500).send('Failed to retrieve rows');
    }
  } catch (error) {
    console.error('General error:', error);
    res.status(500).send('Server error');
  } finally {
    // Release the connection back to the pool
    if (connection) {
      connection.release();
      console.log('Connection released back to the pool.');
    }
  }
})

// READ endpoint for golf carts page
app.get('/api/getGolfCartsTable', async (req, res) => {
  let connection;

  try {
    //establish connection
    connection = await db.pool.getConnection();
    console.log('Connection established.');

    try {
      const results = await connection.query('SELECT * FROM GolfCarts;');

      //workable format
      const output = results[0];

      //init 2d array of values
      const values = [];

      console.log(output);

      //populate 2d array of values
      for (let i = 0; i < output.length; i++) {

        const row = [];

        // get datetime as string so i can do string slicing and reformat the datetime
        const datetime = `${output[i]['last_serviced']}`;

        row.push(output[i]['golf_cart_id']);
        row.push(datetime.slice(4, 15));
        row.push(output[i]['employee_id']);
        values.push(row);
      }

      // Send the results as JSON response
      res.json(values);
    } catch (err) {
      console.error('Error selecting rows:', err.message);
      return res.status(500).send('Failed to retrieve rows');
    }
  } catch (error) {
    console.error('General error:', error);
    res.status(500).send('Server error');
  } finally {
    // Release the connection back to the pool
    if (connection) {
      connection.release();
      console.log('Connection released back to the pool.');
    }
  }
});

// READ endpoint for vendors page
app.get('/api/getVendorsTable', async (req, res) => {
  let connection;

  try {
    //establish connection
    connection = await db.pool.getConnection();
    console.log('Connection established.');

    try {
      const results = await connection.query('SELECT * FROM Vendors;');

      //workable format
      const output = results[0];

      //init 2d array of values
      const values = [];

      console.log(output);

      //populate 2d array of values
      for (let i = 0; i < output.length; i++) {
        const row = [];
        row.push(output[i]['vendor_id']);
        row.push(output[i]['vendor_name']);
        row.push(output[i]['description']);
        values.push(row);
      }

      // Send the results as JSON response
      res.json(values);
    } catch (err) {
      console.error('Error selecting rows:', err.message);
      return res.status(500).send('Failed to retrieve rows');
    }
  } catch (error) {
    console.error('General error:', error);
    res.status(500).send('Server error');
  } finally {
    // Release the connection back to the pool
    if (connection) {
      connection.release();
      console.log('Connection released back to the pool.');
    }
  }
});

// READ endpoint for employees page
app.get('/api/getEventsTable', async (req, res) => {
  let connection;

  try {
    //establish connection
    connection = await db.pool.getConnection();
    console.log('Connection established.');

    try {
      const results = await connection.query('SELECT * FROM Events;');

      //workable format
      const output = results[0];

      //init 2d array of values
      const values = [];

      console.log(output);

      //populate 2d array of values
      for (let i = 0; i < output.length; i++) {
        const row = [];
        row.push(output[i]['event_id']);
        row.push(output[i]['employee_id']);
        row.push(output[i]['event_name']);
        row.push(output[i]['vendor_id']);

        // reformat datetime
        const datetime = `${output[i]['time_start']}`;
        console.log(datetime);
        row.push(datetime.slice(4, 15) + " " + datetime.slice(16, 21));
        values.push(row);
      }

      // Send the results as JSON response
      res.json(values);
    } catch (err) {
      console.error('Error selecting rows:', err.message);
      return res.status(500).send('Failed to retrieve rows');
    }
  } catch (error) {
    console.error('General error:', error);
    res.status(500).send('Server error');
  } finally {
    // Release the connection back to the pool
    if (connection) {
      connection.release();
      console.log('Connection released back to the pool.');
    }
  }
});

// READ endpoint for roles page
app.get('/api/getRolesTable', async (req, res) => {
  let connection;

  try {
    //establish connection
    connection = await db.pool.getConnection();
    console.log('Connection established.');

    try {
      const results = await connection.query('SELECT * FROM Roles;');

      //workable format
      const output = results[0];

      //init 2d array of values
      const values = [];

      console.log(output);

      //populate 2d array of values
      for (let i = 0; i < output.length; i++) {
        const row = [];
        row.push(output[i]['role_id']);
        row.push(output[i]['description']);
        row.push(output[i]['employee_id']);
        values.push(row);
      }

      // Send the results as JSON response
      res.json(values);
    } catch (err) {
      console.error('Error selecting rows:', err.message);
      return res.status(500).send('Failed to retrieve rows');
    }
  } catch (error) {
    console.error('General error:', error);
    res.status(500).send('Server error');
  } finally {
    // Release the connection back to the pool
    if (connection) {
      connection.release();
      console.log('Connection released back to the pool.');
    }
  }
});



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