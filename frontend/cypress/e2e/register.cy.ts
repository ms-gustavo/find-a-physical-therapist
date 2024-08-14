beforeEach(() => {
  cy.visit("/");
});

describe("Register Tests", () => {
  describe("Register Therapists Tests", () => {
    it("should register a therapist with success", () => {
      cy.registerATherapist(
        "Cypress Therapist",
        "cypress@therapist.com",
        "123456",
        "12345678901",
        "Cypress, Speciality, Test",
        "150",
        "123465-F",
        "01001000",
        "Praça da Sé",
        "Sé",
        "São Paulo",
        "SP",
        "100"
      );
      cy.checkToast("Cadastro realizado com sucesso! Redirecionando...");
    });

    it("should return an error of user already registered", () => {
      cy.registerATherapist(
        "Cypress Therapist",
        "cypress@therapist.com",
        "123456",
        "12345678901",
        "Cypress, Speciality, Test",
        "150",
        "123465-F",
        "01001000",
        "Praça da Sé",
        "Sé",
        "São Paulo",
        "SP",
        "100"
      );
      cy.checkToast("Erro ao realizar cadastro! Usuário já existente");
    });

    it("should return a validation error without name", () => {
      cy.registerATherapist(
        undefined,
        "cypress@therapist.com",
        "123456",
        "12345678901",
        "Cypress, Speciality, Test",
        "150",
        "123465-F",
        "01001000",
        "Praça da Sé",
        "Sé",
        "São Paulo",
        "SP",
        "100"
      );
      cy.checkInvalidInput("O nome é obrigatório");
    });

    it("should return a validation error without email", () => {
      cy.registerATherapist(
        "Cypress Test",
        undefined,
        "123456",
        "12345678901",
        "Cypress, Speciality, Test",
        "150",
        "123465-F",
        "01001000",
        "Praça da Sé",
        "Sé",
        "São Paulo",
        "SP",
        "100"
      );
      cy.checkInvalidInput("Email inválido");
    });

    it("should return a validation error without password", () => {
      cy.registerATherapist(
        "Cypress Test",
        "cypress@therapist.com",
        undefined,
        "12345678901",
        "Cypress, Speciality, Test",
        "150",
        "123465-F",
        "01001000",
        "Praça da Sé",
        "Sé",
        "São Paulo",
        "SP",
        "100"
      );
      cy.checkInvalidInput("A senha deve ter no mínimo 6 caracteres");
    });
    it("should return a validation error without phone number", () => {
      cy.registerATherapist(
        "Cypress Test",
        "cypress@therapist.com",
        "123456",
        undefined,
        "Cypress, Speciality, Test",
        "150",
        "123465-F",
        "01001000",
        "Praça da Sé",
        "Sé",
        "São Paulo",
        "SP",
        "100"
      );
      cy.checkInvalidInput("O telefone é obrigatório");
    });

    it("should return a validation error with phone number lenght greater than 11", () => {
      cy.registerATherapist(
        "Cypress Test",
        "cypress@therapist.com",
        "123456",
        "123456789101",
        "Cypress, Speciality, Test",
        "150",
        "123465-F",
        "01001000",
        "Praça da Sé",
        "Sé",
        "São Paulo",
        "SP",
        "100"
      );
      cy.checkInvalidInput("Telefone inválido");
    });

    it("should return a validation error without speciality", () => {
      cy.registerATherapist(
        "Cypress Test",
        "cypress@therapist.com",
        "123456",
        "12345678910",
        undefined,
        "150",
        "123465-F",
        "01001000",
        "Praça da Sé",
        "Sé",
        "São Paulo",
        "SP",
        "100"
      );
      cy.checkInvalidInput("A especialidade é obrigatória");
    });

    it("should return a validation error without medium cost", () => {
      cy.registerATherapist(
        "Cypress Test",
        "cypress@therapist.com",
        "123456",
        "12345678910",
        "Cypress, Test",
        undefined,
        "123465-F",
        "01001000",
        "Praça da Sé",
        "Sé",
        "São Paulo",
        "SP",
        "100"
      );
      cy.checkInvalidInput("O custo médio é obrigatório");
    });

    it("should return a validation error without inscription number", () => {
      cy.registerATherapist(
        "Cypress Test",
        "cypress@therapist.com",
        "123456",
        "12345678910",
        "Cypress, Test",
        "150",
        undefined,
        "01001000",
        "Praça da Sé",
        "Sé",
        "São Paulo",
        "SP",
        "100"
      );
      cy.checkInvalidInput("O número de inscrição é obrigatório");
    });

    it("should return a validation error without CEP", () => {
      cy.registerATherapist(
        "Cypress Test",
        "cypress@therapist.com",
        "123456",
        "12345678910",
        "Cypress, Test",
        "150",
        "111-F",
        undefined
      );
      cy.checkInvalidInput("O CEP é obrigatório");
    });
  });

  describe("Register Clients Tests", () => {
    it("should register a client with success", () => {
      cy.registerAClient(
        "Cypress Client",
        "cypress@client.com",
        "123456",
        "01001000",
        "Praça da Sé",
        "Sé",
        "São Paulo",
        "SP",
        "100"
      );
      cy.checkToast("Cadastro realizado com sucesso! Redirecionando...");
    });

    it("should return an error of user already registered", () => {
      cy.registerAClient(
        "Cypress Client",
        "cypress@client.com",
        "123456",

        "01001000",
        "Praça da Sé",
        "Sé",
        "São Paulo",
        "SP",
        "100"
      );
      cy.checkToast("Erro ao realizar cadastro! Usuário já existente");
    });

    it("should return a validation error without name", () => {
      cy.registerAClient(
        undefined,
        "cypress@client.com",
        "123456",

        "01001000",
        "Praça da Sé",
        "Sé",
        "São Paulo",
        "SP",
        "100"
      );
      cy.checkInvalidInput("O nome é obrigatório");
    });

    it("should return a validation error without email", () => {
      cy.registerAClient(
        "Cypress Client",
        undefined,
        "123456",

        "01001000",
        "Praça da Sé",
        "Sé",
        "São Paulo",
        "SP",
        "100"
      );
      cy.checkInvalidInput("Email inválido");
    });

    it("should return a validation error without password", () => {
      cy.registerAClient(
        "Cypress Test",
        "cypress@client.com",
        undefined,

        "01001000",
        "Praça da Sé",
        "Sé",
        "São Paulo",
        "SP",
        "100"
      );
      cy.checkInvalidInput("A senha deve ter no mínimo 6 caracteres");
    });

    it("should return a validation error without CEP", () => {
      cy.registerAClient(
        "Cypress Test",
        "cypress@client.com",
        "123456",
        undefined
      );
      cy.checkInvalidInput("O CEP é obrigatório");
    });
  });
});
