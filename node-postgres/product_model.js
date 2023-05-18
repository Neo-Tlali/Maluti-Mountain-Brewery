const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
});

function getProducts() {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM Product ORDER BY product_id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
}

function createProduct(product) {
  return new Promise((resolve, reject) => {
    const { product_name, product_type, description } = product;
    pool.query(
      'INSERT INTO Product (product_name, product_type, description) VALUES ($1, $2, $3) RETURNING *',
      [product_name, product_type, description],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new product has been added: ${results.rows[0]}`);
      }
    );
  });
}

function deleteProduct(id) {
  return new Promise((resolve, reject) => {
    const product_id = parseInt(id);
    pool.query('DELETE FROM Product WHERE product_id = $1', [product_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Product deleted with ID: ${product_id}`);
    });
  });
}

module.exports = { getProducts, createProduct, deleteProduct };

