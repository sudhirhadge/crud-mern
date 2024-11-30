const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const itemRoutes = require("./routes/items");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    "mongodb+srv://sudhirhadge:Login_6815@sudhircluster.teaog.mongodb.net/CRUDAuthJSONWEBTOKEN?retryWrites=true&w=majority&appName=sudhirCluster",
    "http://localhost:3000",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Fixed methods array
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: false, // Don't pass the CORS response to the next handler
  optionsSuccessStatus: 200, // Success status for OPTIONS request
  // credentials: true, // Allow cookies and headers like Authorization
};

app.use(cors(corsOptions));

// Middleware to handle preflight OPTIONS requests
// app.options("*", cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for logging
app.use(morgan("dev"));

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

// Error handling middleware (single instance)
app.use((err, req, res, next) => {
  console.log(
    `Incoming request: ${req.method} ${req.url} from ${req.headers.origin}`
  );
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Routes
app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

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

// Error handling middleware (single instance)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server : is running on port ${PORT}`);
});
