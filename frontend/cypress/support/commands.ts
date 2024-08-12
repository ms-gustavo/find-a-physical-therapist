/// <reference types="cypress" />

Cypress.Commands.add("renderIndexPage", () => {
  cy.get("#main-page").should("exist");
  cy.get("#navbar-component")
    .should("exist")
    .within(() => {
      cy.get("#home-icon").should("exist");
      cy.get("[data-value=theme-toggle]").should("exist");
      cy.get("[data-value=login-popover]")
        .should("exist")
        .and("contain.text", "Login");
      cy.get("[data-value=register-popover]")
        .should("exist")
        .and("contain.text", "Registrar");
    });
});

Cypress.Commands.add("changeThemeColor", () => {
  cy.get("[data-value=theme-toggle]").should("exist");
  cy.get("[data-value=theme-toggle]").should("exist").click();
  cy.get("html").should("have.class", "dark");
});

Cypress.Commands.add("openLoginPopover", () => {
  cy.get("[data-value=login-popover]").should("exist").click();
  cy.get("[data-value=login-popover-content]")
    .should("exist")
    .within(() => {
      cy.get("#pacient-login").should("exist").and("contain.text", "Paciente");
      cy.get("#therapist-login")
        .should("exist")
        .and("contain.text", "Terapeuta");
    });
  cy.get("body").click();
});

Cypress.Commands.add("openRegisterPopover", () => {
  cy.get("[data-value=register-popover]").should("exist").click();
  cy.get("[data-value=register-popover-content]")
    .should("exist")
    .within(() => {
      cy.get("#pacient-register")
        .should("exist")
        .and("contain.text", "Paciente");
      cy.get("#therapist-register")
        .should("exist")
        .and("contain.text", "Terapeuta");
    });
  cy.get("body").click();
});

Cypress.Commands.add("getUserFields", () => {
  cy.get("label").contains("Nome");
  cy.get('input[name="name"]').should("exist").type("Cypress Test");
  cy.get("label").contains("Email");
  cy.get('input[name="email"]').should("exist").type("cypress@test.com");
  cy.get("label").contains("Senha");
  cy.get('input[name="password"]').should("exist").type("123456");
});

Cypress.Commands.add("getTherapistFields", () => {
  cy.get("label").contains("Telefone");
  cy.get('input[name="phoneNumber"]').should("exist").type("12345678910");
  cy.get("label").contains("Especialidades");
  cy.get('input[name="speciality"]')
    .should("exist")
    .type("Cypress, Automatização, Test");
  cy.get("label").contains("Custo médio");
  cy.get('input[name="mediumCost"]').should("exist").type("500");
  cy.get("label").contains("Número de inscrição");
  cy.get('input[name="inscriptionNumber"]').should("exist").type("000000-F");
});

Cypress.Commands.add("getAddressFields", () => {
  cy.intercept("GET", "https://viacep.com.br/ws/*/json/", {
    fixture: "cep-response.json",
  }).as("getCep");

  cy.get("label").contains("CEP");
  cy.get('input[name="address.cep"]').should("exist").type("01001-000");
  cy.get("label").contains("Endereço").click();
  cy.wait("@getCep").then((interception) => {
    expect(interception.request.url).to.include("https://viacep.com.br/ws/");
    expect(interception.response?.statusCode).to.eq(200);
  });

  cy.get('input[name="address.street"]')
    .should("exist")
    .and("have.value", "Praça da Sé");
  cy.get("label").contains("Bairro");
  cy.get('input[name="address.neighborhood"]')
    .should("exist")
    .and("have.value", "Sé");
  cy.get("label").contains("Cidade");
  cy.get('input[name="address.city"]')
    .should("exist")
    .and("have.value", "São Paulo");
  cy.get("label").contains("Estado");
  cy.get('input[name="address.state"]').should("exist").and("have.value", "SP");
  cy.get("label").contains("Número");
  cy.get('input[name="address.number"]').should("exist").type("10");
  cy.get("label").contains("Complemento");
  cy.get('input[name="address.complement"]').should("exist").type("lado ímpar");
});

Cypress.Commands.add("registerATherapist", () => {
  cy.get("[data-value=register-popover]").should("exist").click();
  cy.get("#therapist-register").should("exist").click();
  cy.url().should("include", "/register/therapist");
  cy.get("#therapist-register-page")
    .should("exist")
    .within(() => {
      cy.get("#therapist-register-page-header")
        .should("exist")
        .and("contain.text", "Registrar como Terapeuta");
      cy.get("#form-layout")
        .should("exist")
        .within(() => {
          cy.getUserFields();
          cy.getTherapistFields();
          cy.getAddressFields();
        });
    });
  cy.get("#submit-button")
    .should("exist")
    .and("contain.text", "Cadastrar")
    .click();
  cy.get('div[role="status"]')
    .should("exist")
    .should(
      "contain.text",
      "Cadastro realizado com sucesso! Redirecionando..."
    );
  cy.url().should("include", "/");
});
