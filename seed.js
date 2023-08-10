// seed.js

const employees = [
    {
      first_name: 'John',
      last_name: 'Doe',
      role_id: 1,
      manager_id: null,
    },
    {
      first_name: 'Jane',
      last_name: 'Smith',
      role_id: 2,
      manager_id: 1,
    },
    // Add more employee data as needed
  ];
  
  const roles = [
    {
      title: 'Manager',
      salary: 80000.00,
      department_id: 1,
    },
    {
      title: 'Employee',
      salary: 50000.00,
      department_id: 2,
    },
    // Add more role data as needed
  ];
  
  const departments = [
    {
      name: 'Management',
    },
    {
      name: 'Engineering',
    },
    // Add more department data as needed
  ];
  
  module.exports = { employees, roles, departments };
  