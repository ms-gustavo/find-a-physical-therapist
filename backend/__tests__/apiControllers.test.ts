import request from "supertest";
import app from "../src/index";
import "../src/setupTests";
import {
  clientApi,
  clientInvalidEmailAddress,
  clientMessages,
  consultApi,
  consultMessages,
  createNewReview,
  mockClientLogin,
  mockTherapistLogin,
  newClient,
  newQueryTherapist,
  newTherapist,
  nonExistentUser,
  reviewApi,
  reviewMessages,
  searchApi,
  therapistApi,
  therapistInvalidEmailAddress,
  therapistInvalidPhoneNumber,
  therapistMessages,
  userMessages,
  usersApi,
} from "../testsMocks/apiControllersMocks";
import Client from "../src/models/Client";
import { findUser } from "../src/utils/userExists";
import Therapist from "../src/models/Therapist";
import { formatDate } from "../src/utils/formatDate";

let clientToken: string;
let clientId: any;
let therapistToken: string;
let therapistId: any;

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
      clientId = response.body.id;
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
      therapistId = response.body.therapist.id;
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

    it("should return validation error if phoneNumber is not provided", async () => {
      const registerWithoutPhoneNumber = removeKey(newTherapist, "phoneNumber");

      const response = await request(app)
        .post(therapistApi.register)
        .send(registerWithoutPhoneNumber);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(
        therapistMessages.phoneNumberIsRequired
      );
    });

    it("should return validation error if phoneNumber dont have 11 characteres", async () => {
      const response = await request(app)
        .post(therapistApi.register)
        .send(therapistInvalidPhoneNumber);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(
        therapistMessages.phoneNumbeMustHave11Characteres
      );
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

describe("User Controller", () => {
  describe("User Controller - Client Profile", () => {
    it("should return user data when requesting user info with a valid token", async () => {
      const response = await request(app)
        .get(usersApi.profile)
        .set("Authorization", `Bearer ${clientToken}`);

      expect(response.status).toBe(200);
      expect(response.body.type).toBe("Client");
    });

    it("should return an error when requesting user info with a invalid token", async () => {
      const response = await request(app)
        .get(usersApi.profile)
        .set("Authorization", `Bearer invalidToken`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Token inválido");
    });

    it("should update client informations", async () => {
      const response = await request(app)
        .put(clientApi.profile)
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
        .get(usersApi.profile)
        .set("Authorization", `Bearer ${therapistToken}`);

      expect(response.status).toBe(200);
      expect(response.body.type).toBe("Therapist");
    });

    it("should return an error when requesting user info with a invalid token", async () => {
      const response = await request(app)
        .get(usersApi.profile)
        .set("Authorization", `Bearer invalidToken`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Token inválido");
    });

    it("should update therapist informations", async () => {
      const response = await request(app)
        .put(therapistApi.profile)
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

describe("Search Controller", () => {
  describe("Search Controller - Get All Therapists", () => {
    it("should return all therapists list", async () => {
      const response = await request(app).get(searchApi.getAllTherapists);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("therapists");
      expect(Array.isArray(response.body.therapists)).toBe(true);
      expect(response.body.therapists).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            location: expect.any(Object),
            _id: expect.any(String),
            name: expect.any(String),
            email: expect.any(String),
            phoneNumber: expect.any(String),
            mediumCost: expect.any(Number),
            speciality: expect.any(Array),
            inscriptionNumber: expect.any(String),
          }),
        ])
      );
    });
  });

  describe("Search Controller - Get Therapist By Name", () => {
    it("should return therapist list filtered by name", async () => {
      const response = await request(app).get(searchApi.searchByName).query({
        name: "Therapist",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("therapists");
      expect(Array.isArray(response.body.therapists)).toBe(true);

      response.body.therapists.forEach((therapist: any) => {
        expect(therapist).toHaveProperty("name");
        expect(therapist.name).toContain("Therapist");
      });
    });
  });

  describe("Search Controller - Get Therapist By Query", () => {
    it("should return therapist list filtered by query 'speciality: Speciality Test'", async () => {
      await request(app).post(therapistApi.register).send(newQueryTherapist);
      const response = await request(app).get("/api/search/therapists").query({
        speciality: "Speciality Test",
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("therapists");
      expect(Array.isArray(response.body.therapists)).toBe(true);
      response.body.therapists.forEach((therapist: any) => {
        expect(therapist).toHaveProperty("speciality");
        expect(therapist.speciality).toContain("Speciality Test");
        expect(therapist).toHaveProperty("name");
        expect(therapist.name).toBe("Therapist Search By Query Test");
      });
    });

    it("should return therapist list filtered by query 'maxCost: 250'", async () => {
      const response = await request(app).get(searchApi.searchByQuery).query({
        maxCost: 250,
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("therapists");
      expect(Array.isArray(response.body.therapists)).toBe(true);
      response.body.therapists.forEach((therapist: any) => {
        expect(therapist).toHaveProperty("mediumCost");
        expect(therapist.mediumCost).toBe(newTherapist.mediumCost);
        expect(therapist.name).toBe("Update Therapist Test");
      });
    });
  });

  describe("Search Controller - Get Therapist By Id", () => {
    it("should return a therapist filtered by id", async () => {
      const response = await request(app).get(
        `${searchApi.searchById}${therapistId}`
      );
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("email");
      expect(response.body.email).toBe(newTherapist.email);
    });
  });
});

describe("Review Controller", () => {
  describe("Review Controller - Create a review", () => {
    it("should create a new review", async () => {
      const authenticateClientResponse = await request(app)
        .get(usersApi.profile)
        .set("Authorization", `Bearer ${clientToken}`);

      expect(authenticateClientResponse.status).toBe(200);
      expect(authenticateClientResponse.body.type).toBe("Client");

      const findTherapistId = await request(app).get(
        `${searchApi.searchById}${therapistId}`
      );
      expect(findTherapistId.status).toBe(200);

      const createAReviewResponse = await request(app)
        .post(reviewApi.create)
        .set("Authorization", `Bearer ${clientToken}`)
        .send({
          clientId: clientId,
          therapistId: therapistId,
          ...createNewReview,
        });

      expect(createAReviewResponse.status).toBe(201);
      expect(createAReviewResponse.body).toHaveProperty("rating");
      expect(createAReviewResponse.body.rating).toBe(createNewReview.rating);
      expect(createAReviewResponse.body).toHaveProperty("comment");
      expect(createAReviewResponse.body.comment).toBe(createNewReview.comment);
    });

    it("should return a validation error if is missing rating or rating < 1 and > 5", async () => {
      const authenticateClientResponse = await request(app)
        .get(usersApi.profile)
        .set("Authorization", `Bearer ${clientToken}`);

      expect(authenticateClientResponse.status).toBe(200);
      expect(authenticateClientResponse.body.type).toBe("Client");

      const findTherapistId = await request(app).get(
        `${searchApi.searchById}${therapistId}`
      );
      expect(findTherapistId.status).toBe(200);

      const createAReviewResponseWithoutRating = await request(app)
        .post("/api/review/create")
        .set("Authorization", `Bearer ${clientToken}`)
        .send({
          clientId: clientId,
          therapistId: therapistId,
          comment: createNewReview.comment,
        });
      expect(createAReviewResponseWithoutRating.status).toBe(400);
      expect(createAReviewResponseWithoutRating.body).toHaveProperty("message");
      expect(createAReviewResponseWithoutRating.body.message).toBe(
        reviewMessages.ratingIsRequired
      );

      const createAReviewResponseWithRatingLowerThanOne = await request(app)
        .post("/api/review/create")
        .set("Authorization", `Bearer ${clientToken}`)
        .send({
          clientId: clientId,
          therapistId: therapistId,
          rating: 0,
        });
      expect(createAReviewResponseWithRatingLowerThanOne.status).toBe(400);
      expect(createAReviewResponseWithRatingLowerThanOne.body).toHaveProperty(
        "message"
      );
      expect(createAReviewResponseWithRatingLowerThanOne.body.message).toBe(
        reviewMessages.minRating
      );

      const createAReviewResponseWithRatingGreaterThanFive = await request(app)
        .post("/api/review/create")
        .set("Authorization", `Bearer ${clientToken}`)
        .send({
          clientId: clientId,
          therapistId: therapistId,
          rating: 6,
        });
      expect(createAReviewResponseWithRatingGreaterThanFive.status).toBe(400);
      expect(
        createAReviewResponseWithRatingGreaterThanFive.body
      ).toHaveProperty("message");
      expect(createAReviewResponseWithRatingGreaterThanFive.body.message).toBe(
        reviewMessages.maxRating
      );
    });
  });

  describe("Review Controller - Get a review by therapistId", () => {
    it("should return all reviews from an therapist", async () => {
      const response = await request(app).get(
        `${reviewApi.getReviews}${therapistId}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("reviews");
      expect(Array.isArray(response.body.reviews)).toBe(true);
      expect(response.body.reviews).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _id: expect.any(String),
            clientId: expect.any(Object),
            therapistId: expect.any(String),
            rating: expect.any(Number),
            comment: expect.any(String),
            createdAt: expect.any(String),
          }),
        ])
      );
    });
  });
});

describe("Consult Controller", () => {
  let actualDate = new Date();
  describe("Consult Controller - Create a Consult", () => {
    it("should create a new consult", async () => {
      const authenticateClientResponse = await request(app)
        .get(usersApi.profile)
        .set("Authorization", `Bearer ${clientToken}`);

      expect(authenticateClientResponse.status).toBe(200);
      expect(authenticateClientResponse.body.type).toBe("Client");

      const findTherapistId = await request(app).get(
        `${searchApi.searchById}${therapistId}`
      );
      expect(findTherapistId.status).toBe(200);

      const createAConsultResponse = await request(app)
        .post(consultApi.create)
        .set("Authorization", `Bearer ${clientToken}`)
        .send({
          clientId,
          therapistId,
          datetime: actualDate,
        });
      expect(createAConsultResponse.status).toBe(201);
      expect(createAConsultResponse.body).toHaveProperty("savedConsultation");
      expect(createAConsultResponse.body.savedConsultation).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          clientId: expect.any(String),
          therapistId: expect.any(String),
          date: expect.any(String),
          time: expect.any(String),
          status: expect.any(String),
        })
      );
      expect(createAConsultResponse.body.savedConsultation.status).toBe(
        "scheduled"
      );
    });

    it("should return an validation error if consult already exists", async () => {
      const authenticateClientResponse = await request(app)
        .get(usersApi.profile)
        .set("Authorization", `Bearer ${clientToken}`);

      expect(authenticateClientResponse.status).toBe(200);
      expect(authenticateClientResponse.body.type).toBe("Client");

      const findTherapistId = await request(app).get(
        `${searchApi.searchById}${therapistId}`
      );
      expect(findTherapistId.status).toBe(200);

      const createAConsultResponse = await request(app)
        .post(consultApi.create)
        .set("Authorization", `Bearer ${clientToken}`)
        .send({
          clientId,
          therapistId,
          datetime: actualDate,
        });
      expect(createAConsultResponse.status).toBe(409);
      expect(createAConsultResponse.body).toHaveProperty("message");
      expect(createAConsultResponse.body.message).toBe(
        consultMessages.consultAlreadyExists
      );
    });
  });

  describe("Consult Controller - Get Consult By Date", () => {
    it("should return all consults in provided date", async () => {
      const authenticateClientResponse = await request(app)
        .get(usersApi.profile)
        .set("Authorization", `Bearer ${therapistToken}`);

      expect(authenticateClientResponse.status).toBe(200);
      expect(authenticateClientResponse.body.type).toBe("Therapist");

      const { date } = formatDate(actualDate);

      const getConsultByDateResponse = await request(app)
        .get(consultApi.getByDate)
        .set("Authorization", `Bearer ${therapistToken}`)
        .query({
          therapistId: therapistId,
          date: date,
        });

      expect(getConsultByDateResponse.status).toBe(200);
      expect(getConsultByDateResponse.body).toHaveProperty("consultations");
      expect(Array.isArray(getConsultByDateResponse.body.consultations)).toBe(
        true
      );
      expect(
        getConsultByDateResponse.body.consultations.length
      ).toBeGreaterThanOrEqual(1);
      expect(getConsultByDateResponse.body.consultations).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _id: expect.any(String),
            clientId: expect.any(String),
            therapistId: expect.any(String),
            date: expect.any(String),
            time: expect.any(String),
            status: expect.any(String),
          }),
        ])
      );
    });
  });

  describe("Consult Controller - Get Client Consult History", () => {
    it("should return all consults from a client", async () => {
      const authenticateClientResponse = await request(app)
        .get(usersApi.profile)
        .set("Authorization", `Bearer ${clientToken}`);

      expect(authenticateClientResponse.status).toBe(200);
      expect(authenticateClientResponse.body.type).toBe("Client");

      const getConsultHistoryResponse = await request(app)
        .get(consultApi.getHistory)
        .set("Authorization", `Bearer ${clientToken}`);

      expect(getConsultHistoryResponse.status).toBe(200);
      expect(getConsultHistoryResponse.body).toHaveProperty("consultations");
      expect(Array.isArray(getConsultHistoryResponse.body.consultations)).toBe(
        true
      );
      expect(getConsultHistoryResponse.body.consultations).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _id: expect.any(String),
            clientId: expect.any(String),
            therapistId: expect.any(Object),
            date: expect.any(String),
            time: expect.any(String),
            status: expect.any(String),
          }),
        ])
      );
    });
  });
});
