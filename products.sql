
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	id INTEGER(50) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(250) NOT NULL,
	department_name VARCHAR(250) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(10) NOT NULL,
	PRIMARY KEY (id)
);

DESCRIBE products;

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('nintendo switch', 'gaming', 350, 150),
('ergo baby 360', 'baby', 180, 80),
('northface isabella', 'backpack', 50, 43),
('red iphone 8 case', 'electronics', 30, 68),
('baseball bat aluminum', 'sports', 15, 45),
('sushi maker kit', 'household goods', 65, 15),
('sonicare toothbrush', 'bath', 145, 250),
('masking tape', 'household goods', 5, 1300),
('sophie giraffe', 'baby', 25, 550),
('nike socks black', 'sports', 29, 230);
