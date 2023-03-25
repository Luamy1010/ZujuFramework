class HomePage {
    //          *** CONSTANTS ***
    BASE_URL = "/";
    SIGN_IN_URL = "/#sign-in";
    PASSWORD_REQUIRED_MESSAGE = "Password is required!";
    WRONG_EMAIL_OR_PASSWORD_MESSAGE = "The email or password you entered is incorrect";
    EMAIL_REQUIRED_MESSAGE = "Email is required!";

    //          *** ELEMENTS ***
    // Menus section
    JOIN_US_BUTTON              = () => cy.contains("Join Us");
    TEAMS_MENU                  = () => cy.contains("Teams");

    // Sign Up Pop Up
    SIGN_UP_FORM                = () => cy.get("div[data-cy='signup-modal']");
    LOG_IN_LINK                 = () => cy.contains("Log In");

    // Sign In Form
    EMAIL_TEXT_BOX              = () => cy.get("input[name='email']");
    PASSWORD_TEXT_BOX           = () => cy.get("input[name='password']");
    LOG_IN_BUTTON               = () => cy.contains("Log In");
    FORGOT_PASSWORD_LINK        = () => cy.contains("Forgot password?");

    // Setting section
    SETTING_BUTTON              = () => cy.get("div#settings-option"); //


    //          *** GENERAL ACTIONS ***
    navigateToLogInForm = () => {
        cy.visit(this.BASE_URL);
        this.JOIN_US_BUTTON().click();
        this.LOG_IN_LINK().click();
        this.FORGOT_PASSWORD_LINK(); // Sign to show that login form has been loaded
    }
    
    fillLoginForm = (email, password) => {
        if (email.length >0) this.EMAIL_TEXT_BOX().type(email);
        if (password.length >0) this.PASSWORD_TEXT_BOX().type(password);
        this.LOG_IN_BUTTON().click();
    }
}

exports.HomePage = new HomePage();