const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
});

function getOrders() {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM Orders ORDER BY order_id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
}

function createOrder(orders) {
  return new Promise((resolve, reject) => {
    const { order_date, quantity, payment_type, payment_amount, delivery_id, product_id, distro_id, status } = order;
    pool.query(
      'INSERT INTO Orders (order_date, quantity, payment_type, payment_amount, delivery_id, product_id, distro_id, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [order_date, quantity, payment_type, payment_amount, delivery_id, product_id, distro_id, status],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new order has been added: ${results.rows[0]}`);
      }
    );
  });
}

function deleteOrder(id) {
  return new Promise((resolve, reject) => {
    const order_id = parseInt(id);
    pool.query('DELETE FROM Orders WHERE order_id = $1', [order_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Order deleted with ID: ${order_id}`);
    });
  });
}

module.exports = { getOrders, createOrder, deleteOrder };

