beforeEach(() => {
  cy.visit("/");
});

describe("Register Therapist Tests", () => {
  it("should register a therapist with success", () => {
    cy.registerATherapist();
  });
});
