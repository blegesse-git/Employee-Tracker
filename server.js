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
            "Add Departments",
            "Add Roles",
            "Update Employee Roles",
            
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
            case "Add Department ":
                addDepartment();
                break;
            case "Add Roles":
                addRoles();
                break;
            case "Update Employee Roles":
                updateEmployeeRoles();
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

};
function viewAllByRoles(){

};
function addEmployee(){

};
function addDepartment(){

};
function addRoles(){

};
function updateEmployeeRoles(){

};

class DB {
    constructor(connection){
        this.connection = connection
    }
    findAllEmployees(){
        return this.connection.promise().query("SELECT * FROM employee")
    }
}