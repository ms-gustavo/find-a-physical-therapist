/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    renderIndexPage(): Chainable<Subject>;
    changeThemeColor(): Chainable<Subject>;
    openLoginPopover(): Chainable<Subject>;
    openRegisterPopover(): Chainable<Subject>;
    checkToast(message: string): Chainable<Subject>;
    checkInvalidInput(message: string): Chainable<Subject>;
    registerATherapist(
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
    ): Chainable<Subject>;
    registerAClient(
      name: string = "",
      email: string = "",
      password: string = "",
      cep: string = "",
      addressStreet: string = "",
      addressNeighborhood: string = "",
      addressCity: string = "",
      addressState: string = "",
      addressNumber: string = ""
    ): Chainable<Subject>;

    getUserFields(name, email, password): Chainable<Subject>;
    getTherapistFields(
      phoneNumber: string = "",
      speciality: string = "",
      mediumCost: string = "",
      inscriptionNumber: string = ""
    ): Chainable<Subject>;
    getAddressFields(
      cep: string = "",
      addressStreet: string = "",
      addressNeighborhood: string = "",
      addressCity: string = "",
      addressState: string = "",
      addressNumber: string = ""
    ): Chainable<Subject>;
  }
}
