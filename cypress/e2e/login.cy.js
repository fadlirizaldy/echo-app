/**
 * TEST SCENARIO
 *  - Login Page should be rendered
 *  - should display text danger when email & password is empty
 *  - should display text danger when email & password is incorrect
 *  - should display homepage when username and password are correct
 */

describe("Login spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/login");
  });

  it("should display login page correctly", () => {
    cy.get('input[placeholder="email.."]').should("be.visible");
    cy.get('input[placeholder="type password.."]').should("be.visible");
    cy.get("button")
      .contains(/^Log in$/)
      .should("be.visible");
  });

  it("should display text danger when email & password is empty", () => {
    cy.get("button")
      .contains(/^Log in$/)
      .click();
    cy.get("p").contains("email is required").should("be.visible");
    cy.get("p").contains("password is required").should("be.visible");
  });

  it("should display text danger when email & password is incorrect", () => {
    // EMAIL Pattern: <anyword>@<word>.<anydomain>
    cy.get('input[placeholder="email.."]').type("thisemail.com");
    // Password should contain 6 character or more
    cy.get('input[placeholder="type password.."]').type("1234");
    cy.get("button")
      .contains(/^Log in$/)
      .click();
    cy.get("p").contains("invalid email").should("be.visible");
    cy.get("p").contains("min 6 characters").should("be.visible");
  });

  it("should display homepage when username and password are correct", () => {
    cy.get('input[placeholder="email.."]').type("fadli@mail.com");
    cy.get('input[placeholder="type password.."]').type("fadli123");

    cy.get("button")
      .contains(/^Log in$/)
      .click();

    cy.get("div")
      .contains(/^Echo$/)
      .should("be.visible");
  });
});
