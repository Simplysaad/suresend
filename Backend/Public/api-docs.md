# SharpSend API Documentation

This document provides a comprehensive overview of the SharpSend backend API endpoints, request/response formats, authentication, and usage guidelines for frontend developers.

## Base URL

```
http://<your-server-domain>/
```

---

## Authentication

SharpSend uses JWT-based authentication. Obtain a token via login and include it in the `Authorization` header for protected routes:

```
Authorization: Bearer <token>
```

---

## Endpoints

### 1. Auth Endpoints

#### POST `/auth/register`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - `201 Created` on success
  - `400 Bad Request` if validation fails
  - Example:
    ```json
    {
      "message": "User registered successfully",
      "user": { "id": "string", "username": "string", "email": "string" }
    }
    ```

#### POST `/auth/login`
- **Description:** Login and receive JWT token.
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - `200 OK` on success
  - Example:
    ```json
    {
      "token": "<jwt-token>",
      "user": { "id": "string", "username": "string", "email": "string" }
    }
    ```

---

### 2. Main Endpoints

#### GET `/main/orders`
- **Description:** Get all orders for the authenticated user.
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  - `200 OK`
  - Example:
    ```json
    [
      {
        "id": "string",
        "userId": "string",
        "status": "string",
        "createdAt": "ISODate",
        ...
      }
    ]
    ```

#### POST `/main/orders`
- **Description:** Create a new order.
- **Headers:**
  - `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "item": "string",
    "quantity": "number",
    "address": "string"
  }
  ```
- **Response:**
  - `201 Created`
  - Example:
    ```json
    {
      "message": "Order created successfully",
      "order": { "id": "string", "item": "string", ... }
    }
    ```

#### GET `/main/orders/:id`
- **Description:** Get details of a specific order.
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  - `200 OK`
  - Example:
    ```json
    {
      "id": "string",
      "item": "string",
      "quantity": "number",
      "address": "string",
      "status": "string",
      "createdAt": "ISODate"
    }
    ```

#### PUT `/main/orders/:id`
- **Description:** Update an order.
- **Headers:**
  - `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "item": "string",
    "quantity": "number",
    "address": "string",
    "status": "string"
  }
  ```
- **Response:**
  - `200 OK`
  - Example:
    ```json
    {
      "message": "Order updated successfully",
      "order": { "id": "string", ... }
    }
    ```

#### DELETE `/main/orders/:id`
- **Description:** Delete an order.
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  - `200 OK`
  - Example:
    ```json
    {
      "message": "Order deleted successfully"
    }
    ```

---

### 3. User Endpoints

#### GET `/main/profile`
- **Description:** Get authenticated user's profile.
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  - `200 OK`
  - Example:
    ```json
    {
      "id": "string",
      "username": "string",
      "email": "string"
    }
    ```

#### PUT `/main/profile`
- **Description:** Update user profile.
- **Headers:**
  - `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string"
  }
  ```
- **Response:**
  - `200 OK`
  - Example:
    ```json
    {
      "message": "Profile updated successfully",
      "user": { "id": "string", "username": "string", "email": "string" }
    }
    ```

---

### 4. Miscellaneous

#### GET `/docs`

- **Description:** API documentation (HTML).
- **Response:**
  - `200 OK` (HTML content)

---

## Error Handling

- All errors are returned in JSON format:
  ```json
  {
    "error": "Error message"
  }
  ```
- Common HTTP status codes:
  - `400 Bad Request`: Invalid input
  - `401 Unauthorized`: Missing/invalid token
  - `404 Not Found`: Resource not found
  - `500 Internal Server Error`: Server error

---

## Example Usage

### Register
```js
fetch('/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, email, password })
})
```

### Login
```js
fetch('/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})
```

### Authenticated Request
```js
fetch('/main/orders', {
  headers: { 'Authorization': 'Bearer ' + token }
})
```

---

## Contact
For questions or support, contact the backend team.
