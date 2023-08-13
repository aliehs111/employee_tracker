const db = require('./db/employee_db.js');
const cTable = require('console.table');

//had to integrate this goHome function below here because it was not working in the index.js file the way I wanted it to show in the terminal and I couldn't require index.js in the queries.js file because it was causing a circular dependency.     

//All the functions below have self-eplanitory names so I'm not commenting on all of them.  There is a queries.sql file where I kept the SQL functions for reference after testing in the shell.  Then I copied and pasted in the template literals below.

module.exports = function queries(goHome) {
    return {
        viewDepartments() {
            db.query('SELECT * FROM department', (err, res) => {
                if (err) throw err;
                console.table(res);
                goHome();
            })
        },
        viewRoles() {
            db.query(`SELECT
            role.title AS Job_Title,
            role.id AS Role_ID,
            department.deptname AS Department,
            role.salary AS Salary
        FROM role 
        JOIN department ON role.department_id = department.id;`, (err, res) => {
                if (err) throw err;
                console.table(res);
                goHome();
            })
        },
        viewEmployees() {
            db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.deptname AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id`, (err, res) => {
                if (err) throw err;
                console.table(res);
                goHome();
            })
        },
//this is an attempt at the bonus function to see the salaries budget of each department.  I don't think it's summing the salaries.  I think it's just showing the salary of the first role in each department.  When I have time I will go back to fix it.   

        viewBudgets() {
            db.query(`SELECT department.deptname AS Department, SUM(role.salary) AS Budget FROM department INNER JOIN role ON department.id = role.department_id GROUP BY deptname;`, (err, res) => {
                if (err) throw err;
                console.table(res);
                goHome();
            })
        }
    }
}


