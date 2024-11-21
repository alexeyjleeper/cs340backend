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

        const query = "INSERT INTO Employees (name, age) VALUES (?, ?)";
        
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

    const [data] = await db.query("SELECT * FROM Employees WHERE employee_id = ?", [employeeId]);

    const oldEmployee = data[0];

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newEmployee, oldEmployee)) {
      const query =
        "UPDATE Employees SET name=?, age=? WHERE employee_id=?";

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
        res.status(500).json({ error: `Error updating the employee with id ${employeeId}` });
    }
};

//delete
// Endpoint to delete an employee from the database
const deleteEmployee = async (req, res) => {
    console.log("Deleting employee with id:", req.params.id);
    const employeeId = req.params.id;
  
    try {
        // Ensure the employee exitst
        const [isExisting] = await db.query(
            "SELECT 1 FROM Employees WHERE employee_id = ?",
            [employeeId]
        );
    
        // If the employee doesn't exist, return an error
        if (isExisting.length === 0) {
            return res.status(404).send("Employee not found");
        }
    
        // ON DELETE CASCADE should handle FK relationships
    
        // Delete the employee from Employees
        await db.query("DELETE FROM Employees WHERE employee_id = ?", [employeeId]);
    
        // Return the appropriate status code
        res.status(204).json({ message: "Employee deleted successfully" })
        } catch (error) {
            console.error("Error deleting employee from the database:", error);
            res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
};