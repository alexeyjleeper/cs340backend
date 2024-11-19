/* Citation for the following code:
* Date: 11/18/2024
* Based on: 
* Source URL: https://github.com/osu-cs340-ecampus/react-starter-app/blob/main/App/backend/controllers/peopleRoutes.js */

const express = require("express");
const router = express.Router();

const {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
} = require("../controllers/employeesController");

router.get("/", getEmployees);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;