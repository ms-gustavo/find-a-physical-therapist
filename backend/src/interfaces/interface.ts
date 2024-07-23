import { IUser } from "../models/User";

export interface FindUserResponse {
  status: number;
  message: string;
}

export interface FindUserSuccessResponse extends FindUserResponse {
  user: IUser;
}

export interface FindUserRegisterResponse extends FindUserResponse {}

export type FindUserResult = FindUserSuccessResponse | FindUserRegisterResponse;
