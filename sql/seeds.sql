INSERT INTO department (deptname) VALUES 
("Architecture"),
("Interior Design"),
("Technology"),
("Project Management"),
("Business Development"),
("Operations"),
("Legal"),
("Accounting");


INSERT INTO role (title, salary, department_id) VALUES 
("Architect", 100000.50, 1),
("Interior Designer", 80000, 2),
("Technology Director", 90000.50, 3),
("Project Manager", 65000.50, 4),
("Business Development Manager", 150000, 5),
("Operations Manager", 120000, 6),
("Legal Counsel", 150000.50, 7),
("Accountant", 100000, 8);



INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
("John", "Smith", 1,NULL),
("Jane", "Doe", 2,1),
("John", "Doe", 3,NULL),
("Jane", "Smith", 4,NULL),
("John", "Smith", 5,NULL),
("Jane", "Doe", 6,1),
("John", "Doe", 7,NULL),
("Jane", "Smith", 8,4),
("John", "Smith", 1,4),
("Jane", "Doe", 6,4),
("John", "Doe", 8,4),
("Jane", "Smith", 7,4),
("John", "Smith",4,1),
("Jane", "Doe",2,1),
("John", "Doe", 8,4),
("Jane", "Smith", 1,4);
