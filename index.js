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



function showEmployees() {
    db.query("SELECT * FROM employee", function (err, results) {
      console.table(results)
      options()
    });
  }
  
  //inquirer prompt to view, delete, or quit the app
  function options() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "Please select from options below",
          choices: ["View All Employees", "Delete Employee", "Quit"],
        },
      ])
      .then(({ choice }) => {
        switch (choice) {
          case "View Employees":
            showEmployees()
            break;
          case "Delete Employee":
            deleteEmployee()
            break;
          default:
            process.exit()
        }
      })
  }



  options();