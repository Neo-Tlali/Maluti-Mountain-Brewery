--Trigger generate receipt for a sale 
CREATE TRIGGER generate_receipt
AFTER INSERT ON Sales
FOR EACH ROW
BEGIN
    DECLARE product_name VARCHAR(50);
    SELECT product_name INTO product_name FROM Product WHERE product_id = NEW.product_id;
    SELECT CONCAT('--------------------------\n',
                  'Sale ID: ', NEW.sale_id, '\n',
                  'Sale Date: ', NEW.sale_date, '\n',
                  'Product: ', product_name, '\n',
                  'Quantity: ', NEW.quantity, '\n',
                  'Unit Price: $', NEW.unit_price, '\n',
                  'Total Price: $', NEW.total_price, '\n',
                  '--------------------------\n') AS 'Receipt';
END;



--Trigger to prevent a distributor from being deleted if they have pending orders:
CREATE TRIGGER prevent_delete_distributor
BEFORE DELETE ON Distributor
FOR EACH ROW
BEGIN
    DECLARE orders_count INT;
    SELECT COUNT(*) INTO orders_count FROM Orders WHERE distro_id = OLD.distro_id AND status <> 'Delivered';
    IF orders_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot delete distributor with pending orders';
    END IF;
END;



--Trigger to update the status column in the Orders table when a delivery is made:
CREATE TRIGGER update_order_status
AFTER INSERT ON Delivery
FOR EACH ROW
BEGIN
    UPDATE Orders
    SET status = 'Delivered'
    WHERE order_id = NEW.order_id;
END;



--Trigger to update the H0D (Head of Department) column in the Department table when a new employee is added:
CREATE TRIGGER update_hod
AFTER INSERT ON Employee
FOR EACH ROW
BEGIN
    UPDATE Department
    SET H0D = CONCAT(NEW.emp_firstname, ' ', NEW.emp_lastname)
    WHERE department_id = NEW.department_id;
END;



--trigger to update order status at delivery
 CREATE TRIGGER update_order_status
AFTER INSERT ON Delivery
FOR EACH ROW
BEGIN
    UPDATE Orders
    SET status = 'Delivered'
    WHERE order_id = NEW.order_id;
END;

