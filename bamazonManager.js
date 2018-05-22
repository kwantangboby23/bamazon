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

    start();
});

function start() {
    inquirer.prompt([
        {
            name: "selection",
            type: "rawlist",
            message: "Choose one of them",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        },

    ])
        .then(function (answer) {
            switch (answer.selection) {
                case "View Products for Sale": viewProducts();
                    break;
                case "View Low Inventory": viewInv();
                    break;
                case "Add to Inventory": addInv();
                    break;
                case "Add New Product": addProduct();
                    break;


            }
        });
}

function viewProducts() {
    console.log("View Products for Sale");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("\n--------------------------------------------------------------------------------");
        for (i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + " | Product name: " + res[i].ProductName + " | Department: " + res[i].Department + " | Price: " + res[i].Price + " | StockQuantity: " + res[i].StockQuantity + "\n--------------------------------------------------------------------------------");
        }
        start();
    });

}

function viewInv() {
    console.log("View Low Inventory");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("\n---------------------------------------------\n");
        for (i = 0; i < res.length; i++) {
            if (res[i].StockQuantity < 5) {
                console.log("ID: " + res[i].id + " | Product name: " + res[i].ProductName + " | Department: " + res[i].Department + " | Price: " + res[i].Price + " | StockQuantity: " + res[i].StockQuantity + "\n--------------------------------------------------------------------------------");
            }
        }
        start();
    });

}

function addInv() {
    console.log("Add to Inventory");
    
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("\n--------------------------------------------------------------------------------\n");
        for (i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + " | Product name: " + res[i].ProductName + " | Department: " + res[i].Department + " | Price: " + res[i].Price + " | StockQuantity: " + res[i].StockQuantity + "\n--------------------------------------------------------------------------------");
        }
        inquirer.prompt([
            {
                name: "add",
                type: "input",
                message: "Which item you want to add more inventory? (Choose ID)",
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
                name: "qty",
                type: "input",
                message: "How many?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }

        ]).then(function (answer) {
            var itemAdd = res[answer.add - 1];
            var quantityAdd = itemAdd.StockQuantity + parseInt(answer.qty);
            connection.query(
                "UPDATE products SET ? WHERE?",
                [
                    {
                        StockQuantity: quantityAdd
                    },
                    {
                        id: answer.add
                    }
                ],
                function (err, res) {
                    if (err) throw err;

                    console.log("\n---------------------------------------------\n");
                    console.log("Update");
                    console.log("\n---------------------------------------------\n");
                    console.log("ID: " + itemAdd.id + "\nProduct Name: " + itemAdd.ProductName + "\nDepartment: " + itemAdd.Department + "\nPrice: " + itemAdd.Price + "\nStockQuantity: " + quantityAdd +
                        "\n---------------------------------------------")
                    console.log(answer.qty + " has been added to " + itemAdd.ProductName);

                    start();

                }
            )
        });


    });
}

function addProduct() {
    console.log("Add New Product");

    inquirer.prompt([
        {
            name: "product",
            type: "input",
            message: "Product Name: ",
            validate: function (value) {
                if (isNaN(value) === true) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            name: "department",
            type: "input",
            message: "Department Name: ",
            validate: function (value) {
                if (isNaN(value) === true) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            name: "price",
            type: "input",
            message: "Price: ",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            name: "quantity",
            type: "input",
            message: "StockQuantity: ",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    return false;
                }
            }
        }



    ]).then(function (answer) {
        connection.query(
            "INSERT INTO products SET ?",
            {
                ProductName: answer.product,
                Department: answer.department,
                Price: answer.price,
                StockQuantity: answer.quantity
            },
            function (err, res) {
                
                console.log("\n----------------------------------------------------------------------------------\n");
                
                readProducts();

                console.log("New Item has been added to Database");
                

            }
        )
    });

}

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        
        console.log("--------------------------------------------------------------------------------");
        for (i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + " | Product name: " + res[i].ProductName + " | Department: " + res[i].Department + " | Price: " + res[i].Price + " | StockQuantity: " + res[i].StockQuantity + "\n--------------------------------------------------------------------------------");
            
        }
        start();


        
    });
}