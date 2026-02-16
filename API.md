# EcoPulse API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All authenticated endpoints require Bearer token in header:
```
Authorization: Bearer <access_token>
```

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "securepassword"
}

Response: 201
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "johndoe"
  },
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}

Response: 200
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "johndoe",
    "coinBalance": 100,
    "ecoScore": 500
  },
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token"
}
```

### Get Profile
```http
GET /auth/profile
Authorization: Bearer <token>

Response: 200
{
  "id": "uuid",
  "email": "user@example.com",
  "username": "johndoe",
  "walletAddress": "0x...",
  "ecoScore": 500,
  "coinBalance": 100,
  "avatar": "url",
  "bio": "Eco warrior",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## Tasks

### Create Task
```http
POST /tasks
Authorization: Bearer <token>
Content-Type: multipart/form-data

proof: <image_file>
type: PLANT_TREE
title: Planted a tree
description: Planted oak tree in local park
location: Central Park
latitude: 40.7829
longitude: -73.9654

Response: 201
{
  "id": "uuid",
  "userId": "uuid",
  "type": "PLANT_TREE",
  "title": "Planted a tree",
  "proofUrl": "https://s3.../image.jpg",
  "status": "PENDING",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Get Tasks
```http
GET /tasks?status=APPROVED&userId=uuid
Authorization: Bearer <token>

Response: 200
[
  {
    "id": "uuid",
    "type": "PLANT_TREE",
    "title": "Planted a tree",
    "proofUrl": "url",
    "status": "APPROVED",
    "coinsEarned": 50,
    "user": {
      "id": "uuid",
      "username": "johndoe",
      "avatar": "url"
    },
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

### Verify Task (Admin)
```http
PATCH /tasks/:id/verify
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "APPROVED",
  "coinsEarned": 50
}

Response: 200
{
  "id": "uuid",
  "status": "APPROVED",
  "coinsEarned": 50,
  "verifiedAt": "2024-01-01T00:00:00Z"
}
```

## Events

### Create Event
```http
POST /events
Authorization: Bearer <token>
Content-Type: multipart/form-data

image: <image_file>
title: Beach Cleanup Drive
description: Join us for beach cleanup
eventType: BEACH_CLEANUP
date: 2024-03-21T10:00:00Z
location: Santa Monica Beach
latitude: 34.0195
longitude: -118.4912
maxParticipants: 100
budget: 5000
rewards: 100

Response: 201
{
  "id": "uuid",
  "title": "Beach Cleanup Drive",
  "eventType": "BEACH_CLEANUP",
  "date": "2024-03-21T10:00:00Z",
  "maxParticipants": 100,
  "rewards": 100,
  "status": "UPCOMING"
}
```

### Get Events
```http
GET /events?status=UPCOMING&eventType=BEACH_CLEANUP

Response: 200
[
  {
    "id": "uuid",
    "title": "Beach Cleanup Drive",
    "description": "Join us for beach cleanup",
    "eventType": "BEACH_CLEANUP",
    "date": "2024-03-21T10:00:00Z",
    "location": "Santa Monica Beach",
    "maxParticipants": 100,
    "rewards": 100,
    "imageUrl": "url",
    "creator": {
      "id": "uuid",
      "username": "johndoe",
      "avatar": "url"
    },
    "participants": []
  }
]
```

### Join Event
```http
POST /events/:id/join
Authorization: Bearer <token>

Response: 201
{
  "id": "uuid",
  "eventId": "uuid",
  "userId": "uuid",
  "status": "REGISTERED",
  "joinedAt": "2024-01-01T00:00:00Z"
}
```

## Users

### Get User
```http
GET /users/:id

Response: 200
{
  "id": "uuid",
  "username": "johndoe",
  "avatar": "url",
  "bio": "Eco warrior",
  "ecoScore": 500,
  "coinBalance": 100,
  "tasks": []
}
```

### Get Leaderboard
```http
GET /users/leaderboard

Response: 200
[
  {
    "id": "uuid",
    "username": "johndoe",
    "avatar": "url",
    "ecoScore": 5000,
    "coinBalance": 1000
  }
]
```

## Transactions

### Get Transactions
```http
GET /transactions
Authorization: Bearer <token>

Response: 200
[
  {
    "id": "uuid",
    "type": "REWARD",
    "amount": 50,
    "txHash": "0x...",
    "status": "COMPLETED",
    "description": "Task reward",
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

### Create Transaction
```http
POST /transactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "PAYMENT",
  "amount": 50,
  "toWallet": "0x...",
  "description": "Bill payment"
}

Response: 201
{
  "id": "uuid",
  "type": "PAYMENT",
  "amount": 50,
  "txHash": "0x...",
  "status": "COMPLETED"
}
```

## Carbon Credits

### Purchase Carbon Credit
```http
POST /carbon
Content-Type: application/json

{
  "companyName": "Tech Corp",
  "companyEmail": "contact@techcorp.com",
  "amount": 1000,
  "price": 50000
}

Response: 201
{
  "id": "uuid",
  "companyName": "Tech Corp",
  "amount": 1000,
  "price": 50000,
  "status": "PENDING"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid token"
}
```

### 403 Forbidden
```json
{
  "error": "Admin access required"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Rate Limiting

- 100 requests per 15 minutes per IP
- Exceeding limit returns 429 Too Many Requests

## Task Types

- PLANT_TREE
- WATER_PLANTS
- PUBLIC_TRANSPORT
- BEACH_CLEANUP
- RECYCLE
- REDUCE_PLASTIC
- BIKE_RIDE
- CARPOOL
- OTHER

## Event Types

- TREE_PLANTING
- BEACH_CLEANUP
- RIVER_CLEANUP
- AWARENESS_CAMPAIGN
- WORKSHOP
- OTHER
