# Spogpaws APIs Documentation

## Base Information
- **Base URL**: `{your_server_ip}/api/v1/`
- **Content-Type**: `application/json`
- **Authentication**: JWT Bearer Token (except for login/signup)

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Public Endpoints** (No authentication required):
- `/api/v1/user/login`
- `/api/v1/user/signup`

---

## User Management APIs

### Base URL: `/api/v1/user/`

### 1. User Signup
**Endpoint**: `POST /signup`  
**Description**: Register a new user account  
**Authentication**: None required

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com", 
  "password": "password123",
  "role": "USER"
}
```

**Response** (201 Created):
```json
{
  "status": "success",
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "email": "johndoe@example.com",
    "name": "John Doe",
    "user_id": 1,
    "role": "USER"
  }
}
```

**Error Response** (409 Conflict):
```json
{
  "status": "error",
  "statusCode": 409,
  "message": "Email already taken"
}
```

---

### 2. User Login
**Endpoint**: `POST /login`  
**Description**: Authenticate user and get JWT token  
**Authentication**: None required

**Request Body**:
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response** (200 OK):
```json
{
  "status": "success",
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "email": "johndoe@example.com",
    "name": "John Doe",
    "role": "USER",
    "user_id": 1,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response** (401 Unauthorized):
```json
{
  "status": "error",
  "statusCode": 401,
  "message": "Invalid email or password"
}
```

---

### 3. Get All Users
**Endpoint**: `GET /`  
**Description**: Retrieve all users  
**Authentication**: Required

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com",
    "role": "USER"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "ADMIN"
  }
]
```

---

### 4. Update User
**Endpoint**: `POST /update/{userId}`  
**Description**: Update user information  
**Authentication**: Required

**Request Body** (Send only fields that need updating):
```json
{
  "name": "John Updated",
  "email": "johnupdated@example.com",
  "password": "newpassword",
  "role": "ADMIN"
}
```

**Response** (200 OK):
```json
{
  "status": "success",
  "statusCode": 200,
  "message": "User updated successfully",
  "data": {
    "user_id": 1,
    "name": "John Updated",
    "email": "johnupdated@example.com",
    "role": "ADMIN"
  }
}
```

---

### 5. Delete User
**Endpoint**: `DELETE /delete/{userId}`  
**Description**: Delete a user account  
**Authentication**: Required

**Response** (200 OK):
```json
{
  "status": "success",
  "statusCode": 200,
  "message": "User deleted successfully"
}
```

**Error Response** (404 Not Found):
```json
{
  "status": "error",
  "statusCode": 404,
  "message": "User not found"
}
```

---

### 6. Reset Password
**Endpoint**: `PUT /reset-password/{userId}`  
**Description**: Reset user password  
**Authentication**: Required

**Request Body**:
```json
{
  "newPassword": "newpassword123"
}
```

**Response** (200 OK):
```json
{
  "status": "success",
  "statusCode": 200,
  "message": "Password reset successfully"
}
```

---

## Clinic Management APIs

### Base URL: `/api/v1/clinic/`

### 1. Create Clinic
**Endpoint**: `POST /create-clinic`  
**Description**: Create a new clinic  
**Authentication**: Required

**Request Body**:
```json
{
  "clinicName": "Happy Paws Clinic",
  "openingHours": "9:00 AM - 6:00 PM",
  "about": "We provide comprehensive veterinary care for your pets",
  "userId": 1
}
```

**Response** (201 Created):
```json
{
  "status": "success",
  "statusCode": 201,
  "message": "Clinic created successfully",
  "data": {
    "clinicId": 1,
    "clinicName": "Happy Paws Clinic",
    "openingHours": "9:00 AM - 6:00 PM",
    "about": "We provide comprehensive veterinary care for your pets",
    "userId": 1
  }
}
```

---

### 2. Get All Clinics
**Endpoint**: `GET /get-clinics`  
**Description**: Retrieve all clinics  
**Authentication**: Required

**Response** (200 OK):
```json
{
  "status": "success",
  "statusCode": 200,
  "message": "Clinics Retrieved Successfully",
  "data": [
    {
      "clinicId": 1,
      "clinicName": "Happy Paws Clinic",
      "openingHours": "9:00 AM - 6:00 PM",
      "about": "We provide comprehensive veterinary care for your pets"
    },
    {
      "clinicId": 2,
      "clinicName": "Pet Care Center",
      "openingHours": "8:00 AM - 8:00 PM",
      "about": "24/7 emergency pet care services"
    }
  ]
}
```

---

### 3. Get Clinic by ID
**Endpoint**: `GET /get-clinic-by-id/{clinicId}`  
**Description**: Retrieve a specific clinic by ID  
**Authentication**: Required

**Response** (200 OK):
```json
{
  "status": "success",
  "statusCode": 200,
  "message": "Clinic Retrieved Successfully",
  "data": {
    "clinicId": 1,
    "clinicName": "Happy Paws Clinic",
    "openingHours": "9:00 AM - 6:00 PM",
    "about": "We provide comprehensive veterinary care for your pets",
    "userId": 1
  }
}
```

---

### 4. Update Clinic
**Endpoint**: `PUT /update-clinic/{clinicId}`  
**Description**: Update clinic information  
**Authentication**: Required

**Request Body**:
```json
{
  "clinicName": "Updated Clinic Name",
  "openingHours": "8:00 AM - 7:00 PM",
  "about": "Updated clinic description"
}
```

**Response** (200 OK):
```json
{
  "status": "success",
  "statusCode": 200,
  "message": "Clinic updated successfully",
  "data": {
    "clinicId": 1,
    "clinicName": "Updated Clinic Name",
    "openingHours": "8:00 AM - 7:00 PM",
    "about": "Updated clinic description"
  }
}
```

---

### 5. Request Approval
**Endpoint**: `POST /approval/{clinicId}`  
**Description**: Request approval for clinic  
**Authentication**: Required

**Response** (200 OK):
```json
{
  "status": "success",
  "statusCode": 200,
  "message": "Approval request submitted successfully"
}
```

---

## Pet Adoption APIs

### Base URL: `/api/v1/adoption/`

### 1. Get All Adoptions
**Endpoint**: `GET /get-adoptions`  
**Description**: Retrieve all adoption listings  
**Authentication**: Required

**Response** (200 OK):
```json
{
  "status": "success",
  "statusCode": 200,
  "message": "Adoptions retrieved successfully",
  "data": [
    {
      "id": 1,
      "petName": "Buddy",
      "petType": "Dog",
      "petBreed": "Golden Retriever",
      "petAge": 3,
      "description": "Friendly and energetic dog",
      "contactInfo": "contact@example.com",
      "location": "New York",
      "adoptionDate": "2024-01-15"
    }
  ]
}
```

---

### 2. Get Adoption by ID
**Endpoint**: `GET /get-adoption/{id}`  
**Description**: Retrieve a specific adoption listing by ID  
**Authentication**: Required

**Response** (200 OK):
```json
{
  "status": "success",
  "statusCode": 200,
  "message": "Adoption retrieved successfully",
  "data": {
    "id": 1,
    "petName": "Buddy",
    "petType": "Dog",
    "petBreed": "Golden Retriever",
    "petAge": 3,
    "description": "Friendly and energetic dog",
    "contactInfo": "contact@example.com",
    "location": "New York",
    "adoptionDate": "2024-01-15"
  }
}
```

---

### 3. Create Adoption
**Endpoint**: `POST /create-adoption`  
**Description**: Create a new adoption listing  
**Authentication**: Required

**Request Body**:
```json
{
  "petName": "Buddy",
  "petType": "Dog",
  "petBreed": "Golden Retriever",
  "petAge": 3,
  "description": "Friendly and energetic dog looking for a loving home",
  "contactInfo": "contact@example.com",
  "location": "New York"
}
```

**Response** (201 Created):
```json
{
  "status": "success",
  "statusCode": 201,
  "message": "Adoption created successfully",
  "data": {
    "id": 1,
    "petName": "Buddy",
    "petType": "Dog",
    "petBreed": "Golden Retriever",
    "petAge": 3,
    "description": "Friendly and energetic dog looking for a loving home",
    "contactInfo": "contact@example.com",
    "location": "New York",
    "adoptionDate": "2024-01-15"
  }
}
```

---

### 4. Update Adoption
**Endpoint**: `PUT /update-adoption/{id}`  
**Description**: Update an existing adoption listing  
**Authentication**: Required

**Request Body**:
```json
{
  "petName": "Buddy Updated",
  "description": "Updated description for the pet",
  "petAge": 4
}
```

**Response** (200 OK):
```json
{
  "status": "success",
  "statusCode": 200,
  "message": "Adoption updated successfully",
  "data": {
    "id": 1,
    "petName": "Buddy Updated",
    "description": "Updated description for the pet",
    "petAge": 4
  }
}
```

---

### 5. Delete Adoption
**Endpoint**: `DELETE /delete-adoption/{id}`  
**Description**: Delete an adoption listing  
**Authentication**: Required

**Response** (200 OK):
```json
{
  "status": "success",
  "statusCode": 200,
  "message": "Adoption deleted successfully"
}
```

---

## Data Models

### User Model
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string; // Only for requests, never in responses
  role: string; // "USER" | "ADMIN"
}
```

