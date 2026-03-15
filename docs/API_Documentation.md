# API Documentation

## Tech2High Bootcamp Portal API

**Base URL**: `http://localhost:3000`  
**Swagger UI**: `http://localhost:3000/api/docs`  
**Auth**: Bearer JWT token (include as `Authorization: Bearer <token>` header)

---

## Authentication

### POST /auth/login
Login with email and password.

**Request**:
```json
{
  "email": "student@tech2high.com",
  "password": "password123"
}
```

**Response** `200 OK`:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "role": "student"
  }
}
```

### POST /auth/register
Register a new user.

**Request**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

---

## Users

### GET /users
Get all users (admin only).

### GET /users/:id
Get a specific user by ID.

### PATCH /users/:id
Update a user.

### DELETE /users/:id
Delete a user.

---

## Lessons

### GET /lessons
Get all lessons. Optional query param: `?batchId=<uuid>`

### GET /lessons/:id
Get a lesson by ID.

### POST /lessons
Create a new lesson (admin only).

**Request**:
```json
{
  "title": "Python for Data Science",
  "description": "Learn Python for data analysis.",
  "videoUrl": "https://example.com/video",
  "materialUrl": "https://example.com/material.pdf",
  "order": 2,
  "batchId": "uuid"
}
```

### PATCH /lessons/:id
Update a lesson (admin only).

### DELETE /lessons/:id
Delete a lesson (admin only).

---

## IP Management

### GET /ip
Get all IP requests (admin only).

### GET /ip/my-requests
Get the current user's IP requests.

### POST /ip/request
Submit an IP whitelist request.

**Request**:
```json
{
  "ipAddress": "192.168.1.100",
  "description": "Home office IP"
}
```

### PATCH /ip/:id/approve
Approve an IP request (admin only).

```json
{ "reviewNotes": "Approved for home access" }
```

### PATCH /ip/:id/reject
Reject an IP request (admin only).

```json
{ "reviewNotes": "IP outside allowed range" }
```

---

## Payments

### GET /payments
Get all payments (admin only).

### GET /payments/my-payments
Get current user's payments.

### POST /payments
Create a payment record.

**Request**:
```json
{
  "amount": 500.00,
  "description": "Batch 3 - Remaining Balance",
  "batchId": "uuid"
}
```

---

## Messaging

### GET /messages/inbox
Get inbox messages for the current user.

### GET /messages/conversation/:userId
Get conversation history with a specific user.

### POST /messages/send
Send a message.

**Request**:
```json
{
  "recipientId": "uuid",
  "content": "Hello, I have a question about the Python module."
}
```

### PATCH /messages/:id/read
Mark a message as read.

---

## Error Responses

All errors follow this format:
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

| Status | Meaning                        |
|--------|--------------------------------|
| 200    | OK                             |
| 201    | Created                        |
| 400    | Bad Request (validation error) |
| 401    | Unauthorized (invalid/missing JWT) |
| 403    | Forbidden (insufficient role)  |
| 404    | Not Found                      |
| 500    | Internal Server Error          |
