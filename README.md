# Product API

This is a simple RESTful API built with **Node.js**, **Express**, and **MongoDB**, designed for managing a list of products. It includes robust documentation, Docker support, and unit testing.

## Features

- CRUD operations for products
- Swagger API documentation
- Docker support for containerized deployment
- Unit tests with Jest and Supertest
- In-memory MongoDB for isolated tests
- Logger integration using Winston

## Technologies Used

- Node.js
- Express
- MongoDB & Mongoose
- Docker & Docker Compose
- Jest & Supertest
- Swagger (OpenAPI)
- Winston logger
- dotenv

## Getting Started

### Prerequisites

- Docker & Docker Compose installed
- Node.js and npm (for local development)

### Installation (Local)

```bash
git clone https://github.com/yourusername/backend-crud-test.git
cd backend-crud-test
npm install
```

### Running the App (Locally)

```bash
npm run start
```

### Running with Docker

```bash
docker-compose up --build
```

The app will be available at `http://localhost:3000`.

### Swagger Documentation

Visit `http://localhost:3000/api-docs` to view the Swagger UI.

### Running Tests

```bash
npm test
```

## API Endpoints

| Method | Endpoint                 | Description              |
|--------|--------------------------|--------------------------|
| POST   | `/api/v1/products`       | Create a product         |
| GET    | `/api/v1/products`       | List all products        |
| GET    | `/api/v1/products/:id`   | Get a product by ID      |
| PUT    | `/api/v1/products/:id`   | Update a product         |
| DELETE | `/api/v1/products/:id`   | Delete a product         |

