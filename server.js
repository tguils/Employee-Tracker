const mysql = require("mysql2");
require("console.table");
const inquirer = require("inquirer");
// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "bootcampSQL123!",
    database: "employee_tracker",
  },
  console.log(`Connected to the courses_db database.`)
);

function start() {
    // WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
  inquirer
    .prompt({
      type: "list",
      name: "choice",
      message: "Choose an option:",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add A Department",
        "Add A Role",
        "Add An Employee",
        "Quit",
      ],
    })
    .then((data) => {
      switch (data.choice) {
        case "View All Departments":
          displayDepartments();
          break;
        case "View All Roles":
            displayRoles();
          break;
        case "View All Employees":
            displayEmployees();
          break;
          case "Add A Department":
            addDepartment();
          break;
          case "Add A Role":
            addRole();
          break;
          case "Add An Employee":
            addEmployee();
          break;
        default:
            process.exit()
          break;
      }
    });
}

function displayDepartments() {
  // WHEN I choose to view all departments
  // THEN I am presented with a formatted table showing department names and department ids
  db.query("select * from department;", (err, results) => {
    console.table(results);
    start();
  });
}


function displayRoles() {
    // WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
    db.query("select * from role;", (err, results) => {
        console.table(results);
        start();
    })
}

function displayEmployees() {
    // WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    db.query("select * from employee;", (err, results) => {
        console.table(results);
        start();
    })
}

function addDepartment() {
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
    inquirer
    .prompt({
    type: "input",
    name: "departmentName",
    message: "Enter the name of the department:",
    })
    .then((data) => {
    const departmentName = data.departmentName;
    db.query(
        "INSERT INTO department (name) VALUES (?);",
        [departmentName],
        (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`Department "${departmentName}" added to the database.`);
        start();
        }
    );
    });
}

function addRole() {
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
        inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "Enter the name of the role:",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Enter the salary for the role:",
      },
      {
        type: "input",
        name: "roleDepartment",
        message: "Enter the department for the role:",
      },
    ])
    .then((data) => {
      const roleName = data.roleName;
      const roleSalary = data.roleSalary;
      const roleDepartment = data.roleDepartment;
      
      // Check if the department exists in the database
      db.query(
        "SELECT * FROM department WHERE name = ?;",
        [roleDepartment],
        (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          
          if (results.length === 0) {
            console.log(`Department "${roleDepartment}" does not exist.`);
            start();
            return;
          }
          
          // Insert the role into the database
          db.query(
            "INSERT INTO role (name, salary, department_id) VALUES (?, ?, ?);",
            [roleName, roleSalary, results[0].id],
            (err, results) => {
              if (err) {
                console.log(err);
                return;
              }
              console.log(`Role "${roleName}" added to the database.`);
              start();
            }
          );
        }
      );
    });
    }
    function addEmployee() {
       // WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
        inquirer
        .prompt([
        {
            type: "input",
            name: "firstName",
            message: "Enter the employee's first name:",
        },
        {
            type: "input",
            name: "lastName",
            message: "Enter the employee's last name:",
        },
        {
            type: "input",
            name: "role",
            message: "Enter the employee's role:",
        },
        {
            type: "input",
            name: "manager",
            message: "Enter the employee's manager:",
        },
        ])
        .then((data) => {
        const firstName = data.firstName;
        const lastName = data.lastName;
        const role = data.role;
        const manager = data.manager;
        
        // Check if the role exists in the database
        db.query(
            "SELECT * FROM role WHERE name = ?;",
            [role],
            (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            
            if (results.length === 0) {
                console.log(`Role "${role}" does not exist.`);
                start();
                return;
            }
            
            // Insert the employee into the database
            db.query(
                "INSERT INTO employee (first_name, last_name, role_id, manager) VALUES (?, ?, ?, ?);",
                [firstName, lastName, results[0].id, manager],
                (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(`Employee "${firstName} ${lastName}" added to the database.`);
                start();
                }
            );
            }
        );
        });
}


   
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database     
start();
