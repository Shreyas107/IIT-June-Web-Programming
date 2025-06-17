CREATE DATABASE db_name;

use db_name;

-- Tables
-- 1. Customers
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100),
    email VARCHAR(100),
    city VARCHAR(50),
    phone VARCHAR(15)
);

-- 2. Orders
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    product_name VARCHAR(100),
    quantity INT,
    price DECIMAL(10, 2),
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);

-- Inserting data into tables
INSERT INTO customers (customer_name, city, phone)
VALUES
('Amit Sharma', 'Delhi', '9876543210'),
('Sagar Iyer', 'Chennai', '9823456789'),
('Rohit Verma', 'Mumbai', '9812345678'),
('Sneha Reddy', 'Hyderabad', '9801234567'),
('Vikram Patel', 'Ahmedabad', '9798765432');


INSERT INTO orders (customer_id, product_name, quantity, order_date, price)
VALUES
(1, 'Smartphone', 2, '2025-06-15', 15999.00),
(2, 'Laptop', 1, '2025-06-14', 52999.00),
(1, 'Power Bank', 1, '2025-06-13',1999.00),
(3, 'Headphones', 3, '2025-06-12', 2999.00),
(4, 'Tablet', 1, '2025-06-11',20999.00),
(5, 'Smartwatch', 2, '2025-06-10',7999.00);


-- QUERIES

-- fetching rows where price is greater than 10000
select * from orders where price > 10000;


-- inner join
SELECT customers.customer_name, customers.city, phone, product_name, price, quantity
FROM orders 
INNER JOIN customers ON customers.customer_id = orders.customer_id;

SELECT c.customer_name, c.city, o.product_name, o.price
FROM orders o
INNER JOIN customers c 
ON c.customer_id = o.customer_id;

SELECT c.customer_name, c.city, o.product_name, o.price
FROM orders o, customers c
WHERE c.customer_id = o.customer_id;


SELECT c.customer_name, c.city, o.product_name, o.price
FROM orders o
RIGHT JOIN customers c 
ON o.customer_id = c.customer_id;