import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

export const registerNewUser = async (req: Request, res: Response) => {
  const { name, email, password, role, speciality, location }: IUser = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: `User already exists` });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser: IUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      speciality: role === "THERAPIST" ? speciality : undefined,
      location: role === "THERAPIST" ? location : undefined,
    });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET!
    );
    res.status(201).json({
      token,
      user: { id: newUser._id, name, email, role, speciality, location },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.error(error);
  }
};
