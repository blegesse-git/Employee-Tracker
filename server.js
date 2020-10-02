var mysql = require('mysql2');
var inquirer = require('inquirer');
var express = require('express');
require('dotenv').config();
var app = express();

var PORT = process.env.PORT || 8080;


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: process.env.PASSWORD,
    database: 'myBusiness_DB'

});

connection.connect(function(err){
    if(err){
        console.error("error connecting..." + err.stack)
        return;
    }
    console.log("connected as id " + connection.threadId)
    start()
});

function start() {
    inquirer
    .prompt({
        name: "choose",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Roles",
            "Add Employee",
            "Add Department",
            "Add Roles",
            "Update Employee Roles",
            "Quit"
            
        ]
    })
    .then(function(answer){
        switch(answer.choose){
            case "View All Employees":
                viewAllEmployees();
                break;
            case "View All Employees by Department":
                viewAllByDepartment();
                break;
            case "View All Employees by Roles":
                viewAllByRoles();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Add Roles":
                addRoles();
                break;
            case "Update Employee Roles":
                updateEmployeeRoles();
                break;
            case "Quit":
                quit();
                break;
        }
    });
}
function viewAllEmployees(){
    connection.promise().query("SELECT * FROM employee").then(([rows])=> {
        console.table(rows)
        start()
    })
    
}
function viewAllByDepartment(){
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table(res);
        start()
    })
};
function viewAllByRoles(){
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res){
        if(err) throw err;
        console.table(res)
        start()
    });
};
function addEmployee(){
    inquirer
    .prompt([
        {
            type: "input",
            message: "Enter Employee's first name",
            name: "firstName"
        },
        {
            type: "input",
            message: "Enter Employee's last name",
            name: "lastName"
        },
        {
            type: "input",
            message: "Enter Employee's role ID number",
            name: "roleID"
        },
        {
            type: "input",
            message: "Enter Mananger ID number",
            name: "managerID"
        }
    ])
    .then(function(answer){
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [answer.firstName, answer.lastName, answer.roleID, answer.managerID], function(err, res){
            if(err) throw err;
            
        })
        viewAllEmployees();
    })

};
function addDepartment(){
    inquirer
    .prompt(
        {
            type: "input",
            message: "Enter the name of the Department",
            name: "department"
        }
    )
    .then(function(answer){
        connection.query("INSERT INTO department (name) VALUES (?)", [answer.department], function(err, res){
            if (err) throw err;
            
            
        })
        viewAllByDepartment();
    })
};
function addRoles(){
    inquirer
    .prompt([
        {
            type: "input",
            message: "Enter the name of the role",
            name: "roleName"
        },
        {
            type: "input",
            message: "Enter role's Salary",
            name: "roleSalary"
        },
        {
            type: "input",
            message: "Enter the department ID",
            name: "departmentID"
        }
    ])
    .then(function(answer){
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)", [answer.roleName, answer.roleSalary, answer.departmentID], function(err, res){
            if(err) throw err;

        } )
        viewAllByRoles()
    })
};
function updateEmployeeRoles(){
    inquirer
    .prompt([
        {
            type: "input",
            message: "Enter the first name of employee you would like to update",
            name: "employeeName"
        },
        {
            type: "input",
            message: "What role would you like to update to?",
            name: "roleUpdate"
        }
    ]).then(function(answer){
        connection.query("UPDATE employee SET role_id=? WHERE first_name=?", [answer.roleUpdate, answer.employeeName], function(err, res){
            if(err) throw err;

        })
        viewAllEmployees();
    })
};
function quit(){
    connection.end();
    process.exit();
}

class DB {
    constructor(connection){
        this.connection = connection
    }
    findAllEmployees(){
        return this.connection.promise().query("SELECT * FROM employee")
    }
}