-- 1. Query all departments
SELECT * FROM department;

-- Query all roles
SELECT * FROM role;

-- Query all employees
SELECT 
employee.id,
employee.first_name,
employee.last_name,
role.title,
department.deptname AS department,
role.salary,
CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON manager.id = employee.manager_id;

-- Add department
INSERT INTO department (deptname) VALUES ('IT');

-- Add role
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 100000, 1);

-- Add employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Adam', 'Doe', 1, 4);

-- Update employee role
UPDATE employee SET role_id = 2 WHERE id = 1;

