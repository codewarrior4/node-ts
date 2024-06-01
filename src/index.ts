// src/index.ts

import express from "express";
import {  createConnection } from "typeorm";
import { logger } from "./middleware/logger"; // Import the logger middleware
import routes from "./routes"; // Import centralized router
import { User } from "./models/User";
import { Transaction } from './models/Transaction';
import 'dotenv/config'
import { connectDB } from "./utils/db";


const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(logger); // Use the logger middleware
app.use(routes); // Use centralized router

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
  });