// src/routes/userRoutes.ts

import { Router } from "express";
import { getAllUsers, createUser,getUser,loginUser } from "../controllers/UserController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticateJWT, getAllUsers);
router.get("/:id",authenticateJWT, getUser);
router.post("/", createUser);
router.post("/login", loginUser);


export default router;
