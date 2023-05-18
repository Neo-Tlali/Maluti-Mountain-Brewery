const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
});

function getDeliveries() {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM Delivery ORDER BY delivery_id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
}

function createDelivery(delivery) {
  return new Promise((resolve, reject) => {
    const { carrier_name, delivery_date, delivery_cost } = delivery;
    pool.query(
      'INSERT INTO Delivery (carrier_name, delivery_date, delivery_cost) VALUES ($1, $2, $3) RETURNING *',
      [carrier_name, delivery_date, delivery_cost],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new delivery has been added: ${results.rows[0]}`);
      }
    );
  });
}

function deleteDelivery(id) {
  return new Promise((resolve, reject) => {
    const delivery_id = parseInt(id);
    pool.query('DELETE FROM Delivery WHERE delivery_id = $1', [delivery_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Delivery deleted with ID: ${delivery_id}`);
    });
  });
}

module.exports = { getDeliveries, createDelivery, deleteDelivery };

