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
            console.log("-------------------------------------------------------------------------------------------------------------------------");
            console.log("Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: $" + res[i].price + " | " + "QTY: " + res[i].stock_quantity);


        }
    });
}