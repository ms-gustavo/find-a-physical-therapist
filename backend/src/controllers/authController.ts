import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { findUser } from "../utils/userExists";
import { FindUserSuccessResponse } from "../interfaces/interface";
import { serverMessagesResponses } from "../utils/serverMessagesResponses";

export const registerNewUser = async (req: Request, res: Response) => {
  const { name, email, password, role, speciality, location }: IUser = req.body;

  try {
    const userCheck = await findUser(email, "register");
    if (userCheck.status !== 200) {
      return res.status(userCheck.status).json({ message: userCheck.message });
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
    res
      .status(500)
      .json({ message: serverMessagesResponses.somethingWentWrong });
    console.error(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    const userCheck = await findUser(email, "login");
    if (userCheck.status !== 200) {
      return res.status(userCheck.status).json({ message: userCheck.message });
    }
    const user = (userCheck as FindUserSuccessResponse).user;

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(404)
        .json({ message: serverMessagesResponses.invalidCredentials });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!
    );
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        speciality: user.speciality,
        location: user.location,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: serverMessagesResponses.somethingWentWrong });
    console.error(error);
  }
};
