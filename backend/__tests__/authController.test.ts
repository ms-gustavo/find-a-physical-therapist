import request from "supertest";
import app from "../src/index";
import "../src/setupTests";
import {
  clientApi,
  clientInvalidEmailAddress,
  clientMessages,
  newClient,
  newTherapist,
  therapistApi,
  therapistInvalidEmailAddress,
  therapistMessages,
} from "../testsMocks/authControllerMocks";

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

describe("Auth Controller - Register New Client", () => {
  it("should register a new client successfully", async () => {
    const response = await request(app)
      .post(clientApi.register)
      .send(newClient);

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
    expect(response.body.message).toBe(therapistMessages.mediumCostIsRequired);
  });

  it("should return validation error if speciality is not provided", async () => {
    const registerWithoutSpeciality = removeKey(newTherapist, "speciality");

    const response = await request(app)
      .post(therapistApi.register)
      .send(registerWithoutSpeciality);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(therapistMessages.specialityIsRequired);
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
