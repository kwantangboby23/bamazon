var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",


    port: 8889,


    user: "root",


    password: "root",
    database: "bamazon_DB"
});


connection.connect(function (err) {
    if (err) throw err;

    readProducts();
});

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("-----------------------------------Welcome to Bamazon------------------------------\n");
        console.log("----------------------------------------------------------------------------------");
        for (i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + " | Product name: " + res[i].ProductName + " | Department: " + res[i].Department + " | Price: " + res[i].Price + " | StockQuantity: " + res[i].StockQuantity + "\n----------------------------------------------------------------------------------");
        }


        start();
    });
}

function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;




        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "Which item you want to buy?? (Select id number)",
                validate: function (value) {
                    if (isNaN(value) === false
                        && parseInt(value) > 0
                        && parseInt(value) <= res.length) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "How much do you want to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        ])
            .then(function (answer) {
                var wantToBuy = res[answer.id - 1];
                var remainQuantity = wantToBuy.StockQuantity - answer.quantity;
                if (wantToBuy.StockQuantity >= answer.quantity) {
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                StockQuantity: remainQuantity
                            },
                            {
                                id: answer.id
                            }
                        ],
                        function (err, res) {
                            if (err) throw err;
                            console.log("Update Products Data" + "\n---------------------------------------------" + "\nID: " + wantToBuy.id + "\nProduct Name: " + wantToBuy.ProductName + "\nDepartment: " + wantToBuy.Department + "\nPrice: " + wantToBuy.Price + "\nStockQuantity: " + remainQuantity +
                                "\n---------------------------------------------"
                            );
                            console.log("How many items have been sold?\n" + answer.quantity + " have been sold" + "\n---------------------------------------------");

                            var totalCost = wantToBuy.Price * answer.quantity;

                            console.log("The Total You Have Been Paid is :  $" + totalCost);


                        }



                    )
                } else {
                    console.log("We are sorry. We don't have enough stock\n");
                    console.log("No changes have been made");
                }
                
                connection.end();

            });


    });


}

