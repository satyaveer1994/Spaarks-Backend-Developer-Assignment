# Restaurant API

This API provides endpoints for user authentication and restaurant operations.

## Prerequisites
- Node.js
- npm
- Docker
- MongoDB Atlas account

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Build the application: `npm run build`
4. Set up MongoDB Atlas and update `config/config.js` with your MongoDB URI and JWT secret
5. Run the Docker container: `docker build -t your-image-name .` and `docker run -p 3000:3000 -d your-image-name`

## Configuration
- Set the following environment variables:
  - `MONGO_URI`: MongoDB Atlas URI
  - `JWT_SECRET`: Secret key for JWT token

## Usage
- **User Authentication:**
  - POST `/api/auth/login`: User login
    - Request body: `{ "username": "yourUsername", "password": "yourPassword" }`
    - Response: `{ "token": "yourAuthToken" }`
- **Restaurant Operations:**
  - POST `/api/restaurants/distance-range`: Get restaurants within a distance range
    - Requires valid JWT token in the Authorization header
    - Request body: `{ "latitude": 17.343242, "longitude": 78.342343, "minDistance": 500, "maxDistance": 2000 }`
    - Response: `{ "restaurants": [...] }`
  - POST `/api/restaurants/near
