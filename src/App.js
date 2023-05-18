import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file

function App() {
  const [page, setPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');

  
  // Update the handleLogin function
const handleLogin = async (event) => {
  event.preventDefault();

  try {
    const response = await axios.post('http://localhost:3002/login', { username, pin });
    setMessage(response.data.message);
    setIsLoggedIn(true); // Set isLoggedIn to true
    setPage('home'); // Set the page state to 'home'
  } catch (error) {
    console.error('Error during login:', error);
    setMessage('An error occurred during login');
  }
};

  
  
  // Define the handleUsernameChange function
const handleUsernameChange = (event) => {
  // Handle the username change
  setUsername(event.target.value);
};

// Define the handlePasswordChange function
const handlePinChange = (event) => {
  // Handle the password change
  setPin(event.target.value);
};

  const handleLogout = () => {
    // Perform logout logic, e.g., clear session
    setIsLoggedIn(false);
    // Reset the page to the login screen
    setPage('login');
  };
  

  const handleEmployeesClick = () => {
    setPage('employees');
  };

  const handleDistributorsClick = () => {
    setPage('distributors');
  };
  
  const handleSalesClick = () => {
    setPage('sales');
  };
  
  const handleOrdersClick = () => {
    setPage('orders');
  };
  
  const handleBranchesClick = () => {
    setPage('branches');
  };
  
  const handleDepartmentsClick = () => {
    setPage('departments');
  };
  
  const handleProductsClick = () => {
    setPage('products');
  };
  
  const handleDeliveriesClick = () => {
    setPage('deliveries');
  };
  
  const handleGoBack = () => {
  setPage('home');
};


// Rest of the handleXClick functions...

  if (page === 'login') {
    return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={(event) => setPin(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
  }

 if (page==='home') {
  return (
      <div className="bg">
      <h1>Welcome to the MMB</h1>
       <button onClick={handleEmployeesClick}>Employees</button><br/><br/>
      <button onClick={handleDistributorsClick}>Distributors</button><br/><br/>
      <button onClick={handleBranchesClick}>Branches</button><br/><br/>
      <button onClick={handleDepartmentsClick}>Departments</button><br/><br/>
      <button onClick={handleProductsClick}>Products</button><br/><br/>
      <button onClick={handleDeliveriesClick}>Deliveries</button><br/><br/>
      <button onClick={handleSalesClick}>Sales</button><br/><br/>
      <button onClick={handleOrdersClick}>Orders</button><br/>  
    </div>
  );
}
if (page=== 'employees'){
    return <EmployeeList handleGoBack={handleGoBack}/>;
    }
if (page=== 'distributors'){
    return <DistributorList />;
    }
if (page=== 'branches'){
    return <BranchList />;
    }  
if (page=== 'departments'){
    return <DepartmentList />;
    }
if (page=== 'products'){
    return <ProductList />;
    }  
if (page=== 'deliveries'){
    return <DeliveryList />;
    }  
if (page=== 'sales'){
    return <SalesList />;
    }
if (page=== 'orders'){
    return <OrderList />;
    }  
}


function EmployeeList() {
  const [employees, setEmployees] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    getEmployees();
  }, []);

  function getEmployees() {
    fetch('http://localhost:3002/employee')
      .then(response => response.json())
      .then(data => {
        setEmployees(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function createEmployee() {
    let emp_firstname = prompt('Enter employee first name');
    let emp_lastname = prompt('Enter employee last name');
    let email = prompt('Enter employee email');
    let mobile_no = prompt('Enter employee mobile number');
    let emo_position = prompt('Enter employee position');
    let department_id = prompt('Enter employee department ID');

    fetch('http://localhost:3002/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emp_firstname, emp_lastname, email, mobile_no, emo_position, department_id }),
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        getEmployees();
      });
  }

  function deleteEmployee() {
    let emp_id = prompt('Enter the ID of the employee to delete');
    if (emp_id) {
      fetch(`http://localhost:3002/employee/${emp_id}`, {
        method: 'DELETE',
      })
        .then(response => response.text())
        .then(data => {
          alert(data);
          getEmployees();
        });
    }
  }

  function handleEmployeeClick(employee) {
    setSelectedEmployee(employee);
  }
   const [page, setPage] = useState('employees');

  const handleGoBack = () => {
  setPage('home');
};


  return (
    <div>
      {employees ? (
        <div>
          <h2>Employee List</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee.emp_id}>
                  <td onClick={() => handleEmployeeClick(employee)}>{employee.emp_firstname} {employee.emp_lastname}</td>
                  <td>{employee.email}</td>
                  <td>
                    <button onClick={() => handleEmployeeClick(employee)}>View Employee</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>There is no employee data available</p>
      )}
      <br />
      <button onClick={createEmployee}>Add Employee</button><br/>
      <button onClick={deleteEmployee}>Delete Employee</button>

      {selectedEmployee && (
        <div>
          <h2>Employee Details</h2>
          <p>ID  : {selectedEmployee.emp_id}</p>
          <p>Name: {selectedEmployee.emp_firstname} {selectedEmployee.emp_lastname}</p>
          <p>Email: {selectedEmployee.email}</p>
          <p>Mobile Number: {selectedEmployee.mobile_no}</p>
          <p>Position: {selectedEmployee.emo_position}</p>
          <p>Department ID: {selectedEmployee.department_id}</p>
        </div>
      )}<br/>
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
}


function DistributorList() {
  const [distributors, setDistributors] = useState(null);
  const [selectedDistributor, setSelectedDistributor] = useState(null);

  useEffect(() => {
    getDistributors();
  }, []);

  function getDistributors() {
    fetch('http://localhost:3002/distributor')
      .then(response => response.json())
      .then(data => {
        setDistributors(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function createDistributor() {
    let distro_name = prompt('Enter distributor name');
    let address = prompt('Enter distributor address');
    let email = prompt('Enter distributor email');
    let mobile_no = prompt('Enter distributor mobile number');
    let distro_type = prompt('Enter distributor type');

    fetch('http://localhost:3002/distributor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ distro_name, address, email, mobile_no, distro_type }),
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        getDistributors();
      });
  }

  function deleteDistributor(distro_id) {
    fetch(`http://localhost:3002/distributor/${distro_id}`, {
      method: 'DELETE',
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        getDistributors();
      });
  }

  function viewDistributor(distributor) {
    setSelectedDistributor(distributor);
  }

  return (
    <div>
      {distributors ? (
        <div>
          <h2>Distributor List</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {distributors.map(distributor => (
                <tr key={distributor.distro_id}>
                  <td>{distributor.distro_name}</td>
                  <td>{distributor.email}</td>
                  <td>
                    <button onClick={() => viewDistributor(distributor)}>View Distributor</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>There is no distributor data available</p>
      )}
      <br />
      <button onClick={createDistributor}>Add Distributor</button><br/>
      <button onClick={() => deleteDistributor(selectedDistributor.distro_id)}>
        Delete Distributor
      </button>

      {selectedDistributor && (
        <div>
          <h2>Distributor Details</h2>
          <p>ID: {selectedDistributor.distro_id}</p>
          <p>Name: {selectedDistributor.distro_name}</p>
          <p>Email: {selectedDistributor.email}</p>
          <p>Address: {selectedDistributor.address}</p>
          <p>Mobile Number: {selectedDistributor.mobile_no}</p>
          <p>Distributor Type: {selectedDistributor.distro_type}</p>
        </div>
      )}
    </div>
  );
  }
  
function DepartmentList() {
  const [departments, setDepartments] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    getDepartments();
  }, []);

  function getDepartments() {
    fetch('http://localhost:3002/department')
      .then(response => response.json())
      .then(data => {
        setDepartments(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

// Function for creating a new department
function createDepartment() {
  let department_name = prompt('Enter department name');
  let H0D = prompt('Enter H0D');
  let branch_id = prompt('Enter branch ID');

  fetch('http://localhost:3002/department', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ department_name, H0D, branch_id }),
  })
    .then(response => response.text())
    .then(data => {
      alert(data);
      getDepartments();
    });
}

// Function for deleting a department
function deleteDepartment(department_id) {
  fetch(`http://localhost:3002/department/${department_id}`, {
    method: 'DELETE',
  })
    .then(response => response.text())
    .then(data => {
      alert(data);
      getDepartments();
    });
}

  function viewDepartment(department) {
    setSelectedDepartment(department);
  }

  return (
    <div>
      {departments ? (
        <div>
          <h2>Department List</h2>
          <table>
            {/* Render the table rows with department data */}
            <tbody>
              {departments.map(department => (
                <tr key={department.department_id}>
                  <td>{department.department_name}</td>
                  <td>{department.H0D}</td>
                  <td>
                    {/* Add a View button for each department */}
                    <button onClick={() => viewDepartment(department)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>There is no department data available</p>
      )}

      {/* Display the selected department details */}
      {selectedDepartment && (
        <div>
          <h2>Department Details</h2>
          <p>Department ID: {selectedDepartment.department_id}</p>
          <p>Department Name: {selectedDepartment.department_name}</p>
          <p>H0D: {selectedDepartment.H0D}</p>
          <p>Branch ID: {selectedDepartment.branch_id}</p>
        </div>
      )}

      <br />
      <button onClick={createDepartment}>Add Department</button>
      <button onClick={deleteDepartment}>Delete Department</button>
    </div>
  );
}

function BranchList() {
  const [branches, setBranches] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);

  useEffect(() => {
    getBranches();
  }, []);

  function getBranches() {
    fetch('http://localhost:3002/branch')
      .then(response => response.json())
      .then(data => {
        setBranches(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Function for creating a new branch
function createBranch() {
  let branch_name = prompt('Enter branch name');
  let branch_manager = prompt('Enter branch manager');
  let district = prompt('Enter district');

  fetch('http://localhost:3002/branch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ branch_name, branch_manager, district }),
  })
    .then(response => response.text())
    .then(data => {
      alert(data);
      getBranches();
    });
}

// Function for deleting a branch
function deleteBranch(branch_id) {
  fetch(`http://localhost:3002/branch/${branch_id}`, {
    method: 'DELETE',
  })
    .then(response => response.text())
    .then(data => {
      alert(data);
      getBranches();
    });
}

  function viewBranch(branch) {
    setSelectedBranch(branch);
  }

  return (
    <div>
      {branches ? (
        <div>
          <h2>Branch List</h2>
          <table>
            {/* Render the table rows with branch data */}
            <tbody>
              {branches.map(branch => (
                <tr key={branch.branch_id}>
                  <td>{branch.branch_name}</td>
                  <td>{branch.district}</td>
                  <td>
                    {/* Add a View button for each branch */}
                    <button onClick={() => viewBranch(branch)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>There is no branch data available</p>
      )}

      {/* Display the selected branch details */}
      {selectedBranch && (
        <div>
          <h2>Branch Details</h2>
          <p>Branch Name: {selectedBranch.branch_name}</p>
          <p>Branch Manager: {selectedBranch.branch_manager}</p>
          <p>District: {selectedBranch.district}</p>
        </div>
      )}

      <br />
      <button onClick={createBranch}>Add Branch</button>
      <button onClick={deleteBranch}>Delete Branch</button>
    </div>
  );
}

function DeliveryList() {
  const [deliveries, setDeliveries] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  useEffect(() => {
    getDeliveries();
  }, []);

  function getDeliveries() {
    fetch('http://localhost:3002/delivery')
      .then(response => response.json())
      .then(data => {
        setDeliveries(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Function for creating a new delivery
  function createDelivery() {
    let carrier_name = prompt('Enter carrier name');
    let delivery_date = prompt('Enter delivery date');
    let delivery_cost = prompt('Enter delivery cost');

    fetch('http://localhost:3002/delivery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ carrier_name, delivery_date, delivery_cost }),
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        getDeliveries();
      });
  }

  // Function for deleting a delivery
  function deleteDelivery(delivery_id) {
    fetch(`http://localhost:3002/delivery/${delivery_id}`, {
      method: 'DELETE',
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        getDeliveries();
      });
  }

  function viewDelivery(delivery) {
    setSelectedDelivery(delivery);
  }

  return (
    <div>
      {deliveries ? (
        <div>
          <h2>Delivery List</h2>
          <table>
            {/* Render the table rows with delivery data */}
            <tbody>
              {deliveries.map(delivery => (
                <tr key={delivery.delivery_id}>
                  <td>{delivery.carrier_name}</td>
                  <td>{delivery.delivery_date}</td>
                  <td>{delivery.delivery_cost}</td>
                  <td>
                    {/* Add a View button for each delivery */}
                    <button onClick={() => viewDelivery(delivery)}>View</button>
                  </td>
                  <td>
                    {/* Add a Delete button for each delivery */}
                    <button onClick={() => deleteDelivery(delivery.delivery_id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>There is no delivery data available</p>
      )}

      {/* Display the selected delivery details */}
      {selectedDelivery && (
        <div>
          <h2>Delivery Details</h2>
          <p>Carrier Name: {selectedDelivery.carrier_name}</p>
          <p>Delivery Date: {selectedDelivery.delivery_date}</p>
          <p>Delivery Cost: {selectedDelivery.delivery_cost}</p>
        </div>
      )}

      <br />
      <button onClick={createDelivery}>Add Delivery</button>
    </div>
  );
}

function ProductList() {
  const [products, setProducts] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  function getProducts() {
    fetch('http://localhost:3002/product')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Function for creating a new product
  function createProduct() {
    let product_name = prompt('Enter product name');
    let product_type = prompt('Enter product type');
    let description = prompt('Enter description');

    fetch('http://localhost:3002/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product_name, product_type, description }),
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        getProducts();
      });
  }

  // Function for deleting a product
  function deleteProduct(product_id) {
    fetch(`http://localhost:3002/product/${product_id}`, {
      method: 'DELETE',
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        getProducts();
      });
  }

  function viewProduct(product) {
    setSelectedProduct(product);
  }

  return (
    <div>
      {products ? (
        <div>
          <h2>Product List</h2>
          <table>
            {/* Render the table rows with product data */}
            <tbody>
              {products.map(product => (
                <tr key={product.product_id}>
                  <td>{product.product_name}</td>
                  <td>{product.product_type}</td>
                  <td>{product.description}</td>
                  <td>
                    {/* Add a View button for each product */}
                    <button onClick={() => viewProduct(product)}>View</button>
                  </td>
                  <td>
                    {/* Add a Delete button for each product */}
                    <button onClick={() => deleteProduct(product.product_id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>There is no product data available</p>
      )}

      {/* Display the selected product details */}
      {selectedProduct && (
        <div>
          <h2>Product Details</h2>
          <p>Product Name: {selectedProduct.product_name}</p>
          <p>Product Type: {selectedProduct.product_type}</p>
          <p>Description: {selectedProduct.description}</p>
        </div>
      )}

      <br />
      <button onClick={createProduct}>Add Product</button>
    </div>
  );
}


function OrderList() {
  const [orders, setOrders] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    getOrders();
  }, []);

  function getOrders() {
    fetch('http://localhost:3002/orders')
      .then(response => response.json())
      .then(data => {
        setOrders(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Function for creating a new order
  function createOrder() {
    let quantity = prompt('Enter quantity');
    let payment_type = prompt('Enter payment type');
    let payment_amount = prompt('Enter payment amount');
    let delivery_id = prompt('Enter delivery ID');
    let product_id = prompt('Enter product ID');
    let distro_id = prompt('Enter distributor ID');
    let status = prompt('Enter status');

    fetch('http://localhost:3002/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity, payment_type, payment_amount, delivery_id, product_id, distro_id, status }),
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        getOrders();
      });
  }

  // Function for deleting an order
  function deleteOrder(order_id) {
    fetch(`http://localhost:3002/orders/${order_id}`, {
      method: 'DELETE',
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        getOrders();
      });
  }

  function viewOrder(order) {
    setSelectedOrder(order);
  }

  return (
    <div>
      {orders ? (
        <div>
          <h2>Order List</h2>
          <table>
            {/* Render the table rows with order data */}
            <tbody>
              {orders.map(order => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>{order.order_date}</td>
                  <td>{order.quantity}</td>
                  <td>{order.payment_type}</td>
                  <td>{order.payment_amount}</td>
                  <td>{order.delivery_id}</td>
                  <td>{order.product_id}</td>
                  <td>{order.distro_id}</td>
                  <td>{order.status}</td>
                  <td>
                    {/* Add a View button for each order */}
                    <button onClick={() => viewOrder(order)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>There is no order data available</p>
      )}

      {/* Display the selected order details */}
      {selectedOrder && (
        <div>
          <h2>Order Details</h2>
          <p>Order ID: {selectedOrder.order_id}</p>
          <p>Order Date: {selectedOrder.order_date}</p>
          <p>Quantity: {selectedOrder.quantity}</p>
          <p>Payment Type: {selectedOrder.payment_type}</p>
          <p>Payment Amount: {selectedOrder.payment_amount}</p>
          <p>Delivery ID: {selectedOrder.delivery_id}</p>
          <p>Product ID: {selectedOrder.product_id}</p>
          <p>Distributor ID: {selectedOrder.distro_id}</p>
          <p>Status: {selectedOrder.status}</p>
        </div>
      )}

      <br />
      <button onClick={createOrder}>Add Order</button>
<button onClick={() => deleteOrder(selectedOrder.order_id)}>Delete Order</button>
</div>
);
}

function SalesList() {
  const [sales, setSales] = useState(null);
  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    getSales();
  }, []);

  function getSales() {
    fetch('http://localhost:3002/sales')
      .then(response => response.json())
      .then(data => {
        setSales(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Function for creating a new sale
  function createSale() {
    let sale_date = prompt('Enter sale date');
    let product_id = prompt('Enter product ID');
    let quantity = prompt('Enter quantity');
    let unit_price = prompt('Enter unit price');
    let total_price = prompt('Enter total price');

    fetch('http://localhost:3002/sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sale_date, product_id, quantity, unit_price, total_price }),
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        getSales();
      });
  }

  // Function for deleting a sale
  function deleteSale(sale_id) {
    fetch(`http://localhost:3002/sales/${sale_id}`, {
      method: 'DELETE',
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        getSales();
      });
  }

  function viewSale(sale) {
    setSelectedSale(sale);
  }

  return (
    <div>
      {sales ? (
        <div>
          <h2>Sales List</h2>
          <table>
            {/* Render the table rows with sale data */}
            <tbody>
              {sales.map(sale => (
                <tr key={sale.sale_id}>
                  <td>{sale.sale_id}</td>
                  <td>{sale.sale_date}</td>
                  <td>{sale.product_id}</td>
                  <td>{sale.quantity}</td>
                  <td>{sale.unit_price}</td>
                  <td>{sale.total_price}</td>
                  <td>
                    {/* Add a View button for each sale */}
                    <button onClick={() => viewSale(sale)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>There is no sale data available</p>
      )}

      {/* Display the selected sale details */}
      {selectedSale && (
        <div>
          <h2>Sale Details</h2>
          <p>Sale ID: {selectedSale.sale_id}</p>
          <p>Sale Date: {selectedSale.sale_date}</p>
          <p>Product ID: {selectedSale.product_id}</p>
          <p>Quantity: {selectedSale.quantity}</p>
          <p>Unit Price: {selectedSale.unit_price}</p>
          <p>Total Price: {selectedSale.total_price}</p>
        </div>
      )}

      <br />
      <button onClick={createSale}>Add Sale</button>
      <button onClick={() => deleteSale(selectedSale.sale_id)}>Delete Sale</button>
    </div>
  );
}

export default App;


