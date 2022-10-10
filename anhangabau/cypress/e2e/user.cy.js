/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

beforeEach(() => {
  cy.resetDatabase();
});

describe("POST /signup", () => {
  const user = {
    name: "Bia",
    email: "teste@gmail.com",
    password: "1234",
  };
  it("should add new user", () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.visit("http://localhost:3000/signup");
    cy.get("[data-cy='name-input']").type(user.name);
    cy.get("[data-cy='email-input']").type(user.email);
    cy.get("[data-cy='password-input']").type(user.password);
    cy.intercept("POST", "/signup").as("newUser");
    cy.get("[data-cy='submit-button']").click();
    cy.wait("@newUser");
  });
  it("shouldn't add new user when email is already in use", () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.visit("http://localhost:3000/signup");
    cy.get("[data-cy='name-input']").type(user.name);
    cy.get("[data-cy='email-input']").type(user.email);
    cy.get("[data-cy='password-input']").type(user.password);
    cy.intercept("POST", "/signup").as("newUser");
    cy.get("[data-cy='submit-button']").click();
    cy.visit("http://localhost:3000/signup");
    cy.get("[data-cy='name-input']").type(user.name);
    cy.get("[data-cy='email-input']").type(user.email);
    cy.get("[data-cy='password-input']").type(user.password);
    cy.intercept("POST", "/signup").as("newUser");
    cy.get("[data-cy='submit-button']").click();
    cy.wait("@newUser").then(({ response }) => {
      cy.log(response);
      expect(response.statusCode).to.equal(409);
    });
  });
});
