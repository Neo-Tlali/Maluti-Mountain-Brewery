const express = require('express');
const app = express();
const port = 3002;

const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
});

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3003');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});


// get all users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    const users = result.rows;
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Endpoint for user authentication
app.post('/login', async (req, res) => {
  const { username, pin } = req.body;

  try {
    // Create a client from the connection pool
    const client = await pool.connect();

    // Execute the query
    const query = 'SELECT username, pin FROM users WHERE username = $1 AND pin = $2';
    const values = [username, pin];
    const result = await client.query(query, values);

    // Release the client back to the pool
    client.release();

    if (result.rows.length === 1) {
      // User found, authentication successful
      res.status(200).json({ message: 'Authentication successful' });
    } else {
      // User not found or invalid credentials
      res.status(401).json({ message: 'Invalid username or PIN' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ message: 'An error occurred during authentication' });
  }
});


// get all employees
app.get('/employee', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employee');
    const employees = result.rows;
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// create an employee
app.post('/employee', async (req, res) => {
  const { emp_firstname, emp_lastname, email, mobile_no, emp_position, department_id } = req.body;

  try {
    await pool.query(
      'INSERT INTO employee (emp_firstname, emp_lastname, email, mobile_no, emp_position, department_id) VALUES ($1, $2, $3, $4, $5, $6)',
      [emp_firstname, emp_lastname, email, mobile_no, emp_position, department_id]
    );
    res.status(201).send(`Employee added with name: ${emp_firstname} ${emp_lastname}`);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// delete an employee
app.delete('/employee/:emp_id', async (req, res) => {
  const emp_id = req.params.emp_id;

  try {
    await pool.query('DELETE FROM employee WHERE emp_id = $1', [emp_id]);
    res.status(200).send(`Employee deleted with emp_id: ${emp_id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// get all distributors
app.get('/distributor', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM distributor');
    const distributors = result.rows;
    res.status(200).json(distributors);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// create a distributor
app.post('/distributor', async (req, res) => {
  const { distro_name, email, address, mobile_no, distro_type } = req.body;

  try {
    await pool.query(
      'INSERT INTO distributor (distro_name, email, address, mobile_no, distro_type) VALUES ($1, $2, $3, $4, $5)',
      [distro_name, email, address, mobile_no, distro_type]
    );
    res.status(201).send(`Distributor added with name: ${distro_name}`);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// delete a distributor
app.delete('/distributor/:distro_id', async (req, res) => {
  const distro_id = req.params.distro_id;

  try {
    const result = await pool.query('DELETE FROM distributor WHERE distro_id = $1', [distro_id]);
    
    if (result.rowCount === 0) {
      res.status(404).send(`Distributor with distro_id ${distro_id} not found.`);
    } else {
      res.status(200).send(`Distributor deleted with distro_id: ${distro_id}`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// get all branches
app.get('/branch', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM branch');
    const branches = result.rows;
    res.status(200).json(branches);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// create a branch
app.post('/branch', async (req, res) => {
  const { branch_name, branch_manager, district } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO branch (branch_name, branch_manager, district) VALUES ($1, $2, $3) RETURNING *',
      [branch_name, branch_manager, district]
    );

    const createdBranch = result.rows[0];
    res.status(201).json(createdBranch);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// delete a branch
app.delete('/branch/:branch_id', async (req, res) => {
  const branch_id = req.params.branch_id;

  try {
    const result = await pool.query('DELETE FROM branch WHERE branch_id = $1', [branch_id]);
    
    if (result.rowCount === 0) {
      res.status(404).send(`Branch with branch_id ${branch_id} not found.`);
    } else {
      res.status(200).send(`Branch deleted with branch_id: ${branch_id}`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// get all departments
app.get('/department', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM department');
    const departments = result.rows;
    res.status(200).json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// create a department
app.post('/department', async (req, res) => {
  const { department_name, H0D, branch_id } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO department (department_name, H0D, branch_id) VALUES ($1, $2, $3) RETURNING *',
      [department_name, H0D, branch_id]
    );

    const createdDepartment = result.rows[0];
    res.status(201).json(createdDepartment);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// delete a department
app.delete('/department/:department_id', async (req, res) => {
  const department_id = req.params.department_id;

  try {
    const result = await pool.query('DELETE FROM department WHERE department_id = $1', [department_id]);
    
    if (result.rowCount === 0) {
      res.status(404).send(`Department with department_id ${department_id} not found.`);
    } else {
      res.status(200).send(`Department deleted with department_id: ${department_id}`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Insert data into Product table
app.post('/product', async (req, res) => {
  const { product_name, product_type, description } = req.body;

  try {
    await pool.query(
      'INSERT INTO Product (product_name, product_type, description) VALUES ($1, $2, $3)',
      [product_name, product_type, description]
    );
    res.status(201).send(`Product added with name: ${product_name}`);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Insert data into Delivery table
app.post('/delivery', async (req, res) => {
  const { carrier_name, delivery_date, delivery_cost } = req.body;

  try {
    await pool.query(
      'INSERT INTO Delivery (carrier_name, delivery_date, delivery_cost) VALUES ($1, $2, $3)',
      [carrier_name, delivery_date, delivery_cost]
    );
    res.status(201).send(`Delivery added with carrier name: ${carrier_name}`);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// View data from Product table
app.get('/product', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Product');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// View data from Delivery table
app.get('/delivery', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Delivery');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});


// Delete a product
app.delete('/product/:product_id', async (req, res) => {
  const product_id = req.params.product_id;

  try {
    await pool.query('DELETE FROM Product WHERE product_id = $1', [product_id]);
    res.status(200).send(`Product deleted with product_id: ${product_id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Delete a delivery
app.delete('/delivery/:delivery_id', async (req, res) => {
  const delivery_id = req.params.delivery_id;

  try {
    await pool.query('DELETE FROM Delivery WHERE delivery_id = $1', [delivery_id]);
    res.status(200).send(`Delivery deleted with delivery_id: ${delivery_id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});



// Route to create a new order
app.post('/orders', (req, res) => {
  const { order_date, quantity, payment_type, payment_amount, delivery_id, product_id, distro_id, status } = req.body;
  pool.query(
    'INSERT INTO Orders (order_date, quantity, payment_type, payment_amount, delivery_id, product_id, distro_id, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [order_date, quantity, payment_type, payment_amount, delivery_id, product_id, distro_id, status],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        res.status(201).json(results.rows[0]);
      }
    }
  );
});

// Route to get all orders
app.get('/orders', (req, res) => {
  pool.query('SELECT * FROM Orders', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(200).json(results.rows);
    }
  });
});

// Route to create a new sale
app.post('/sales', (req, res) => {
  const { sale_date, product_id, quantity, unit_price, total_price } = req.body;
  pool.query(
    'INSERT INTO Sales (sale_date, product_id, quantity, unit_price, total_price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [sale_date, product_id, quantity, unit_price, total_price],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        res.status(201).json(results.rows[0]);
      }
    }
  );
});

// Route to get all sales
app.get('/sales', (req, res) => {
  pool.query('SELECT * FROM Sales', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(200).json(results.rows);
    }
  });
});

// Route to delete an order
app.delete('/orders/:order_id', (req, res) => {
  const orderId = req.params.order_id;
  pool.query('DELETE FROM Orders WHERE order_id = $1', [orderId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(200).json({ message: 'Order deleted successfully' });
    }
  });
});

// Route to delete a sale
app.delete('/sales/:sale_id', (req, res) => {
  const saleId = req.params.sale_id;
  pool.query('DELETE FROM Sales WHERE sale_id = $1', [saleId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(200).json({ message: 'Sale deleted successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

    
   

