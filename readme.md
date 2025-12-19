# BuyNow Ecommerce Project

## Project Overview
**BuyNow** is a microservices-based e-commerce platform built using Spring Boot,React, MongoDB, Redis, and ActiveMQ.  
The system is designed to support modular development, scalability, and maintainability.


## Architecture

The project follows a **microservices architecture** with a dedicated frontend layer:

- React frontend as the client-facing application
- API Gateway as the single entry point for backend services
- Independent backend microservices communicating over `backend-network`
- MongoDB for data persistence
- Redis for caching frequently accessed product data
- ActiveMQ for asynchronous messaging


## Frontend (React Application)

The frontend is built with **React** and serves as the client-facing layer of the platform.  
It communicates exclusively with the backend through the **API Gateway**, ensuring a clean separation of concerns and centralized API access.

### Responsibilities

- User authentication and session handling
- Product browsing and search
- Cart management
- Payment initiation
- UI rendering and user interaction

### Frontend Best Practices

#### Performance Optimization
- Lazy-loading routes and heavy components to reduce initial load time
- Memoization using `React.memo`, `useMemo`, and `useCallback` to avoid unnecessary re-renders
- Efficient state updates by keeping state localized when possible
- Avoiding excessive API calls through proper data fetching strategies

#### View Optimization
- Reusable and composable UI components
- Clear separation between layout, view, and logic
- Responsive design to support multiple screen sizes
- Proper use of loading states, skeletons, and empty states for better UX

#### Scalability
- Feature-based folder structure to support growth
- Components designed to be reusable across multiple views
- Minimal coupling between UI components and business logic
- Clear boundaries between presentation layer and data-fetching logic


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

### 7. Caching Layer (Redis)

- Redis is used to cache:
  - Product lists
  - Product details by ID
- Improves response time and reduces load on MongoDB
- Primarily consumed by the **Product Service**
- Typical use cases:
  - Read-through cache
  - Cache eviction on product updates

### 8. ActiveMQ
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
