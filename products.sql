DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'newpassword';


CREATE TABLE products
(
    item_id INT NOT NULL
    AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR
    (255) NOT NULL,
    department_name VARCHAR
    (255),
    price DECIMAL
    (6, 2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0
);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("iPhone X", "Cell Phones & Accessories", 1229.00, 10),
        ("Pecos Leather Bracelet", "Handmade Bracelets", 34.00, 13),
        ("The Glass Castle: A Memoir", "Books", 9.79, 7),
        ("Car Dash Cam", "Electronics", 59.99, 3),
        ("Tooth Floss", "Beauty & Peronal Care", 5.25, 228),
        ("You Don't Know JS: Up & Going", "Books", 2.99, 43),
        ("You Don't Know JS: Scope & Closures", "Books", 17.99, 34),
        ("You Don't Know JS: this & Object Prototypes", "Books", 12.11, 33),
        ("Bike Helmet", "Sports & Outdoors", 12.78, 12),
        ("Scooter", "Toys & Games", 89.99, 12);
