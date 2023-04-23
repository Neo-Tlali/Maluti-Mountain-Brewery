--distributing tables
SELECT create_distributed_table('branch', 'branch_id');
SELECT create_distributed_table('department', 'department_id');
SELECT create_distributed_table('employee', 'emp_id');
SELECT create_distributed_table('distributor', 'distro_id');
SELECT create_distributed_table('product', 'product_id');
SELECT create_distributed_table('delivery', 'delivery_id');
SELECT create_distributed_table('orders', 'order_id');
SELECT create_distributed_table('sales', 'sale_id');

