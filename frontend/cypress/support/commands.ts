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

Cypress.Commands.add(
  "getUserFields",
  (name: string = "", email: string = "", password: string = "") => {
    cy.get("label").contains("Nome");
    cy.get('input[name="name"]')
      .should("exist")
      .then(($input) => {
        if (name) {
          cy.wrap($input).type(name);
        }
      });

    cy.get("label").contains("Email");
    cy.get('input[name="email"]')
      .should("exist")
      .then(($input) => {
        if (email) {
          cy.wrap($input).type(email);
        }
      });

    cy.get("label").contains("Senha");
    cy.get('input[name="password"]')
      .should("exist")
      .then(($input) => {
        if (password) {
          cy.wrap($input).type(password);
        }
      });
  }
);

Cypress.Commands.add(
  "getTherapistFields",
  (
    phoneNumber: string = "",
    speciality: string = "",
    mediumCost: string = "",
    inscriptionNumber: string = ""
  ) => {
    cy.get("label").contains("Telefone");
    cy.get('input[name="phoneNumber"]')
      .should("exist")
      .then(($input) => {
        if (phoneNumber) {
          cy.wrap($input).type(phoneNumber);
        }
      });

    cy.get("label").contains("Especialidades");
    cy.get('input[name="speciality"]')
      .should("exist")
      .then(($input) => {
        if (speciality) {
          cy.wrap($input).type(speciality);
        }
      });

    cy.get("label").contains("Custo médio");
    cy.get('input[name="mediumCost"]')
      .should("exist")
      .then(($input) => {
        if (mediumCost) {
          cy.wrap($input).type(mediumCost);
        }
      });

    cy.get("label").contains("Número de inscrição");
    cy.get('input[name="inscriptionNumber"]')
      .should("exist")
      .then(($input) => {
        if (inscriptionNumber) {
          cy.wrap($input).type(inscriptionNumber);
        }
      });
  }
);

Cypress.Commands.add(
  "getAddressFields",
  (
    cep: string = "",
    addressStreet: string = "",
    addressNeighborhood: string = "",
    addressCity: string = "",
    addressState: string = "",
    addressNumber: string = ""
  ) => {
    cy.intercept("GET", "https://viacep.com.br/ws/*/json/", {
      fixture: "cep-response.json",
    }).as("getCep");

    cy.get("label").contains("CEP");
    cy.get('input[name="address.cep"]')
      .should("exist")
      .then(($input) => {
        if (cep) {
          cy.wrap($input).type(cep);
        }
      });

    cy.get("label").contains("Endereço").click();
    if (cep) {
      cy.wait("@getCep").then((interception) => {
        expect(interception.request.url).to.include(
          "https://viacep.com.br/ws/"
        );
        expect(interception.response?.statusCode).to.eq(200);
      });

      cy.get('input[name="address.street"]')
        .should("exist")
        .then(($input) => {
          if (addressStreet) {
            cy.wrap($input).should("have.value", addressStreet);
          }
        });

      cy.get("label").contains("Bairro");
      cy.get('input[name="address.neighborhood"]')
        .should("exist")
        .then(($input) => {
          if (addressNeighborhood) {
            cy.wrap($input).should("have.value", addressNeighborhood);
          }
        });

      cy.get("label").contains("Cidade");
      cy.get('input[name="address.city"]')
        .should("exist")
        .then(($input) => {
          if (addressCity) {
            cy.wrap($input).should("have.value", addressCity);
          }
        });

      cy.get("label").contains("Estado");
      cy.get('input[name="address.state"]')
        .should("exist")
        .then(($input) => {
          if (addressState) {
            cy.wrap($input).should("have.value", addressState);
          }
        });

      cy.get("label").contains("Número");
      cy.get('input[name="address.number"]')
        .should("exist")
        .then(($input) => {
          if (addressNumber) {
            cy.wrap($input).type(addressNumber);
          }
        });

      cy.get("label").contains("Complemento");
      cy.get('input[name="address.complement"]')
        .should("exist")
        .type("lado ímpar");
    }
  }
);

Cypress.Commands.add(
  "registerATherapist",
  (
    name: string = "",
    email: string = "",
    password: string = "",
    phoneNumber: string = "",
    speciality: string = "",
    mediumCost: string = "",
    inscriptionNumber: string = "",
    cep: string = "",
    addressStreet: string = "",
    addressNeighborhood: string = "",
    addressCity: string = "",
    addressState: string = "",
    addressNumber: string = ""
  ) => {
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
            cy.getUserFields(name, email, password);
            cy.getTherapistFields(
              phoneNumber,
              speciality,
              mediumCost,
              inscriptionNumber
            );
            cy.getAddressFields(
              cep,
              addressStreet,
              addressNeighborhood,
              addressCity,
              addressState,
              addressNumber
            );
          });
      });
    cy.get("#submit-button")
      .should("exist")
      .and("contain.text", "Cadastrar")
      .click();
  }
);

Cypress.Commands.add(
  "registerAClient",
  (
    name: string = "",
    email: string = "",
    password: string = "",
    cep: string = "",
    addressStreet: string = "",
    addressNeighborhood: string = "",
    addressCity: string = "",
    addressState: string = "",
    addressNumber: string = ""
  ) => {
    cy.get("[data-value=register-popover]").should("exist").click();
    cy.get("#pacient-register").should("exist").click();
    cy.url().should("include", "/register/client");
    cy.get("#client-register-page")
      .should("exist")
      .within(() => {
        cy.get("#client-register-page-header")
          .should("exist")
          .and("contain.text", "Registrar como Paciente");
        cy.get("#form-layout")
          .should("exist")
          .within(() => {
            cy.getUserFields(name, email, password);
            cy.getAddressFields(
              cep,
              addressStreet,
              addressNeighborhood,
              addressCity,
              addressState,
              addressNumber
            );
          });
      });
    cy.get("#submit-button")
      .should("exist")
      .and("contain.text", "Cadastrar")
      .click();
  }
);

Cypress.Commands.add("checkInvalidInput", (message: string) => {
  cy.get("p").contains(message).should("exist");
});

Cypress.Commands.add("checkToast", (message: string) => {
  cy.get('div[role="status"]').should("exist").should("contain.text", message);
});
