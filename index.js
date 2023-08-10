// index.js
const inquirer = require('inquirer');
// const db = require('./db/employee_db.js');
const { viewDepartments, viewRoles } = require('./queries');





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
          // addDepartment();
          break;
        case 'Add role':
          // addRole();
          break;
        case 'Add employee':
          addEmployee();
          break;
        case 'Update employee role':
          // updateEmployeeRole();
          break;
        case 'Exit':
          db.end();
          break;
        default:
          console.log('Invalid option');
          // mainMenu();
          break;
      }
    });
}

// Implement the viewEmployees, addEmployee, and updateEmployeeRole functions here

// Call the main menu to start the application
mainMenu();

// index.js (continued)
// ...

function viewEmployees() {
  db.query('SELECT * FROM employees', (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
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
      db.query('INSERT INTO employees SET ?', answer, (err, res) => {
        if (err) throw err;
        console.log('Employee added successfully!');
        mainMenu();
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
        'UPDATE employees SET role_id = ? WHERE id = ?',
        [answer.role_id, answer.employee_id],
        (err, res) => {
          if (err) throw err;
          console.log('Employee role updated successfully!');
          mainMenu();
        }
      );
    });
}


