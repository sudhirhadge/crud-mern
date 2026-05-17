const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the CORS middleware
const morgan = require("morgan"); // Import the Morgan logging middleware for better request logging
const dotenv = require("dotenv"); // Import dotenv to load environment variables

// Import route handlers
const itemRoutes = require("./routes/items"); //
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");


dotenv.config(); // Load environment variables from .env file

const app = express();

// CORS configuration
const corsOptions = {
  origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Fixed methods array
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: false, // Don't pass the CORS response to the next handler
  optionsSuccessStatus: 200, // Success status for OPTIONS request
  // credentials: true, // Allow cookies and headers like Authorization
};

// Middlewares
// Apply CORS middleware globally
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for logging
app.use(morgan("dev"));



// Use the imported route handlers for specific paths (ensure these paths match the routes defined in your route files)
app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// MongoDB connection
const MONGODB_URL = process.env.MONGODB_URL;
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit if there's a database connection error
  });

// Test route to display incoming request details in the browser. 
/* app.get vs app.use - 
  app.get is used to define a route handler for GET requests to a specific path (in this case, "/"). It will only handle GET requests that match the specified path. 
  an app.use, on the other hand, is used to define middleware that will be executed for all HTTP methods (GET, POST, PUT, DELETE, etc.) and for all paths (or a specific path if provided). */


app.get("/", (req, res) => {
  // Prepare the request details to be displayed in the browser
  const requestDetails = `
    <h1>Incoming Request Details</h1>
    <p><strong>Method:</strong> ${req.method}</p>
    <p><strong>URL:</strong> ${req.url}</p>
    <p><strong>Origin:</strong> ${req.get("Origin") || "No Origin"}</p>
    <p><strong>Headers:</strong></p>
    <pre>${JSON.stringify(req.headers, null, 2)}</pre>
  `;

  // Send the request details as the response
  res.send(requestDetails);
});

// Error handling middleware (single instance) - It should be placed after all route handlers and middlewares to catch any errors that occur during request processing.
app.use((err, req, res, next) => {
  console.log(
    `Incoming request: ${req.method} ${req.url} from ${req.headers.origin}`
  );
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});


// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server : is running on port ${PORT}`);
});
