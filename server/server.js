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
  origin: ["http://localhost:3000", "https://crufrontend.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"], // Fixed methods array
  allowedHeaders: ["Content-Type", "Authorization"],
  // credentials: true, // Allow cookies and headers like Authorization
};
app.use(cors(corsOptions));

// Middleware to handle preflight OPTIONS requests
app.options("*", cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for logging
app.use(morgan("dev"));

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://sudhirhadge:Login_6815@sudhircluster.teaog.mongodb.net/CRUDAuthJSONWEBTOKEN?retryWrites=true&w=majority&appName=sudhirCluster",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
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
  res.send("Hello World, This is my first app deployed on vercel");
});

// Error handling middleware (single instance)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
