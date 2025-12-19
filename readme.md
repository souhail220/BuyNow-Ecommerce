# BuyNow Microservices Project

## Project Overview
**BuyNow** is a microservices-based e-commerce platform built using Spring Boot, MongoDB, and ActiveMQ.  
The system is designed to support modular development, scalability, and maintainability.

## Architecture

The project follows a **microservices architecture** with a dedicated frontend layer:

- React frontend as the client-facing application
- API Gateway as the single entry point for backend services
- Independent backend microservices communicating over `backend-network`
- MongoDB for data persistence
- ActiveMQ for asynchronous messaging

## Frontend (React Application)

- Built with **React**
- Communicates exclusively with the backend via the **API Gateway**
- Responsible for:
    - User authentication flows
    - Product browsing
    - Cart management
    - Payment initiation
- Decoupled from backend services to allow independent development and deployment

## Backend Key Services

### 1. Authentication Service
- Manages user authentication and authorization
- Port: `8080`
- Container Name: `UserAuthenticationService`

### 2. API Gateway Service
- Central entry point for all client requests
- Handles routing to other services
- Port: `80`
- Container Name: `APIGatewayService`

### 3. Product Service
- Manages product catalog operations (CRUD)
- Connects to MongoDB to store product data
- Port: `8081`
- Container Name: `ProductService`
- Environment Variable:
  ```text
  SPRING_DATA_MONGODB_URI=mongodb://mongodb:27017/products

### 4. Card Service
- Mananges user's cart
- Connects to MongoDB to store cart data
- Port: `8082`
- Container Name: `CartService`

### 5. PaymentService
- Manage Payments and Factures
- Port: `8083`
- Container Name: `PaymentService`

### 6.MongoDB
- Stores product data
- Port: 27018 (host) → 27017 (container)
- Container Name: `mongodb`
- Docker Volume: `mongodb-data`
- Health check included

### 7. ActiveMQ
- Message broker for asynchronous communication
- Ports:
  - 61617 → JMS OpenWire
  - 8162 → Web Console
- Container Name: activemq
- Docker Volume: activemq-data
- Health check included

### Prerequisites

- Docker & Docker Compose installed
- Internet connection
- Node.js 18+ (for running the React frontend locally)
- (Optional) Java 17+ if running backend services locally without Docker


## Setup Instructions

### Step 1: Clone Repository

```bash
git clone <repository_url>
cd <repository_folder>
````
### Step 2: Start Services Using Docker Compose

```bash
docker-compose up -d
````

### Step 3: Verify Services

```bash
docker ps
````

#### Available Endpoints:
    - API Gateway: http://localhost
    - Authentication Service: http://localhost:8080
    - Product Service: http://localhost:8081
    - Cart Service: http://localhost:8082
    - Payment Service: http://localhost:8083
    - ActiveMQ Web Console: http://localhost:8162

### Step 3: Run React Frontend
```bash
cd frontend
npm install
npm run dev
````
#### The frontend will be available at:
  - http://localhost:5173/
