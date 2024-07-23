import { Request, Response } from "express";
import User from "../models/User";

export const getAllTherapists = async (req: Request, res: Response) => {
  try {
    const therapists = await User.find({ role: "THERAPIST" }).select(
      "-password"
    );
    res.status(200).json({ therapists });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const searchTherapistByName = async (req: Request, res: Response) => {
  const { name } = req.query;
  try {
    const query: any = { role: "THERAPIST" };

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    const therapists = await User.find(query).select("-password");
    res.status(200).json({ therapists });
  } catch (error: any) {}
};

export const searchTherapists = async (req: Request, res: Response) => {
  const { location, speciality, maxDistance, minCost, maxCost } = req.query;

  try {
    const query: any = { role: "THERAPIST" };

    if (speciality) {
      query.speciality = speciality;
    }

    if (maxDistance) {
      query.maxDistance = maxDistance;
    }

    if (minCost || maxCost) {
      query.cost = {};
      if (minCost) query.cost.$gte = parseFloat(minCost as string);
      if (maxCost) query.cost.$lte = parseFloat(maxCost as string);
    }

    if (location) {
      const [lng, lat] = (location as string).split(",").map(Number);
      query.location = {
        $near: {
          $geometry: { type: "Point", coordinates: [lng, lat] },
          $maxDistance: maxDistance ? maxDistance : 5000,
        },
      };
    }

    const therapists = await User.find(query).select("-password");
    res.status(200).json({ therapists });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
