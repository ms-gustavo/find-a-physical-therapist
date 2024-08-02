import request from "supertest";
import app from "../src/index";
import "../src/setupTests";
import {
  clientApi,
  clientInvalidEmailAddress,
  clientMessages,
  mockClientLogin,
  mockTherapistLogin,
  newClient,
  newTherapist,
  nonExistentUser,
  therapistApi,
  therapistInvalidEmailAddress,
  therapistMessages,
  userMessages,
} from "../testsMocks/authControllerMocks";
import Client from "../src/models/Client";
import { findUser } from "../src/utils/userExists";
import Therapist from "../src/models/Therapist";

let clientToken: string;
let therapistToken: string;

function removeKey(
  obj: {
    [x: string]: any;
    name?: string;
    email?: string;
    password?: string;
    location?: { type: string; coordinates: number[] };
  },
  key: string
) {
  const { [key]: _, ...newObj } = obj;
  return newObj;
}

describe("Auth Controller", () => {
  describe("Auth Controller - Register New Client", () => {
    it("should register a new client successfully", async () => {
      const response = await request(app)
        .post(clientApi.register)
        .send(newClient);
      clientToken = response.body.token;
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("token");
    });

    it("should not register a client with an existing email", async () => {
      await request(app).post(clientApi.register).send(newClient);

      const response = await request(app)
        .post(clientApi.register)
        .send(newClient);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(clientMessages.userAlreadyExists);
    });

    it("should return validation error if name is not provided", async () => {
      const registerWithoutName = removeKey(newClient, "name");

      const response = await request(app)
        .post(clientApi.register)
        .send(registerWithoutName);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(clientMessages.nameIsRequired);
    });

    it("should return validation error if password is not provided", async () => {
      const registerWithoutPassword = removeKey(newClient, "password");

      const response = await request(app)
        .post(clientApi.register)
        .send(registerWithoutPassword);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(clientMessages.passwordIsRequired);
    });

    it("should return validation error if e-mail is not provided", async () => {
      const registerWithoutEmail = removeKey(newClient, "email");

      const response = await request(app)
        .post(clientApi.register)
        .send(registerWithoutEmail);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(clientMessages.emailIsRequired);
    });

    it("should return validation error if e-mail is not an valid email address", async () => {
      const response = await request(app)
        .post(clientApi.register)
        .send(clientInvalidEmailAddress);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(clientMessages.emailInvalid);
    });

    it("should return validation error if location is not provided", async () => {
      const registerWithoutLocation = removeKey(newClient, "location");

      const response = await request(app)
        .post(clientApi.register)
        .send(registerWithoutLocation);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(clientMessages.locationIsRequired);
    });
  });

  describe("Auth Controller - Register new Therapist", () => {
    it("should register a new therapist successfully", async () => {
      const response = await request(app)
        .post(therapistApi.register)
        .send(newTherapist);
      therapistToken = response.body.token;
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("token");
    });

    it("should not register a therapist with an existing email", async () => {
      await request(app).post(therapistApi.register).send(newTherapist);

      const response = await request(app)
        .post(therapistApi.register)
        .send(newTherapist);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(therapistMessages.userAlreadyExists);
    });

    it("should return validation error if name is not provided", async () => {
      const registerWithoutName = removeKey(newTherapist, "name");

      const response = await request(app)
        .post(therapistApi.register)
        .send(registerWithoutName);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(therapistMessages.nameIsRequired);
    });

    it("should return validation error if email is not provided", async () => {
      const registerWithoutEmail = removeKey(newTherapist, "email");

      const response = await request(app)
        .post(therapistApi.register)
        .send(registerWithoutEmail);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(therapistMessages.emailIsRequired);
    });

    it("should return validation error if email is not an valid email address", async () => {
      const response = await request(app)
        .post(therapistApi.register)
        .send(therapistInvalidEmailAddress);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(therapistMessages.emailInvalid);
    });

    it("should return validation error if password is not provided", async () => {
      const registerWithoutPassword = removeKey(newTherapist, "password");

      const response = await request(app)
        .post(therapistApi.register)
        .send(registerWithoutPassword);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(therapistMessages.passwordIsRequired);
    });

    it("should return validation error if mediumCost is not provided", async () => {
      const registerWithoutMediumCost = removeKey(newTherapist, "mediumCost");

      const response = await request(app)
        .post(therapistApi.register)
        .send(registerWithoutMediumCost);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(
        therapistMessages.mediumCostIsRequired
      );
    });

    it("should return validation error if speciality is not provided", async () => {
      const registerWithoutSpeciality = removeKey(newTherapist, "speciality");

      const response = await request(app)
        .post(therapistApi.register)
        .send(registerWithoutSpeciality);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(
        therapistMessages.specialityIsRequired
      );
    });

    it("should return validation error if location is not provided", async () => {
      const registerWithoutLocation = removeKey(newTherapist, "location");

      const response = await request(app)
        .post(therapistApi.register)
        .send(registerWithoutLocation);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(therapistMessages.locationIsRequired);
    });

    it("should return validation error if inscriptionNumber is not provided", async () => {
      const registerWithoutInscriptionNumber = removeKey(
        newTherapist,
        "inscriptionNumber"
      );

      const response = await request(app)
        .post(therapistApi.register)
        .send(registerWithoutInscriptionNumber);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(
        therapistMessages.inscriptionNumberIsRequired
      );
    });
  });

  describe("Auth Controller - Client Login", () => {
    it("should return user if found Client", async () => {
      const spy = jest
        .spyOn(Client, "findOne")
        .mockResolvedValue(mockClientLogin);
      const result = await findUser(
        "testclient@example.com",
        "login",
        "Client"
      );
      expect(result.status).toBe(200);
      expect((result as any).user.email).toBe(mockClientLogin.email);
      expect((result as any).message).toBe(userMessages.foundUser);
      expect(spy).toHaveBeenCalledWith({ email: mockClientLogin.email });

      spy.mockRestore();
    });

    it("should return an token when user login with valid credentials", async () => {
      const response = await request(app).post(clientApi.login).send({
        email: newClient.email,
        password: newClient.password,
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    it("should return an validation error when user try login an nonexistent user", async () => {
      const response = await request(app).post(clientApi.login).send({
        email: nonExistentUser.email,
        password: nonExistentUser.password,
      });
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(userMessages.userNotFound);
    });

    it("should return an validation error when user login with invalid credentials", async () => {
      const response = await request(app)
        .post(clientApi.login)
        .send({
          email: newClient.email,
          password: newClient.password + "1",
        });
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(userMessages.invalidCredentials);
    });

    it("should return an validation error when user login with no email", async () => {
      const loginWithoutEmail = removeKey(mockClientLogin, "email");

      const response = await request(app).post(clientApi.login).send({
        loginWithoutEmail,
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(clientMessages.emailIsRequired);
    });

    it("should return an validation error when user login with invalid email", async () => {
      const response = await request(app).post(clientApi.login).send({
        email: clientInvalidEmailAddress.email,
        password: mockClientLogin.password,
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(clientMessages.emailInvalid);
    });

    it("should return an validation error when user login with with no password", async () => {
      const response = await request(app).post(clientApi.login).send({
        email: mockClientLogin.email,
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(clientMessages.passwordIsRequired);
    });
  });

  describe("Auth Controller - Therapist Login", () => {
    it("should return user if found Therapist", async () => {
      const spy = jest
        .spyOn(Therapist, "findOne")
        .mockResolvedValue(mockTherapistLogin);
      const result = await findUser(
        "newtherapist@example.com",
        "login",
        "Therapist"
      );
      expect(result.status).toBe(200);
      expect((result as any).user.email).toBe(mockTherapistLogin.email);
      expect((result as any).message).toBe(userMessages.foundUser);
      expect(spy).toHaveBeenCalledWith({ email: mockTherapistLogin.email });

      spy.mockRestore();
    });

    it("should return an token when therapist login with valid credentials", async () => {
      const response = await request(app).post(therapistApi.login).send({
        email: newTherapist.email,
        password: newTherapist.password,
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    it("should return an validation error when therapist try login an nonexistent user", async () => {
      const response = await request(app).post(therapistApi.login).send({
        email: nonExistentUser.email,
        password: nonExistentUser.password,
      });
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(userMessages.userNotFound);
    });

    it("should return an validation error when user login with invalid credentials", async () => {
      const response = await request(app)
        .post(therapistApi.login)
        .send({
          email: newTherapist.email,
          password: newTherapist.password + "1",
        });
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(userMessages.invalidCredentials);
    });

    it("should return an validation error when user login with no email", async () => {
      const response = await request(app).post(therapistApi.login).send({
        password: newTherapist.password,
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(therapistMessages.emailIsRequired);
    });

    it("should return an validation error when user login with invalid email", async () => {
      const response = await request(app).post(therapistApi.login).send({
        email: clientInvalidEmailAddress.email,
        password: mockClientLogin.password,
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(therapistMessages.emailInvalid);
    });

    it("should return an validation error when user login with with no password", async () => {
      const response = await request(app).post(therapistApi.login).send({
        email: newTherapist.email,
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(therapistMessages.passwordIsRequired);
    });
  });
});

describe("User Controller - Profile", () => {
  describe("User Controller - Client Profile", () => {
    it("should return user data when requesting user info with a valid token", async () => {
      const response = await request(app)
        .get("/api/users/profile")
        .set("Authorization", `Bearer ${clientToken}`);

      expect(response.status).toBe(200);
      expect(response.body.type).toBe("Client");
    });

    it("should return an error when requesting user info with a invalid token", async () => {
      const response = await request(app)
        .get("/api/users/profile")
        .set("Authorization", `Bearer invalidToken`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Token inválido");
    });

    it("should update client informations", async () => {
      const response = await request(app)
        .put("/api/users/client/profile")
        .set("Authorization", `Bearer ${clientToken}`)
        .send({
          name: "Update Client Test",
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("updatedUser");
      expect(response.body.updatedUser).toHaveProperty(
        "name",
        "Update Client Test"
      );
    });
  });

  describe("User Controller - Therapist Profile", () => {
    it("should return therapist data when requesting user info with a valid token", async () => {
      const response = await request(app)
        .get("/api/users/profile")
        .set("Authorization", `Bearer ${therapistToken}`);

      expect(response.status).toBe(200);
      expect(response.body.type).toBe("Therapist");
    });

    it("should return an error when requesting user info with a invalid token", async () => {
      const response = await request(app)
        .get("/api/users/profile")
        .set("Authorization", `Bearer invalidToken`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Token inválido");
    });

    it("should update therapist informations", async () => {
      const response = await request(app)
        .put("/api/users/therapist/profile")
        .set("Authorization", `Bearer ${therapistToken}`)
        .send({
          name: "Update Therapist Test",
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("updatedUser");
      expect(response.body.updatedUser).toHaveProperty(
        "name",
        "Update Therapist Test"
      );
    });
  });
});
