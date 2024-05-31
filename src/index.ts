// src/index.ts

import express from "express";
import {  createConnection } from "typeorm";
import { logger } from "./middleware/logger"; // Import the logger middleware
import routes from "./routes"; // Import centralized router
import { User } from "./models/User";
import { Transaction } from './models/Transaction';


const app = express();
const PORT = 3001;

app.use(express.json());
app.use(logger); // Use the logger middleware
app.use(routes); // Use centralized router

createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "codewarx",
  database: "demo",
  entities: [
    User, // Add your entities here
    Transaction,
  ],
  synchronize: true, // Automatically sync database schema with entities. Disable in production.
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => console.log("TypeORM connection error: ", error));
