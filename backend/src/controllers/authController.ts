import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Client, { IClient } from "../models/Client";
import { findUser } from "../utils/userExists";
import { FindUserSuccessResponse } from "../interfaces/interface";
import { serverMessagesResponses } from "../utils/serverMessagesResponses";
import Therapist, { ITherapist } from "../models/Therapist";
import { isTherapist } from "../utils/typeGuards";

export const registerNewClient = async (req: Request, res: Response) => {
  const { name, email, password, location }: IClient = req.body;

  try {
    const userCheck = await findUser(email, "register", "Client");
    if (userCheck.status !== 200) {
      return res.status(userCheck.status).json({ message: userCheck.message });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const emailToLowerCase = email.toLowerCase();
    const newUser: IClient = new Client({
      name,
      email: emailToLowerCase,
      password: hashedPassword,
      location,
    });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!);
    res.status(201).json({
      token,
      user: { id: newUser._id, name, email, location },
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: serverMessagesResponses.internalServerError });
    console.error(error.message);
  }
};

export const loginClient = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;
  try {
    const userCheck = await findUser(email, "login", "Client");
    if (userCheck.status !== 200) {
      return res.status(userCheck.status).json({ message: userCheck.message });
    }
    const user = (userCheck as FindUserSuccessResponse).user;
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ message: serverMessagesResponses.invalidCredentials });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        location: user.location,
      },
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: serverMessagesResponses.internalServerError });
    console.error(error.message);
  }
};

export const registerNewTherapist = async (req: Request, res: Response) => {
  const {
    name,
    email,
    password,
    phoneNumber,
    mediumCost,
    speciality,
    location,
    inscriptionNumber,
  }: ITherapist = req.body;

  try {
    const userCheck = await findUser(email, "register", "Therapist");
    if (userCheck.status !== 200) {
      return res.status(userCheck.status).json({ message: userCheck.message });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const emailToLowerCase = email.toLowerCase();
    const newTherapist: ITherapist = new Therapist({
      name,
      email: emailToLowerCase,
      password: hashedPassword,
      phoneNumber,
      mediumCost,
      speciality,
      location,
      inscriptionNumber,
    });
    await newTherapist.save();

    const token = jwt.sign({ id: newTherapist._id }, process.env.JWT_SECRET!);
    res.status(201).json({
      token,
      therapist: {
        id: newTherapist._id,
        name,
        email,
        phoneNumber,
        mediumCost,
        speciality,
        location,
        inscriptionNumber,
      },
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: serverMessagesResponses.internalServerError });
    console.error(error.message);
  }
};

export const loginTherapist = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    const userCheck = await findUser(email, "login", "Therapist");
    if (userCheck.status !== 200) {
      return res.status(userCheck.status).json({ message: userCheck.message });
    }
    const therapist = (userCheck as FindUserSuccessResponse).user;

    if (!isTherapist(therapist)) {
      return res
        .status(500)
        .json({ message: serverMessagesResponses.internalServerError });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      therapist.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ message: serverMessagesResponses.invalidCredentials });
    }

    const token = jwt.sign({ id: therapist._id }, process.env.JWT_SECRET!);
    res.status(200).json({
      token,
      therapist: {
        id: therapist._id,
        name: therapist.name,
        email: therapist.email,
        phoneNumber: therapist.phoneNumber,
        mediumCost: therapist.mediumCost,
        speciality: therapist.speciality,
        location: therapist.location,
        inscriptionNumber: therapist.inscriptionNumber,
      },
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: serverMessagesResponses.internalServerError });
    console.error(error.message);
  }
};
