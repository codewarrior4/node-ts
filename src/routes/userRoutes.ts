// src/routes/userRoutes.ts

import { Router } from "express";
import { getAllUsers, createUser,getUser,loginUser } from "../controllers/UserController";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.post("/login", loginUser);


export default router;
