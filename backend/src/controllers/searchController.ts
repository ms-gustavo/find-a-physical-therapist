import { Request, Response } from "express";
import Therapist from "../models/Therapist";
import { serverMessagesResponses } from "../utils/serverMessagesResponses";
import { paginate } from "../utils/paginate";

export const getTherapistById = async (req: Request, res: Response) => {
  const { therapistId } = req.params;

  try {
    const therapist = await Therapist.findById(therapistId).lean();

    if (!therapist) {
      return res
        .status(404)
        .json({ message: serverMessagesResponses.therapistNotFound });
    }
    const { password, ...therapistWithoutPassword } = therapist;
    res.status(200).json(therapistWithoutPassword);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: serverMessagesResponses.internalServerError });
    console.error(error.message);
  }
};

export const getAllTherapists = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    const pagination = await paginate(
      Therapist,
      {},
      page as string,
      limit as string
    );

    const therapists = await Therapist.find({})
      .skip(pagination.skip)
      .limit(pagination.limit);

    if (therapists.length === 0) {
      return res.status(204).json();
    }

    const therapistsWithoutPassword = therapists.map((therapist) => {
      const { password, ...therapistWithoutPassword } = therapist.toObject();
      return therapistWithoutPassword;
    });

    res.status(200).json({
      total: pagination.totalDocuments,
      page: pagination.page,
      limit: pagination.limit,
      totalPages: pagination.totalPages,
      therapists: therapistsWithoutPassword,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: serverMessagesResponses.internalServerError });
    console.error(error.message);
  }
};

export const searchTherapistByName = async (req: Request, res: Response) => {
  const { name, page = 1, limit = 5 } = req.query;
  try {
    const query: any = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }
    const pagination = await paginate(
      Therapist,
      query,
      page as string,
      limit as string
    );
    const therapists = await Therapist.find(query)
      .skip(pagination.skip)
      .limit(pagination.limit);
    if (therapists.length === 0) {
      return res.status(204).json();
    }

    const therapistsWithoutPassword = therapists.map((therapist) => {
      const { password, ...therapistWithoutPassword } = therapist.toObject();
      return therapistWithoutPassword;
    });

    res.status(200).json({
      total: pagination.totalDocuments,
      totalPages: pagination.totalPages,
      page: pagination.page,
      limit: pagination.limit,
      therapists: therapistsWithoutPassword,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: serverMessagesResponses.internalServerError });
    console.error(error.message);
  }
};

export const searchTherapistsByQuery = async (req: Request, res: Response) => {
  const {
    location,
    speciality,
    maxDistance,
    minCost,
    maxCost,
    page = 1,
    limit = 5,
  } = req.query;
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

    const pageNumber = parseInt(page as string, 10) || 1;
    const limitNumber = parseInt(limit as string, 10) || 5;
    const skip = (pageNumber - 1) * limitNumber;

    let totalDocuments = 0;
    let totalPages = 0;

    const aggregationPipeline: any[] = [];

    if (location) {
      const [lng, lat] = (location as string).split(",").map(Number);
      const distance = maxDistance ? parseInt(maxDistance as string) : 5000;

      aggregationPipeline.push({
        $geoNear: {
          includeLocs: "location",
          distanceField: "distance",
          near: { type: "Point", coordinates: [lat, lng] },
          maxDistance: distance,
          spherical: true,
        },
      });

      aggregationPipeline.push({ $match: query });
      const countPipeline = [...aggregationPipeline, { $count: "total" }];
      const countResult = await Therapist.aggregate(countPipeline).exec();
      totalDocuments = countResult[0]?.total || 0;
      totalPages = Math.ceil(totalDocuments / limitNumber);

      aggregationPipeline.push({ $skip: skip }, { $limit: limitNumber });
    } else {
      aggregationPipeline.push({ $match: query });

      totalDocuments = await Therapist.countDocuments(query);
      totalPages = Math.ceil(totalDocuments / limitNumber);

      aggregationPipeline.push({ $skip: skip }, { $limit: limitNumber });
    }

    const therapists = await Therapist.aggregate(aggregationPipeline).exec();
    if (therapists.length === 0) {
      return res.status(204).json();
    }

    const therapistsWithoutPassword = therapists.map((therapist) => {
      const { password, ...therapistWithoutPassword } = therapist;
      return therapistWithoutPassword;
    });

    res.status(200).json({
      total: totalDocuments,
      totalPages,
      page: pageNumber,
      limit: limitNumber,
      therapists: therapistsWithoutPassword,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: serverMessagesResponses.internalServerError });
    console.error(error.message);
  }
};
