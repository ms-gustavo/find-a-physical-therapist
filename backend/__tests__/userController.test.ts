import request from "supertest";
import app from "../src/index";
import {
  clientApi,
  newClient,
  newTherapist,
  therapistApi,
} from "../testsMocks/authControllerMocks";

describe("User Controller - Profile", () => {
  let clientToken: string;
  let therapistToken: string;

  beforeAll(async () => {
    const clientResponse = await request(app)
      .post(clientApi.register)
      .send(newClient);
    clientToken = clientResponse.body.token;

    const therapistResponse = await request(app)
      .post(therapistApi.register)
      .send(newTherapist);
    therapistToken = therapistResponse.body.token;
  });
  describe("User Controller - Client Profile", () => {
    it("should return user data when requesting user info with a valid token", async () => {
      const response = await request(app)
        .get("/api/users/profile")
        .set("Authorization", `Bearer ${clientToken}`);

      expect(response.status).toBe(200);
      console.log(response.body);
    });
  });
});
