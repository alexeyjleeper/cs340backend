-- drop existing tables
SET foreign_key_checks = 0;
DROP TABLE IF EXISTS Employees,
                     Events, 
                     GolfCarts, 
                     Roles, 
                     Vendors, 
                     Events_has_Employees, 
                     Events_has_Vendors;

CREATE TABLE Employees (
    employee_id int AUTO_INCREMENT NOT NULL,
    name varchar(255) NOT NULL,
    age int NOT NULL,
    PRIMARY KEY (employee_id)
);

CREATE TABLE Events (
    event_id int AUTO_INCREMENT NOT NULL,
    employee_id int NOT NULL,
    event_name varchar(255) NOT NULL,
    vendor_id int,
    time_start datetime NOT NULL,
    PRIMARY KEY (event_id),
    CONSTRAINT FOREIGN KEY (employee_id) REFERENCES Employees(employee_id),
    CONSTRAINT FOREIGN KEY (vendor_id) REFERENCES Vendors(vendor_id)
);

CREATE TABLE Vendors (
    vendor_id int AUTO_INCREMENT NOT NULL,	
    vendor_name VARCHAR(255) NOT NULL,		
	description VARCHAR(255) NOT NULL,
    PRIMARY KEY(vendor_id)
);

CREATE TABLE GolfCarts (
    golf_cart_id int AUTO_INCREMENT NOT NULL,
    last_serviced datetime NOT NULL,
    employee_id int,
    PRIMARY KEY(golf_cart_id),
    CONSTRAINT FOREIGN KEY(employee_id) REFERENCES Employees(employee_id) ON DELETE CASCADE
);

CREATE TABLE Roles (
    role_id int AUTO_INCREMENT NOT NULL,			
    description VARCHAR(255) NOT NULL,
    employee_id int NOT NULL,
    PRIMARY KEY (role_id),
    CONSTRAINT FOREIGN KEY(employee_id) REFERENCES Employees(employee_id) ON DELETE CASCADE
);

CREATE TABLE Events_has_Employees (
    Employees_employee_id int NOT NULL,
    Events_event_id int NOT NULL,
    PRIMARY KEY (Employees_employee_id, Events_event_id),
    CONSTRAINT FOREIGN KEY (Events_event_id)
    REFERENCES Events(event_id) ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY (Employees_employee_id)
    REFERENCES Employees(employee_id) ON DELETE CASCADE
);

CREATE TABLE Events_has_Vendors (
    Events_event_id int NOT NULL,
    Vendors_vendor_id int NOT NULL,
    CONSTRAINT FOREIGN KEY (Events_event_id)
    REFERENCES Events(event_id) ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY (Vendors_vendor_id)
    REFERENCES Vendors(vendor_id) ON DELETE CASCADE
);

INSERT INTO Employees (name, age)
VALUES ("Mordecai", 21),
("Rigby", 21),
("Benson", 35);

-- insert vendors before events
INSERT INTO Vendors 
(
    vendor_name,
    description
)
VALUES
(
	"Frosty’s Ice Cream",
	"Ice cream stand with 32 flavors"
),
(
	"Parks Merchandise",
	"Gift shop, apparel, brochures"
),
(
	"Park Grille",
	"Food vendor with extensive menu"
),
(
	"Park Juice",
	"Beverage stand with juice, soda, and water"
);

INSERT INTO Events (event_name, vendor_id, time_start)
VALUES ("Birthday Party", 
    (SELECT vendor_id FROM Vendors WHERE vendor_id = 1), 
    "2024-11-01 13:00:00"),
    ("Family Gathering",
    (SELECT vendor_id FROM Vendors WHERE vendor_id = 2), 
    "2024-11-01 14:00:00"),
    ("BBQ",
    (SELECT vendor_id FROM Vendors WHERE vendor_id = 4),
    "2024-11-01");

-- insert sample data into golfcarts
INSERT INTO GolfCarts 
(
    last_serviced,
    employee_id
)
VALUES
(
    '09-09-2024', 
    (SELECT employee_id FROM Employees WHERE employee_id = 1)
),
(
    '05-12-2023', 
    (SELECT employee_id FROM Employees WHERE employee_id = 2)
),
(
    '06-26-2024', 
    (SELECT employee_id FROM Employees WHERE employee_id = 3)
);

-- insert sample data into roles
INSERT INTO Roles 
(
    description,
    employee_id
)
VALUES
(
	"Ranger",
	(SELECT employee_id FROM Employees WHERE employee_id = 1)
),
(
	"Manager",
	(SELECT employee_id FROM Employees WHERE employee_id = 4)
),
(
	"Director",
	(SELECT employee_id FROM Employees WHERE employee_id = 2)
),
(
	"Groundskeeper",
	(SELECT employee_id FROM Employees WHERE employee_id = 3)
),
(
	"Scout",
	(SELECT employee_id FROM Employees WHERE employee_id = 1)
);

-- populating events-employees
DROP PROCEDURE IF EXISTS AddEvents_has_Employees;

DELIMITER //

CREATE PROCEDURE AddEvents_has_Employees (
    IN p_event_id int,
    IN p_emp_id int
)
BEGIN
    DECLARE v_event_id int;
    DECLARE v_emp_id int; 

    SELECT event_id INTO v_event_id
    FROM Events
    WHERE event_id = p_event_id;

    SELECT employee_id INTO v_emp_id
    FROM Employees
    WHERE employee_id = p_emp_id;

    INSERT INTO Events_has_Employees (Events_event_id, Employees_employee_id)
    VALUES (v_event_id, v_emp_id);
END //
DELIMITER ;

CALL AddEvents_has_Employees(1, 1);
CALL AddEvents_has_Employees(2, 2);
CALL AddEvents_has_Employees(3, 1);

-- end populating events-employees

-- populating events-vendors
DROP PROCEDURE IF EXISTS AddEvents_has_Vendors;

DELIMITER //

CREATE PROCEDURE AddEvents_has_Vendors (
    IN p_event_id int,
    IN p_vendor_id int
)
BEGIN
    DECLARE v_event_id int;
    DECLARE v_vendor_id int; 

    SELECT event_id INTO v_event_id
    FROM Events
    WHERE event_id = p_event_id;

    SELECT vendor_id INTO v_vendor_id
    FROM Vendors
    WHERE vendor_id = p_vendor_id;

    INSERT INTO Events_has_Vendors (Events_event_id, Vendors_vendor_id)
    VALUES (v_event_id, v_vendor_id);
END //
DELIMITER ;

CALL AddEvents_has_Vendors(1, 1);
CALL AddEvents_has_Vendors(2, 2);
CALL AddEvents_has_Vendors(3, 4);