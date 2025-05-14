# E-commerce Admin API

This is a Node.js backend API for an e-commerce admin dashboard that manages products, sales, revenue analytics, and inventory.

## Features

- Register new products with inventory quantity
- View sales data filtered by date range, product, and category
- Revenue analysis on daily, weekly, monthly, and annual basis
- Inventory status viewing and low stock alerts
- Update inventory quantities
  
##API Endpoints

POST /api/products — Register new product (body: { name, category, price, quantity })

GET /api/products — Get all products with inventory

GET /api/sales — Get sales data filtered by query params: startDate, endDate, productId, category

GET /api/sales/revenue — Revenue analytics by period (daily, weekly, monthly, annual), filtered by startDate, endDate, category

GET /api/inventory — Get current inventory status

GET /api/inventory/low-stock?threshold=10 — Get products with inventory below threshold

PUT /api/inventory — Update inventory (body: { productId, quantity })

## Tech Stack

- Node.js + Express.js
- MySQL (via Sequelize ORM)

## Setup Instructions

1. Clone the repo:

```bash
git clone https://github.com/yourusername/ecommerce-admin-api.git
cd ecommerce-admin-api
```
npm install
npm run seed
npm start
or
node app.js

