import {
  FindUserRegisterResponse,
  FindUserResult,
  FindUserSuccessResponse,
} from "../interfaces/interface";
import User, { IUser } from "../models/User";
import { serverMessagesResponses } from "./serverMessagesResponses";

export async function findUser(
  email: string,
  type: "register" | "login"
): Promise<FindUserResult> {
  const user = await User.findOne({ email });

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
        user: user as IUser,
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
