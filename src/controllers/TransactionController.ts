import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";
import { Transaction } from "../models/Transaction";


export const createTransaction = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { amount } = req.body;
        const user = req.body.user; // Assuming req.user contains the logged-in user's details
        
        const transactionRepository = getRepository(Transaction);
        const transaction = new Transaction();
        transaction.user = user; // Associate the transaction with the logged-in user
        transaction.amount = amount;
        await transactionRepository.save(transaction);

        return res.status(201).json(transaction);
    } catch (error) {
        console.error("Error creating transaction:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllTransactions = async (req: Request, res: Response): Promise<Response> => {
    try {
        const transactions = await getRepository(Transaction).find();
        return res.status(200).json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getTransaction = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = req.body.user; // Assuming req.user contains the logged-in user's details
        const transactions = await getRepository(Transaction).findBy( { user});
        return res.status(200).json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}