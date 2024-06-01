// src/db.ts
import { createConnection } from 'typeorm';
import { User } from './../models/User';
import { Transaction } from './../models/Transaction';

export const connectDB = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'codewarx',
      database: 'demo',
      entities: [
        User,
        Transaction,
      ],
      synchronize: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};
