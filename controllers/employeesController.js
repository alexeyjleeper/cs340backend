/* Citation for the following functions:
* Date: 11/18/2024
* Based on: 
* Source URL: https://github.com/osu-cs340-ecampus/react-starter-app/blob/main/App/backend/controllers/peopleController.js */

// Load db config
const db = require("../database/config.js");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

//read
const getEmployees = async (req, res) => {
    try {
        // select all rows from employees table
        const query = "SELECT * FROM Employees";
        // send query to db
        const [rows] = db.query(query);
        // return rows to UI
        res.json(rows);

    } catch (error) {

        console.error("Error fetching all employees from the database");

        res.status(500).json({error: "Error fetching all employees from the database"});

    }
};

//create
const createEmployee = async (req, res) => {
    try {
        // get all user inputs into variables
        const {name, age} = req.body;

        const query = `INSERT INTO Employees (name, age) VALUES (?, ?)`;
        
        response = db.query(query, [name, age]);
        
        res.status(201).json(response);

    } catch (error) {

        console.error("Error fetching all employees from the database");

        res.status(500).json({error: "Error fetching all employees from the database"});

    }
};

//update
const updateEmployee = async (req, res) => {
    // Get the person ID
    const employeeId = req.params.id;
    // Get the person object
    const newEmployee = req.body;

    try {

    const [data] = await db.query("SELECT * FROM bsg_people WHERE id = ?", [employeeId]);

    const oldEmployee = data[0];

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newEmployee, oldEmployee)) {
      const query =
        "UPDATE bsg_people SET name=?, age=? WHERE id=?";

      const values = [
        newEmployee.name,
        newEmployee.age,
        employeeId
      ];

      // Perform the update
      await db.query(query, values);

      return res.json({ message: "employee updated successfully." });
    }

    res.json({ message: "Person details are the same, no update" });
    } catch (error) {
        console.log("Error updating person", error);
        res.status(500).json({ error: `Error updating the person with id ${employeeId}` });
    }
};

//delete
// Endpoint to delete a customer from the database
const deletePerson = async (req, res) => {
    console.log("Deleting person with id:", req.params.id);
    const personID = req.params.id;
  
    try {
        // Ensure the person exitst
        const [isExisting] = await db.query(
            "SELECT 1 FROM Employees WHERE id = ?",
            [personID]
        );
    
        // If the person doesn't exist, return an error
        if (isExisting.length === 0) {
            return res.status(404).send("Employee not found");
        }
    
        // Delete related records from the intersection table (see FK contraints bsg_cert_people)
        const [response] = await db.query(
            "DELETE FROM bsg_cert_people WHERE pid = ?",
            [personID]
        );
    
        console.log(
            "Deleted",
            response.affectedRows,
            "rows from bsg_cert_people intersection table"
        );
    
        // Delete the person from bsg_people
        await db.query("DELETE FROM bsg_people WHERE id = ?", [personID]);
    
        // Return the appropriate status code
        res.status(204).json({ message: "Person deleted successfully" })
        } catch (error) {
            console.error("Error deleting person from the database:", error);
            res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getname,
    postname,
};