### Clinic Model
```typescript
interface Clinic {
  clinicId: number;
  clinicName: string;
  openingHours: string;
  about: string;
  userId: number;
}
```

### Adoption Model
```typescript
interface Adoption {
  id: number;
  petName: string;
  petType: string;
  petBreed: string;
  petAge: number;
  description: string;
  contactInfo: string;
  location: string;
  adoptionDate: string; // ISO date string
}
```

---

## Error Handling

All API responses follow a consistent format:

### Success Response Format
```json
{
  "status": "success",
  "statusCode": 200, // or 201 for created
  "message": "Operation completed successfully",
  "data": {} // Response data
}
```

### Error Response Format
```json
{
  "status": "error",
  "statusCode": 400, // HTTP status code
  "message": "Error description"
}
```

### Common HTTP Status Codes
- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized (Invalid credentials or missing token)
- **403**: Forbidden (Access denied)
- **404**: Not Found
- **409**: Conflict (Email already exists, etc.)
- **500**: Internal Server Error

---

## Authentication Flow

1. **Register a new user** using `/api/v1/user/signup`
2. **Login** using `/api/v1/user/login` to get JWT token
3. **Include the token** in all subsequent requests:
   ```javascript
   headers: {
     'Authorization': `Bearer ${token}`,
     'Content-Type': 'application/json'
   }
   ```

---

## Example Usage in JavaScript

### Login Example
```javascript
const login = async (email, password) => {
  try {
    const response = await fetch('http://your-server/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (data.status === 'success') {
      // Store token for future requests
      localStorage.setItem('token', data.data.token);
      return data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
```

### Authenticated Request Example
```javascript
const getClinics = async () => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch('http://your-server/api/v1/clinic/get-clinics', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    const data = await response.json();
    
    if (data.status === 'success') {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Failed to fetch clinics:', error);
    throw error;
  }
};
```

---

## Rate Limiting & Best Practices

1. **Store JWT tokens securely** (localStorage, sessionStorage, or secure cookies)
2. **Handle token expiration** - implement refresh logic or redirect to login
3. **Validate responses** - always check the `status` field before processing data
4. **Error handling** - implement proper error handling for all API calls
5. **Loading states** - show loading indicators during API calls
6. **Network retries** - implement retry logic for failed requests

---

This documentation provides comprehensive information about all available APIs in your Spogpaws backend. Use this as a reference when building your client-side application. 