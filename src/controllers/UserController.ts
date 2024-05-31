// src/controllers/userController.ts

import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";
const bcrypt = require('bcrypt');
import { validate } from "class-validator";
import { generateToken } from "../utils/jwt";

export const getUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userRepository = getRepository(User);
    const userId = parseInt(req.params.id);
    const user = await userRepository.findOneOrFail({where : {id: userId}});
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(404).json({ message: "User not found" });
  }
}

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userRepository = getRepository(User);
    const users = await userRepository.find();

    // check if user isn't empty
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {

  try{
    const { firstName,lastName, email, password } = req.body;
    const user = new User();
     // Validate user input
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    const errors = await validate(user);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }


    // Check if user with the same email already exists
    const userRepository = getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with hashed password
    const newUser = userRepository.create({
      firstName,
      lastName,
      email,
      password:hashedPassword
    })

    await userRepository.save(newUser)

    return res.status(201).json({message: "User Created Successfully",newUser})
  } catch( error){
    console.error('Error occured creating user',error)
    return res.status(500).json({message:"Internal Server error"})
  }
  
  

};

export const loginUser = async (req: Request, res: Response): Promise<Response> => {

  try{
    const { email, password } = req.body;
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }


    const token = generateToken(user.id);

    return res.status(200).json({ token, user });
  } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({ message: "Internal server error" });
  }

}
