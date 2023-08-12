
const inquirer = require('inquirer');
const db = require('./db/employee_db.js');
const { viewDepartments, viewRoles, viewEmployees, viewBudgets } = require('./queries')(goHome);





// Function to display the main menu
function mainMenu() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add department',
        'Add role',
        'Add employee',
        'Update employee role',
        'View department budgets',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add department':
          addDepartment();
          break;
        case 'Add role':
          addRole();
          break;
        case 'Add employee':
          addEmployee();
          break;
        case 'Update employee role':
          updateEmployeeRole();
          break;
        case 'View department budgets':
          viewBudgets();
          break;
        case 'Exit':
          db.end();
          break;
        default:
          console.log('Invalid option');
          mainMenu();
          break;
      }
    });
}
function goHome() {
  inquirer.prompt({
    name: 'goHome',
    type: 'confirm',
    message: 'Would you like to return to the main menu?'
  })
    .then((answer) => {
      if (answer.goHome) {
        mainMenu();
      } else {
        db.end();
      }
    })
}


// Call the main menu to start the application
mainMenu();


function addDepartment() {
  // Use Inquirer to prompt the user for department details
  inquirer
    .prompt([
      {
        name: 'name',
        type: 'input',
        message: 'Enter the department name:',
      },
    ])
    .then((answer) => {
      // Insert the new department into the database
      db.query(`INSERT INTO department (deptname) VALUES(?)`, answer.name, (err, res) => {
        if (err) throw err;
        console.log('Department added successfully!');
        goHome();
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'Enter the title:',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'Enter the salary:',
      },
      {
        name: 'department_id',
        type: 'input',
        message: 'Enter the department ID:',
      },
    ])


    .then((answer) => {
      // Insert the new department into the database
      db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answer.title, +answer.salary, +answer.department_id], (err, res) => {
        if (err) throw err;
        console.log('Role added successfully!');
        goHome();
      });
    });
}

function addEmployee() {
  // Use Inquirer to prompt the user for employee details
  inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: "Enter the employee's first name:",
      },
      {
        name: 'last_name',
        type: 'input',
        message: "Enter the employee's last name:",
      },
      {
        name: 'role_id',
        type: 'input',
        message: "Enter the employee's role ID:",
      },
      {
        name: 'manager_id',
        type: 'input',
        message: "Enter the employee's manager ID:",
      },
    ])
    .then((answer) => {
      // Insert the new employee into the database
      db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);', [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, res) => {
        if (err) throw err;
        console.log('Employee added successfully!');
        goHome();
      });
    });
}

function updateEmployeeRole() {

  // Use Inquirer to prompt the user for employee and role details
  inquirer
    .prompt([
      {
        name: 'employee_id',
        type: 'input',
        message: "Enter the employee's ID:",
      },
      {
        name: 'role_id',
        type: 'input',
        message: "Enter the employee's new role ID:",
      },
    ])
    .then((answer) => {
      // Update the employee's role in the database
      db.query(
        'UPDATE employee SET role_id = ? WHERE id = ?',
        [answer.employee_id, answer.role_id],
        (err, res) => {
          if (err) throw err;
          console.log('Employee role updated successfully!');
          goHome();
        }
      );
    });
}


