## Backend Architecture and API Setup

Built the backend using **Express.js** and **MongoDB** following a modular and scalable architecture.

The backend structure is organized into multiple layers for better maintainability and clean code practices:

* APIs
* Middleware
* Models
* Cloudinary Configuration
* Authentication Setup
* Database Connection

### Main Backend Modules

* `UserAPI.js`
* `AuthorAPI.js`
* `AdminAPI.js`
* `CommonAPI.js`

### Features Implemented

* User Registration
* User Login & Logout
* JWT Authentication
* Role-Based Authorization
* Article Management APIs
* Comment Management APIs
* Secure Password Encryption
* Protected Routes using Middleware
* Cloudinary Integration for Media Storage

### Application Flow

```text
Frontend Request
       ↓
Express Server
       ↓
Middleware Execution
       ↓
API Route Handler
       ↓
MongoDB Database
       ↓
Response Sent Back
```

The backend follows RESTful API principles and ensures secure communication between the frontend and database.

---

## Authentication and Authorization

Implemented a secure authentication and authorization system using **JWT (JSON Web Token)**.

### Authentication Features

* User Registration
* User Login
* Logout Functionality
* Password Hashing & Encryption
* Protected API Routes
* Role-Based Access Control

### Roles and Permissions

| Role   | Permissions                          |
| ------ | ------------------------------------ |
| User   | Read articles and add comments       |
| Author | Create, edit, and delete articles    |
| Admin  | Manage users and platform activities |

### Middleware Used

* `VerifyToken.js`

This middleware validates JWT tokens and restricts unauthorized access to protected resources.

The authentication system improves application security by ensuring that only authenticated users can access restricted functionalities based on their assigned roles.
