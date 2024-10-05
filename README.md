# Dreamscape Realty

A responsive real estate website that allows users to browse, purchase, and manage properties with an admin portal for property management. The project is built using **Node.js**, **Express**, **MongoDB**, and **JWT** authentication, and features CRUD operations for properties.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Models](#models)
- [Middleware](#middleware)
- [Future Enhancements](#future-enhancements)

## Features

- **Browse Properties**: Users can view available properties.
- **User Authentication**: Secure signup and login using JWT.
- **Purchase Properties**: Users can express interest in or purchase properties.
- **Admin Dashboard**: Admins can add, update, and delete property listings.
- **Mobile Friendly**: Fully responsive UI designed for mobile and desktop views.

## Technologies

- **Frontend**: HTML, CSS, ReactJS (if applicable)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Other**: Tailwind CSS, Mongoose ORM

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shubechavan/Dreamscaperealestate.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Dreamscaperealestate
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and configure your environment variables:
   ```bash
   touch .env
   ```

   Add the following keys to the `.env` file:
   ```plaintext
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   EMAIL_USER=your-email@example.com
   EMAIL_PASS=your-email-password
   ```

5. Start the server:
   ```bash
   npm start
   ```

## Usage

You can use **Postman** or any API client to interact with the API.

For development:
- Run the server:
  ```bash
  npm run dev
  ```
- Access the application at: `http://localhost:3000`

## API Endpoints

### Admin Routes

- **POST** `/admin/signup` — Register a new admin
- **POST** `/admin/signin` — Login admin and receive a JWT token
- **POST** `/admin/property` — Create a new property listing (requires admin authentication)
- **GET** `/admin/property` — Fetch all properties (requires admin authentication)
- **PUT** `/admin/property/:id` — Update a property by ID (requires admin authentication)
- **DELETE** `/admin/property/:id` — Delete a property by ID (requires admin authentication)

### User Routes

- **POST** `/user/signup` — Register a new user
- **POST** `/user/signin` — Login user and receive a JWT token
- **GET** `/user/property` — Fetch all available properties
- **POST** `/user/property/:propertyId` — Purchase a property by ID (requires user authentication)
- **GET** `/user/purchasedProperty` — Get properties purchased by the user (requires user authentication)

## Environment Variables

The application expects the following environment variables in the `.env` file:

- **MONGODB_URI**: MongoDB connection string.
- **JWT_SECRET**: Secret key used for JWT token signing.
- **EMAIL_USER**: Email used for sending notifications (Nodemailer).
- **EMAIL_PASS**: Password for the email account.

## Models

### Admin
- `username`: String, required
- `password`: String, required

### User
- `username`: String, required
- `password`: String, required
- `purchasedProperty`: Array of property IDs purchased by the user

### Property
- `title`: String, required
- `description`: String, required
- `price`: Number, required
- `imagelink`: String, required

## Middleware

- **Admin Middleware**: Protects admin routes, ensuring only authenticated admins can access them.
- **User Middleware**: Protects user routes, ensuring only authenticated users can access them.

## Future Enhancements

- **Search and Filter**: Add advanced search and filter functionality for properties.
- **Payment Integration**: Implement payment gateway for property purchases.
- **User Notifications**: Implement email notifications for property purchase confirmations.

---

### Instructions for updating:

1. **Customize the environment variables section** with your specific configuration.
2. **Ensure all features and enhancements** accurately reflect your project.
3. **Push changes to GitHub** once you've updated your local README:

```bash
git add README.md
git commit -m "Updated README with project details"
git push origin main
```
