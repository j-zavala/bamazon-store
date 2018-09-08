const mysql = require("mysql");
const inquirer = require("inquirer");

let connection = mysql.createConnection({
    host: "localhost",

    port: 3306,
    user: "root",

    password: "newpassword",
    database: "bamazon"
});

function queryAllProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + "   //   " + "Product: " + res[i].product_name + "   //   " + "Department: " + res[i].department_name + "   //   " + "Price: $" + res[i].price + "   //   " + "QTY: " + res[i].stock_quantity);
        }
        console.log("–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––");
    });
}

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    queryAllProducts();
    start();
    connection.end();
});

console.log("*  *   *   *   *   *   *   *");

function start() {
    inquirer
        .prompt({
            name: "buyOrView",
            type: "rawlist",
            message: "Would you like to [BUY] an item or [VIEW] an item?",
            choices: ["BUY", "VIEW"]
        })
        .then(function (answer) {
            //based on their answer, either call the bid or the post functions
            if (answer.buyOrView.toUpperCase() === "BUY") {
                buyItem();
            }
            else {
                viewItem();
            }
        });
}

function buyItem() {
}




function viewItem() {
    //prompt the user the id of the item they want to buy
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What is the ID of the item you would like to buy?"
            }
        ])
        .then(function (answer) {
            connection.query("SELECT * FROM bamazon WHERE ?", { id: answer.item_id }, function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    console.log("Item ID: " + res[i].item_id + "   //   " + "Product: " + res[i].product_name + "   //   " + "Department: " + res[i].department_name + "   //   " + "Price: $" + res[i].price + "   //   " + "QTY: " + res[i].stock_quantity);
                }
                console.log("–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––");
            });
        });
}


