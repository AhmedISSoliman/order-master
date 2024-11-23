# order-master

## Angular Order Management System

This project is an Angular-based Order Management System that provides a platform to view, manage, and edit orders and products. The application uses Angular Material for the UI, `json-server` for a mock API backend, and incorporates best practices like modularization, data caching, and dependency injection.

---

## Features

- **Orders Module**:
  - View a list of orders with details like order ID, date, products, and payment method.
  - Drill down into individual orders to view product details and user information.

- **Products Module**:
  - View all products, highlight those with low quantities, and edit product quantities in real-time.

- **Responsive Design**:
  - Fully responsive UI using Angular Material and SCSS.

- **JSON Server Integration**:
  - Mock API backend using `json-server` to simulate real API responses.

---

## Tech Stack

- **Frontend**: Angular (Version 17)
- **UI Library**: Angular Material
- **Backend**: JSON Server (for mock API)
- **Styling**: SCSS

---

## Project Structure

The project is organized into multiple modules for scalability and maintainability:

## Installation Instructions

1. **Clone the Repository**

   git clone https://github.com/AhmedISSoliman/order-master.git
   cd <order-master>

2. **Install Dependencies**
   npm install

3. **Serve JSON Server**
   json-server --watch db.json --port 3000

4. **Run the Angular Project**
   ng-serve

## Mock API Endpoints

/orders Fetch all orders
/orders/:id Fetch order by ID
/products Fetch all products
/users/:id Fetch user details by ID
