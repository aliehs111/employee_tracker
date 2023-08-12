const db = require('./db/employee_db.js');
const cTable = require('console.table');

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
            db.query('SELECT * FROM role', (err, res) => {
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

        viewBudgets() {
            db.query(`SELECT department.deptname AS Department, SUM(role.salary) AS Budget FROM department INNER JOIN role ON department.id = role.department_id GROUP BY deptname;`, (err, res) => {
                if (err) throw err;
                console.table(res);
                goHome();
            })
        }
    }
}


