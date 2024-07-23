import {
  FindUserRegisterResponse,
  FindUserResult,
  FindUserSuccessResponse,
} from "../interfaces/interface";
import User, { IUser } from "../models/User";

export async function findUser(
  email: string,
  type: "register" | "login"
): Promise<FindUserResult> {
  const user = await User.findOne({ email });

  const responseMap = {
    register: {
      userExists: {
        status: 400,
        message: "User already exists",
      } as FindUserRegisterResponse,
    },
    login: {
      userExists: {
        status: 200,
        message: "User found",
        user: user as IUser,
      } as FindUserSuccessResponse,
      userNotFound: {
        status: 404,
        message: "User not found",
      } as FindUserRegisterResponse,
    },
  };

  if (type === "register") {
    return user
      ? responseMap.register.userExists
      : ({
          status: 200,
          message: "Proceed with registration",
        } as FindUserRegisterResponse);
  } else {
    return user ? responseMap.login.userExists : responseMap.login.userNotFound;
  }
}
