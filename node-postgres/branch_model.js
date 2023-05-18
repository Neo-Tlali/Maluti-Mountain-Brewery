const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
});

function getBranches() {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM Branch ORDER BY branch_id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    })
  })
}

function createBranch(branch) {
  return new Promise((resolve, reject) => {
    const { branch_name, branch_manager, district } = branch;
    pool.query('INSERT INTO Branch (branch_name, branch_manager, district) VALUES ($1, $2, $3) RETURNING *', [branch_name, branch_manager, district], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`A new branch has been added: ${results.rows[0]}`)
    })
  })
}

function deleteBranch(id) {
  return new Promise((resolve, reject) => {
    const branch_id = parseInt(id);
    pool.query('DELETE FROM Branch WHERE branch_id = $1', [branch_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Branch deleted with ID: ${branch_id}`)
    })
  })
}

module.exports = { getBranches, createBranch, deleteBranch };

