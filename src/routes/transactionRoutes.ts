import {Router} from "express";
import { getAllTransactions, getTransaction, createTransaction } from "./../controllers/TransactionController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticateJWT, getAllTransactions);
router.get("/:id",authenticateJWT, getTransaction);
router.post("/", createTransaction);


export default router