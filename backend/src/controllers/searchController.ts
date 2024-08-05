import { Request, Response } from "express";
import Therapist from "../models/Therapist";
import { serverMessagesResponses } from "../utils/serverMessagesResponses";

export const getTherapistById = async (req: Request, res: Response) => {
  const { therapistId } = req.params;

  try {
    const therapist = await Therapist.findById(therapistId).select("-password");

    if (!therapist) {
      return res
        .status(404)
        .json({ message: serverMessagesResponses.therapistNotFound });
    }

    res.status(200).json(therapist);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: serverMessagesResponses.internalServerError });
    console.error(error.message);
  }
};

export const getAllTherapists = async (req: Request, res: Response) => {
  try {
    const therapists = await Therapist.find({});
    if (therapists.length === 0) {
      return res.status(204).json();
    }

    const therapistsWithoutPassword = therapists.map((therapist) => {
      const { password, ...therapistWithoutPassword } = therapist.toObject();
      return therapistWithoutPassword;
    });

    res.status(200).json({ therapists: therapistsWithoutPassword });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: serverMessagesResponses.internalServerError });
    console.error(error.message);
  }
};

export const searchTherapistByName = async (req: Request, res: Response) => {
  const { name } = req.query;
  try {
    const query: any = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    const therapists = await Therapist.find(query);
    if (therapists.length === 0) {
      return res.status(204).json();
    }

    const therapistsWithoutPassword = therapists.map((therapist) => {
      const { password, ...therapistWithoutPassword } = therapist.toObject();
      return therapistWithoutPassword;
    });

    res.status(200).json({ therapists: therapistsWithoutPassword });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: serverMessagesResponses.internalServerError });
    console.error(error.message);
  }
};

export const searchTherapistsByQuery = async (req: Request, res: Response) => {
  const { location, speciality, maxDistance, minCost, maxCost } = req.query;

  try {
    const query: any = {};

    if (speciality) {
      query.speciality = { $in: [speciality] };
    }

    if (minCost || maxCost) {
      query.mediumCost = {};
      if (minCost) query.mediumCost.$gte = parseFloat(minCost as string);
      if (maxCost) query.mediumCost.$lte = parseFloat(maxCost as string);
    }

    if (location) {
      const [lng, lat] = (location as string).split(",").map(Number);
      const distance = maxDistance ? parseInt(maxDistance as string) : 5000;
      query.location = {
        $near: {
          $geometry: { type: "Point", coordinates: [lng, lat] },
          $maxDistance: distance,
        },
      };
    }
    const therapists = await Therapist.find(query);
    if (therapists.length === 0) {
      return res.status(204).json();
    }

    const therapistsWithoutPassword = therapists.map((therapist) => {
      const { password, ...therapistWithoutPassword } = therapist.toObject();
      return therapistWithoutPassword;
    });

    res.status(200).json({ therapists: therapistsWithoutPassword });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: serverMessagesResponses.internalServerError });
    console.error(error.message);
  }
};
