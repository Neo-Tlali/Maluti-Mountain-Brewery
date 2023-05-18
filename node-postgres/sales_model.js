const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
});

function getSales() {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM Sales ORDER BY sale_id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
}

function createSale(sales) {
  return new Promise((resolve, reject) => {
    const { sale_date, product_id, quantity, unit_price, total_price } = sale;
    pool.query(
      'INSERT INTO Sales (sale_date, product_id, quantity, unit_price, total_price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [sale_date, product_id, quantity, unit_price, total_price],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new sale has been added: ${results.rows[0]}`);
      }
    );
  });
}

function deleteSale(id) {
  return new Promise((resolve, reject) => {
    const sale_id = parseInt(id);
    pool.query('DELETE FROM Sales WHERE sale_id = $1', [sale_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Sale deleted with ID: ${sale_id}`);
    });
  });
}

module.exports = { getSales, createSale, deleteSale };

