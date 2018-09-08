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

        promptUserPurchase();
    });
}

//ensures the users is only inputting positive integers
function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a whole non-zero number.';
    }
}

function promptUserPurchase() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the ID of the item you would like to purchase.',
            validate: validateInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many do you need?',
            validate: validateInput,
            filter: Number
        }
    ]).then(function (input) {
        var item = input.item_id;
        var quantity = input.quantity;

        var queryStr = 'SELECT * FROM products WHERE ?';

        connection.query(queryStr, { item_id: item }, function (err, data) {
            if (err) throw err;

            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                queryAllProducts();
            }
            else {
                var productData = data[0];

                if (quantity <= productData.stock_quantity) {
                    console.log('Congrats! The product you requested is in stock! Placing order!');

                    var updateQueryStr = 'UPDATE products SET stock_quantity =  ' + (productData.stock_quantity - quantity) + ' WHERE item_id= ' + item;

                    connection.query(updateQueryStr, function (err, data) {
                        if (err) throw err;

                        console.log('Your order has been placed! Your total is $' + productData.price * quantity);
                        console.log('Thank you for shopping with us!');
                        console.log("–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––");

                        connection.end();
                    })
                } else {
                    console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
                    console.log('Please modify your order.');
                    console.log("–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––");

                    queryAllProducts();

                }

            }
        })
    })
}

// runBamazon will execute the main application logic
function runBamazon() {

    queryAllProducts();
}

runBamazon();