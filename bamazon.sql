DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
	id INTEGER(11) AUTO_INCREMENT NOT NULL primary key,
    
    ProductName VARCHAR(30) NOT NULL,
    
    Department VARCHAR(30) NOT NULL,
    
    Price INTEGER(11) NOT NULL,
    
    StockQuantity INTEGER(11) NOT NULL
);


INSERT INTO products(ProductName, Department, Price, StockQuantity)
VALUE ("Pork", "Food", 10, 20);

INSERT INTO products(ProductName, Department, Price, StockQuantity)
VALUE ("Beef", "Food", 20, 10);

INSERT INTO products(ProductName, Department, Price, StockQuantity)
VALUE ("Chicken", "Food", 5, 40);

INSERT INTO products(ProductName, Department, Price, StockQuantity)
VALUE ("Turkey", "Food", 8, 4);

INSERT INTO products(ProductName, Department, Price, StockQuantity)
VALUE ("Coffee", "Drink", 2, 100);

INSERT INTO products(ProductName, Department, Price, StockQuantity)
VALUE ("Water", "Drink", 1, 200);

INSERT INTO products(ProductName, Department, Price, StockQuantity)
VALUE ("Juice", "Drink", 3, 80);

INSERT INTO products(ProductName, Department, Price, StockQuantity)
VALUE ("Tabasco", "Sauce", 4, 3);

INSERT INTO products(ProductName, Department, Price, StockQuantity)
VALUE ("A1", "Sauce", 5, 45);

INSERT INTO products(ProductName, Department, Price, StockQuantity)
VALUE ("Note", "Office", 6, 33);



SELECT * FROM bamazon_DB.products;