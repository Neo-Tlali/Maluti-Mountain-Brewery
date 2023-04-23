
UPDATE Employee
SET mobile_no = 57834231
WHERE emp_id = 2;

SELECT * from branch;

DELETE FROM branch 
WHERE branch_id = 8;




SELECT *
FROM Employee
WHERE department_id = 1;



SELECT Orders.order_id, Orders.quantity, Orders.payment_type, Orders.payment_amount, Orders.status,
       Product.product_name, Product.product_type, Product.description,
       Distributor.distro_name, Distributor.address, Distributor.email, Distributor.mobile_no, Distributor.distro_type
FROM Orders
JOIN Product ON Orders.product_id = Product.product_id
JOIN Distributor ON Orders.distro_id = Distributor.distro_id;

