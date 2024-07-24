import { Model } from "mongoose";
import {
  FindUserRegisterResponse,
  FindUserResult,
  FindUserSuccessResponse,
} from "../interfaces/interface";
import Client, { IClient } from "../models/Client";
import Therapist, { ITherapist } from "../models/Therapist";
import { serverMessagesResponses } from "./serverMessagesResponses";

type UserType = "Client" | "Therapist";

export async function findUser(
  email: string,
  type: "register" | "login",
  userType: UserType
): Promise<FindUserResult> {
  const model: Model<IClient | ITherapist> =
    userType === "Client"
      ? (Client as unknown as Model<IClient | ITherapist>)
      : (Therapist as unknown as Model<IClient | ITherapist>);

  const user = (await model.findOne({ email }).exec()) as
    | (IClient & Document)
    | (ITherapist & Document)
    | null;

  const responseMap = {
    register: {
      userExists: {
        status: 400,
        message: serverMessagesResponses.userAlreadyExists,
      } as FindUserRegisterResponse,
    },
    login: {
      userExists: {
        status: 200,
        message: serverMessagesResponses.userFound,
        user: user as IClient | ITherapist,
      } as FindUserSuccessResponse,
      userNotFound: {
        status: 404,
        message: serverMessagesResponses.userNotFound,
      } as FindUserRegisterResponse,
    },
  };

  if (type === "register") {
    return user
      ? responseMap.register.userExists
      : ({
          status: 200,
          message: serverMessagesResponses.proceedWithRegistration,
        } as FindUserRegisterResponse);
  } else {
    return user ? responseMap.login.userExists : responseMap.login.userNotFound;
  }
}
