import { Request, Response } from "express";
import { AuthenticatedRequest } from "../interfaces/interface";
import Review from "../models/Review";
import { therapistExists } from "../utils/findClientOrTherapist";
import { serverMessagesResponses } from "../utils/serverMessagesResponses";

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - therapistId
 *         - rating
 *         - comment
 *       properties:
 *         therapistId:
 *           type: string
 *           description: ID do terapeuta
 *         rating:
 *           type: number
 *           description: Avaliação do terapeuta
 *         comment:
 *           type: string
 *           description: Comentário sobre o terapeuta
 *       example:
 *         therapistId: 60d0fe4f5311236168a109ca
 *         rating: 5
 *         comment: Excelente terapeuta!
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Cria uma nova avaliação
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Terapeuta não encontrado
 *       500:
 *         description: Erro no servidor
 */
export const createAReview = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { therapistId, rating, comment } = req.body;

  try {
    const therapistExist = await therapistExists(therapistId);
    if (
      (therapistExist as { success: boolean; message: string }).success ===
      false
    ) {
      return res
        .status(404)
        .json(
          (therapistExist as { success: boolean; message: string }).message
        );
    }

    const newReview = new Review({
      clientId: req.user!._id,
      therapistId,
      rating,
      comment,
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: serverMessagesResponses.internalServerError });
    console.error(error.message);
  }
};

export const getIndividualReview = async (req: Request, res: Response) => {
  const { therapistId } = req.params;

  try {
    const reviews = await Review.find({ therapistId }).populate(
      "clientId",
      "name"
    );

    if (reviews.length === 0) {
      return res
        .status(204)
        .json({ message: serverMessagesResponses.noReviewsFound });
    }
    res.status(200).json({ reviews });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: serverMessagesResponses.internalServerError });
    console.error(error.message);
  }
};
