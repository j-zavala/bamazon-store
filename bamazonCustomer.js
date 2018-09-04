const mysql = require("mysql");
const inquirer = require("inquirer");

let connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "newpassword",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    queryAllProducts();
    connection.end();
});

function queryAllProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price + " | " + res[i].stock_quantity);
        }
    });
}