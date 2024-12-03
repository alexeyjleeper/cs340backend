/*
  ":" for data from backend.
*/

/*
Employees
*/

SELECT * FROM Employees;

-- CREATE
INSERT INTO Employees 
(name, age);
VALUES
(:nameData, :ageData);

-- DELETE
DELETE FROM Employees WHERE name = :nameData;

-- UPDATE
UPDATE Employees Set name = :nameData, age = :ageData;
WHERE employee_id = :employee_idData;


/*
Vendors
*/

SELECT * FROM Vendors

-- -- CREATE
INSERT INTO Vendors 
(vendor_name, description, event_id)
VALUES
(:vendor_nameData, :descriptionData, :event_idData)

-- -- DELETE
DELETE FROM Vendors WHERE vendor_name = :vendor_nameData

-- UPDATE
UPDATE Vendors Set vendor_name = :vendor_nameData, description = :descriptionData
WHERE  vendor_id = :vendor_idData;


/*
GolfCarts
*/

SELECT * FROM GolCarts

-- CREATE
INSERT INTO GolCarts 
    (last_serviced, employee_id)
VALUES
    (:last_servicedData, :employee_idData)

-- DELETE.
DELETE FROM GolCarts WHERE golf_cart_id = :golf_cart_idData


-- UPDATE
UPDATE GolCarts Set last_serviced = :last_servicedData, employee_id = :employee_idData
WHERE  golf_cart_id = :golf_cart_idData;

/*
Roles
*/

-- READ
SELECT * FROM Roles

-- CREATE
INSERT INTO Roles 
    (description, employee_id)
VALUES
    (:last_servicedData, :employee_idData)

-- DELETE.
DELETE FROM Roles WHERE role_id = :role_idData


-- UPDATE
UPDATE Roles Set description = :descriptionData, employee_id = :employee_idData
WHERE  role_id = :role_idData;

/*
Events
*/

-- READ
SELECT * FROM Events

-- CREATE
INSERT INTO EVENTS
    (employee_id, event_name, vendor_id, start_time)
VALUES
    (:employee_idData, :event_nameData, :vendor_idData, :start_timeData)

-- DELETE
DELETE FROM Events where event_id = :event_idData;

-- UPDATE
UPDATE Events Set employee_id = :employee_idData, event_name = :event_nameData, vendor_id = :vendor_idData, start_time = :start_timeData
WHERE  role_id = :role_idData;

/*
Next Shifts
*/

SELECT * FROM Events
JOIN Event_has_Employees ON Events.event_id = Event_has_Employees.event_id
AND Events.employee_id = :employee_idData
GROUP BY Events.event_id
ORDER BY Events.time_start ASC;

SELECT * FROM Roles
WHERE employee_id = :employee_idData;