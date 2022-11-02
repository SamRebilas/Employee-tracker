const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employees",
  },
  console.log("You are now logged in!")
);

  //inquirer prompt to view, delete, or quit the app
  function options() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "Please select from options below",
          choices: ["View all Departments","View all Roles","Add a Role","View All Employees","Add an Employee", "Delete Employee", "Quit"],
        },
      
      ])
      .then(({ choice }) => {
        switch (choice) {
          case "View all Departments":
          showDepartments()
          break;

          case"View all Roles":
          showRoles()
          break;

          case "Add a Role":
          addRole()
          break;

          case "View All Employees":
          showEmployees()
          break;

          case "Add an Employee":
          addEmployee()
          break;

          case "Delete Employee":
          deleteEmployee()
          break;

          default:
          process.exit()

        }
      })
  }

//show departments function
  function showDepartments(){
    db.query("SELECT * FROM department", function (err, results){
      console.table(results)
      options()
    })

  }
//show rall roles
function showRoles(){
  db.query("SELECT * FROM roles", function (err, results){
    console.table(results)
    options()
  })
}
//add a role
function addRole(){

}
//show all employees
function showEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results)
    options()
  });
}
// add an employee
function addEmployee(){
  inquirer.prompt({
    type: "input",
    name: "EmployeeName",
    message: "What is your employees name?"

})
}

// delete an employee
function deleteEmployee() {
  db.query("SELECT * FROM employee", function (err, results) {
    const choices = results.map(({ id, first_name, last_name }) => {
      return {
        name: `${first_name} ${last_name}`,
        value: id,
      };
    });


    //inquirer prompt for user delete
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "please choose an employee to delete.",
          choices: choices,
        },
      ])
      .then(({ employeeId }) => {
        db.query(
          `DELETE FROM employee WHERE id = ?`,
          employeeId,
          (err, result) => {
            if (err) {
              console.log(err)
            }
            console.log(result);
            options();
          }
        );
      });
  });
}



  options();