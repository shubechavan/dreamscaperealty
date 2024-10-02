

### README for Dreamscape Realty

```markdown
# Dreamscape Realty

This project demonstrates a responsive real estate website that allows users to check and buy properties. Built with Node.js, Express, and MongoDB, it features basic CRUD (Create, Read, Update, Delete) operations for managing property listings.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [Middleware](#middleware)

## Features

- **Browse Properties**: Users can view a list of available properties.
- **Add Properties**: Admins can create new property listings.
- **Update Properties**: Admins can update existing property details.
- **Delete Properties**: Admins can remove property listings that are no longer available.
- **User-friendly Interface**: Designed to provide a seamless experience for users on both mobile and desktop devices.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shubechavan/Dreamscaperealestate.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd Dreamscaperealestate
   ```

3. **Install the required packages:**

   ```bash
   npm install
   ```

4. **Create a .env file in the root directory** and add your MongoDB connection string:

   ```plaintext
   MONGODB_URI=<your-mongodb-uri>
   ```

5. **Start the server:**

   ```bash
   npm start
   ```

## Usage

Use Postman or any API client to test the endpoints. You can interact with the API to manage property listings.

## API Endpoints

### Admin Routes

- **POST /admin/signup**: Register a new admin.
- **POST /admin/signin**: Login an admin and get a JWT token (if applicable).
- **POST /admin/properties**: Create a new property (requires admin authentication).
- **GET /admin/properties**: Fetch all properties (requires admin authentication).
- **PUT /admin/properties/:id**: Update an existing property (requires admin authentication).
- **DELETE /admin/properties/:id**: Delete a property (requires admin authentication).

### User Routes

- **POST /user/signup**: Register a new user.
- **POST /user/signin**: Login a user and get a JWT token (if applicable).
- **GET /user/properties**: List all available properties.
- **POST /user/properties/:propertyId**: Express interest or purchase a property (requires user authentication).
- **GET /user/purchasedProperties**: Fetch properties purchased by the user (requires user authentication).

## Models

- **Admin**: Represents admin users who manage property listings.
- **User**: Represents regular users who can browse and purchase properties.
- **Property**: Represents the properties available for rent or purchase.

## Middleware

- **Admin Middleware**: Validates admin authentication for protected admin routes.
- **User Middleware**: Validates user authentication for protected user routes.

```

