beforeEach(() => {
  cy.visit("/");
});

describe("Index Page Tests", () => {
  it("should render index page", () => {
    cy.renderIndexPage();
  });

  it("should change theme color", () => {
    cy.changeThemeColor();
  });

  it("should render login popover", () => {
    cy.openLoginPopover();
  });

  it("should render register popover", () => {
    cy.openRegisterPopover();
  });
});
