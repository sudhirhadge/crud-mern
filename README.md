# CRUD MERN Application

A full-stack CRUD (Create, Read, Update, Delete) application built with the MERN stack (MongoDB, Express.js, React, Node.js). This project includes user authentication, item and product management, and a responsive frontend.

## Features

- **User Authentication**: Register and login functionality with JWT-based authentication.
- **Item Management**: Add, view, update, and delete items.
- **Product Management**: Manage products with CRUD operations.
- **User Management**: Admin features for managing users.
- **Responsive UI**: Built with React and Vite for a modern, responsive interface.
- **State Management**: Uses Redux for managing application state.
- **Backend API**: RESTful API with Express.js and MongoDB.
- **Testing**: Includes tests for backend functionality.

## Tech Stack

### Frontend
- React
- Vite
- Redux Toolkit
- CSS (with App.css and index.css)

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication
- bcrypt for password hashing

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup
1. Navigate to the `server` directory:
   ```
   cd server
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables: Create a `.env` file in the `server` directory with the following:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Seed the database (optional):
   ```
   npm run seed
   ```
5. Start the server:
   ```
   npm start
   ```

### Frontend Setup
1. Navigate to the `client` directory:
   ```
   cd client
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

The application will be running on `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend.

## Usage

- Register a new user or login with existing credentials.
- Manage items: Add new items, view the list, edit, or delete them.
- Manage products similarly.
- Admin users can manage other users.

## API Endpoints

### Items
- `GET /api/items` - Get all items
- `POST /api/items` - Create a new item
- `PUT /api/items/:id` - Update an item
- `DELETE /api/items/:id` - Delete an item

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `GET /api/users` - Get all users (admin only)
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

## Testing

Run tests for the backend:
```
cd server
npm test
```

## Deployment

This project includes a `vercel.json` file for deployment on Vercel. Ensure your environment variables are set in your deployment platform.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes and commit.
4. Push to your branch and create a pull request.

## License

This project is licensed under the MIT License.