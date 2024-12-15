const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const errorHandler = require("./middleware/errorHandler.js");
const cors = require('cors')
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON body

app.use(cors({
    origin: 'http://localhost:5173',  // or use a wildcard '*' for all origins in development
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));

// Routes
app.use("/api/users", userRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
