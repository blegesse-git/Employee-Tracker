--employee--

INSERT INTO department (name) VALUES
("HR");
INSERT INTO department (name) VALUES
("Finance");
INSERT INTO department (name) VALUES
("Sales");
INSERT INTO department (name) VALUES
("Engineer");
INSERT INTO department (name) VALUES
("Legal");

INSERT INTO role (title, salary, department_id) VALUES 
("Staffing", 80000, 1);
INSERT INTO role (title, salary, department_id) VALUES 
("Sales", 90000, 3);
INSERT INTO role (title, salary, department_id) VALUES 
("Accountant", 100000, 2);
INSERT INTO role (title, salary, department_id) VALUES 
("Software_Engineer", 150000, 4);
INSERT INTO role (title, salary, department_id) VALUES 
("Lawyer", 200000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
("Beth", "Legesse", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
("Sean", "Wilson", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
("Nina", "Worku", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
("Lily", "Mulat", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
("Himi", "Temesgen", 1, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
("Aster", "Workineh", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
("Allen", "Wills", 3, 3);
