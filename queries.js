const db = require('./db/employee_db.js');
const cTable = require('console.table');

module.exports = {
    viewDepartments(){
        db.query('SELECT * FROM department', (err, res) => {
            if(err) throw err;
            console.table(res);
        }) 
    },
    viewRoles(){
        db.query('SELECT * FROM role', (err, res) => {
            if(err) throw err;
            console.table(res);
        }) 
    },
    viewEmployees(){
        db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.deptname AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id`, (err, res) => {
            if(err) throw err;
            console.table(res);
        }) 
    }
}