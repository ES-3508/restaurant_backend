// Import necessary modules
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
require("dotenv").config();
require("dotenv").config({ path: path.join(__dirname, ".env") });

// Import Routes
// const foodRouter = require('./routes/foodRoute.js');
const userRouter = require('./routes/userRoute.js');
const cartRouter = require('./routes/cartRoute.js');
const orderRouter = require('./routes/orderRoute.js');

const app = express();

// MongoDB connection
const option = {
    socketTimeoutMS: 30000,
};

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, option).then(
  () => {
    console.log("MongoDB connected!");
  },
  (err) => {
    console.log("Failed to connect to MongoDB", 'mongodb+srv://nawodya:nawodya1234@cluster0.f8lkd.mongodb.net/food-del');
  }
);

// Middleware
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

const corsOptions = {
  origin: [
    'https://the-toucan-app-react.vercel.app/', 
    'https://toucan.supersconto24.com/api/v1/auth/me', 
    'https://toucan.supersconto24.com'
  ],
  credentials: true, 
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store');
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Set port and listen for requests
const APP_PORT = process.env.APP_PORT || 5000;
app.use(require('express-status-monitor')());
app.disable('x-powered-by');

app.listen(APP_PORT, () => {
  console.log(`Server is running on http://localhost:${APP_PORT}`);
});

module.exports = app;
