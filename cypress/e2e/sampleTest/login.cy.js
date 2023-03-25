const { HomePage } = require("../../pages/Homepage")

describe('LOGIN FLOW TESTING - LOGIN FROM /#signin', () => {
  beforeEach(function () {
    // Get data from fixture
    cy.fixture('users.json').as('users');

    // Navigate to login page from home page
    HomePage.navigateToLogInForm(); // Sign to show that login form has been loaded
  })

  afterEach(function () {
    cy.wait(3000);
  })

  it('Sign in with CORRECT email & password => Expect login success', function () {
    HomePage.fillLoginForm(this.users.defaultUser.email, this.users.defaultUser.password);

    // assertions
    HomePage.SETTING_BUTTON().click(); // Sign to show that user jumps to home page
    cy.contains(this.users.defaultUser.uid); // with correct login account
  })

  it('Sign in with UPPERCASE email & correct password => Expect login SUCCESS', function () {
    HomePage.fillLoginForm(this.users.defaultUser.email.toUpperCase(), this.users.defaultUser.password);

    // assertions
    HomePage.SETTING_BUTTON().click(); // Sign to show that user jumps to home page
    cy.contains(this.users.defaultUser.uid); // with correct login account
  })

  it('Sign in with Spaces at beginning and ending of email & correct password => Expect login SUCCESS', function () {
    HomePage.fillLoginForm("  " + this.users.defaultUser.email + "  ", this.users.defaultUser.password);

    // assertions
    HomePage.SETTING_BUTTON().click(); // Sign to show that user jumps to home page
    cy.contains(this.users.defaultUser.uid); // with correct login account
  })
  
  it('Sign in with WRONG email & correct password => Expect login fail', function () {
    HomePage.fillLoginForm("a" + this.users.defaultUser.email, this.users.defaultUser.password);

    // assertions
    cy.contains(HomePage.WRONG_EMAIL_OR_PASSWORD_MESSAGE); // Should show a message
  })

  it('Sign in with EMPTY email & correct password => Expect login fail', function () {
    HomePage.fillLoginForm("", this.users.defaultUser.password);

    // assertions
    cy.contains(HomePage.EMAIL_REQUIRED_MESSAGE); // Should show a message
  })

  it('Sign in with correct email & EMPTY password  => Expect login fail', function () {
    HomePage.fillLoginForm(this.users.defaultUser.email.toUpperCase(), "");

    // assertions
    cy.contains(HomePage.PASSWORD_REQUIRED_MESSAGE); // Should show a message
  })

  it('Sign in with correct email & WRONG (UpperCase) password => Expect login fail', function () {
    HomePage.fillLoginForm(this.users.defaultUser.email, this.users.defaultUser.password.toUpperCase());

    // assertions
    cy.contains(HomePage.WRONG_EMAIL_OR_PASSWORD_MESSAGE); // Should show a message
  })

  it('Sign in with correct email & Adding spaces to password => Expect login fail', function () {
    HomePage.fillLoginForm(this.users.defaultUser.email,"  " + this.users.defaultUser.password + " ");

    // assertions
    cy.contains(HomePage.WRONG_EMAIL_OR_PASSWORD_MESSAGE); // Should show a message
  })
})
