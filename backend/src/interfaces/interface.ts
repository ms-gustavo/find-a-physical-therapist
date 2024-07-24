import { Request } from "express";
import { IClient } from "../models/Client";
import { ITherapist } from "../models/Therapist";

export interface FindUserResponse {
  status: number;
  message: string;
}

export interface FindUserSuccessResponse extends FindUserResponse {
  user: IClient | ITherapist;
}

export interface FindUserRegisterResponse extends FindUserResponse {}

export type FindUserResult = FindUserSuccessResponse | FindUserRegisterResponse;

export interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
  };
}
