/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    renderIndexPage(): Chainable<Subject>;
    changeThemeColor(): Chainable<Subject>;
    openLoginPopover(): Chainable<Subject>;
    openRegisterPopover(): Chainable<Subject>;
    registerATherapist(): Chainable<Subject>;
    getUserFields(): Chainable<Subject>;
    getTherapistFields(): Chainable<Subject>;
    getAddressFields(): Chainable<Subject>;
  }
}
