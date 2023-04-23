CREATE TABLE Branch (
    branch_id SERIAL PRIMARY KEY,
    branch_name VARCHAR(20),
    branch_manager VARCHAR(30),
    district VARCHAR(30) NOT NULL 
);

CREATE TABLE Department (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL,
    H0D VARCHAR(50),
    branch_id INT NOT NULL,
    FOREIGN KEY (branch_id) REFERENCES Branch(branch_id)
);

CREATE TABLE Employee (
    emp_id SERIAL PRIMARY KEY,
    emp_firstname VARCHAR(20),
    emp_lastname VARCHAR(20),
    email VARCHAR(50),
    mobile_no INT UNIQUE,
    emo_position VARCHAR(30),
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES Department(department_id)
);

CREATE TABLE Distributor (
    distro_id SERIAL PRIMARY KEY,
    distro_name VARCHAR(50) NOT NULL,
    address VARCHAR(50) NOT NULL,
    email VARCHAR(50),
    mobile_no INT NOT NULL UNIQUE,
    distro_type VARCHAR(50) NOT NULL
);

CREATE TABLE Product (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    product_type VARCHAR(50) NOT NULL,
    description VARCHAR(50)
);

CREATE TABLE Delivery (
    delivery_id SERIAL PRIMARY KEY,
    carrier_name VARCHAR(50) NOT NULL,
    delivery_date DATE,
    delivery_cost INT
);

CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY,
    order_date DATE DEFAULT CURRENT_DATE,
    quantity INT,
    payment_type VARCHAR(50),
    payment_amount INT,
    delivery_id INT,
    product_id INT,
    distro_id INT,
    status VARCHAR(30),
    FOREIGN KEY (product_id) REFERENCES Product (product_id), 
    FOREIGN KEY (distro_id) REFERENCES Distributor (distro_id),
    FOREIGN KEY (delivery_id) REFERENCES Delivery (delivery_id)
);

CREATE TABLE Sales (
    sale_id SERIAL PRIMARY KEY,
    sale_date DATE NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

