
const inquirer = require('inquirer');
const db = require('./db/employee_db.js');
const { viewDepartments, viewRoles, viewEmployees, viewBudgets } = require('./queries')(goHome);


//Displays main menu in the terminal
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
    ///this directs the user's choice to the right function 
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
//this function allows the user to go back to the main menu after the query is complete so that they don't have to contol c each time.
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

//these are the inquirer prompts and the associated functions to run queries based on user input. Function names are self explanatory so I didn't add comments to each one.  All the queries are in the queries.sql file where I put them after I tested them in the shell. When I copied and pasted in the template literals, I replaced the actual query parameter with a ?.  I decided to keep the query function associated with the inquirer together with the inquire prompts rather than put them in the queries.js file with the query functions that did not require user input.  I did this because I thought it would be easier to read and understand the code.  I also added a goHome function to the end of each function so that the user can go back to the main menu after the query is complete.  

function addDepartment() {
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
      db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answer.title, +answer.salary, +answer.department_id], (err, res) => {
        if (err) throw err;
        console.log('Role added successfully!');
        goHome();
      });
    });
}

function addEmployee() {
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
      db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);', [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, res) => {
        if (err) throw err;
        console.log('Employee added successfully!');
        goHome();
      });
    });
}

function updateEmployeeRole() {
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


