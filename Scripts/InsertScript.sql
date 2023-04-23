-- Populating Branch Table
INSERT INTO Branch (branch_name, branch_manager, district) VALUES 
	('Central Branch', 'Tomas Semethe', 'Maseru'),
	('North Branch', 'Lefu Koleke', 'Leribe'),
	('East Branch', 'Jobo Silase', 'Qachas Nek'),
	('South Branch', 'Bobo Masei', 'Mohales Hoek');

-- Populating Department Table
INSERT INTO Department (department_name, H0D, branch_id) VALUES 
	('Sales', 'Head of Sales', 1),
	('Marketing', 'Head of Marketing', 2,,
	('Human Resources', 'Head of HR', 3),
	('Finance', 'Head of Finance', 4);

-- Populating Employee Table
INSERT INTO Employee (emp_firstname, emp_lastname, email, mobile_no, emo_position, department_id) VALUES 
	('Tokelo', 'Semethe', 'tokelo.smith@email.com', 57515248, 'Manager', 1),
	('Lefu', 'Kompone', 'l.kompone@email.com', 62584568, 'Assistant Manager', 1),
	('Botle', 'Leqe', 'botleleqe@email.com', 58764289, 'Manager', 2),
	('Alice', 'Lebelo', 'alice.lee@email.com', 51242715, 'Assistant Manager', 2);

-- Populating Distributor Table
INSERT INTO Distributor (distro_name, address, email, mobile_no, distro_type) VALUES 
	('Lakeside', 'Roma, Maseru', 'lakesideoffsale@email.com', 50521545, 'Off-sales'),
	('Bothobapelo', 'Berea', 'thobas@email.com', 59456666, 'Tarvern');

-- Populating Product Table
INSERT INTO Product (product_name, product_type, description) VALUES 
	('Coke', 'Soft Drink', 'Description for Product A'),
	('Hansa', 'Beer', 'Description for Product B'),
	('Savanna', 'Cider', 'Description for Product C'),
	('Autumn Harvest', 'Wine', 'Description for Product D');

-- Populating Delivery Table
INSERT INTO Delivery (carrier_name, delivery_date, delivery_cost) VALUES 
	('Truck A', '2022-01-01', 100),
	('Truck B', '2022-02-02', 200);

-- Populating Orders Table
INSERT INTO Orders (quantity, payment_type, payment_amount, product_id, distro_id, status) VALUES 
	(10, 'Cash', 1000, 1, 1, 'Pending'),
	(5, 'Credit Card', 500, 2, 1, 'Delivered'),
	(20, 'Cash', 2000, 3, 2, 'Pending'),
	(15, 'Credit Card', 1500, 4, 2, 'Delivered');

--Populate Sales Table
INSERT INTO Sales (sale_date, product_id, quantity, unit_price, total_price)
VALUES
    ('2023-04-20', 1, 2, 10.00, 20.00),
    ('2023-04-21', 2, 1, 15.00, 15.00),
    ('2023-04-22', 3, 3, 5.00, 15.00);
