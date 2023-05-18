const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
});

function getDepartments() {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM Department ORDER BY department_id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    })
  })
}

function createDepartment(department) {
  return new Promise((resolve, reject) => {
    const { department_name, H0D, branch_id } = department;
    pool.query('INSERT INTO Department (department_name, H0D, branch_id) VALUES ($1, $2, $3) RETURNING *', [department_name, H0D, branch_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`A new department has been added: ${results.rows[0]}`)
    })
  })
}

function deleteDepartment(id) {
  return new Promise((resolve, reject) => {
    const department_id = parseInt(id);
    pool.query('DELETE FROM Department WHERE department_id = $1', [department_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Department deleted with ID: ${department_id}`)
    })
  })
}

module.exports = { getDepartments, createDepartment, deleteDepartment };

