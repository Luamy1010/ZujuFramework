const { ReputationPage } = require("../../pages/ReputationPage");
const { HomePage } = require("../../pages/Homepage");

describe('Test reputation page WITHOUT Logging in', () => {
  beforeEach(function () {
    // Get data from fixture
    cy.fixture('teams.json').as('teams');

    // Navigate to REPUATION page from home page
    cy.visit(HomePage.BASE_URL);
    HomePage.TEAMS_MENU().click();

    // assertions
    cy.url().should('eq', Cypress.config().baseUrl + ReputationPage.BASE_URL); // Go to correct url
    ReputationPage.TEAM_LIST_CONTAINER(); //And there's a div that contains all teams.
    ReputationPage.FAVOURITE_TEAM_LIST_CONTAINER().should('not.exist'); //And there isn't a div that contains favourite.
  })

  afterEach(function () {
    cy.wait(5000);
  })

  it('Scroll to load all teams and count => Expect find all teams', function () {
    ReputationPage.scrollList();

    //Assertion
    ReputationPage.All_TEAMS().should("have.length", this.teams.count);
  })

  it('Search for a random text (picked from fixture) => Expect to find some results', function () {
    let randomSearchIndex = Math.floor(Math.random() * (this.teams.searchs.length-1));
    cy.log("Random search index = " + randomSearchIndex)
    ReputationPage.searchTeam(this.teams.searchs[randomSearchIndex].searchText);
    cy.wait(5000);

    // Assertion
    ReputationPage.All_TEAMS().should("have.length", this.teams.searchs[randomSearchIndex].totalResults);
  })

  it('Search for a random text (picked from fixture) UPPERCASE => Expect to find some results - ', function () {
    let randomSearchIndex = Math.floor(Math.random() * (this.teams.searchs.length-1));
    cy.log("Random search index = " + randomSearchIndex)
    ReputationPage.searchTeam(this.teams.searchs[randomSearchIndex].searchText.toUpperCase());
    cy.wait(5000);

    // Assertion
    ReputationPage.All_TEAMS().should("have.length", this.teams.searchs[randomSearchIndex].totalResults);
  })

  it('Search for text, clear and count => Expect return to old list - ', function () {
    // Scroll random times
    let randomScroll = Math.floor(Math.random() * 4);
    cy.log("Scroll " + randomScroll + " times")
    ReputationPage.scrollList(randomScroll);
    
    // Count the teams
    ReputationPage.All_TEAMS().then((allTeams) => {
      let currentNumberOfTeams = allTeams.length;
      // Search something
      let randomSearchIndex = Math.floor(Math.random() * (this.teams.searchs.length-1));
      ReputationPage.searchTeam(this.teams.searchs[randomSearchIndex].searchText);
      cy.wait(5000);

      //  Undo Search
      ReputationPage.clearSearchBox();
      cy.wait(5000);

      // Assertion
      ReputationPage.All_TEAMS().then((allOldTeams) => {
        expect(allOldTeams.length).to.eql(currentNumberOfTeams)
      });
    })
  })

  it('Click on star icon of an item => Login page show up', function () {
    // Scroll random times
    let randomScroll = Math.floor(Math.random() * 4);
    cy.log("Scroll " + randomScroll + " times")
    ReputationPage.scrollList(randomScroll);
    
    // In the list of teams...
    ReputationPage.All_TEAMS().then((allTeams) => {
      let currentNumberOfTeams = allTeams.length;
      let randomIndex = Math.floor(Math.random() * currentNumberOfTeams);
      
      // Click on random favourite button
      ReputationPage.FAVOURITE_BUTTON_OF_ALL_TEAMS(randomIndex).click();

      // Assertion
      HomePage.SIGN_UP_FORM(); // Sign Up form is shown
    })
  })
})

describe('Test reputation page LOGGED IN', () => {
  beforeEach(function () {
    // Keep signed in each test
    cy.session("logged in", () => {
      // Get data from fixture
      cy.fixture('users.json').then((users)=>{
        // Navigate to login page from home page
        HomePage.navigateToLogInForm();
        HomePage.fillLoginForm(users.defaultUser.email, users.defaultUser.password);
        HomePage.SETTING_BUTTON()
      });
    })

    // Get data from fixture
    cy.fixture('teams.json').as('teams');

    // Navigate to REPUTATION page from home page
    cy.visit(HomePage.BASE_URL);
    HomePage.TEAMS_MENU().click();

    // assertions
    cy.url().should('eq', Cypress.config().baseUrl + ReputationPage.BASE_URL); // Go to correct url
    ReputationPage.TEAM_LIST_CONTAINER(); //And there's a div that contains all teams.
  })

  afterEach(function () {
    cy.wait(3000);
  })

  it('Check favourite area', function () {
    
    // Assertion
    ReputationPage.FAVOURITE_TEAM_LIST_CONTAINER();
  })

  it('Scroll and count all Teams', function () {
    
    // Scroll til the end
    ReputationPage.scrollList();

    // Count items
    ReputationPage.All_FAVOURITE_TEAMS().then((allFavouriteTeams)=>{
      ReputationPage.All_TEAMS().then((allTeams) => {
        expect(allFavouriteTeams.length + allTeams.length).to.eql(this.teams.count);
      })
    })
  })

  it('Mark favourite a team and check the result', function () {
    
    ReputationPage.scrollList();

    // In the list of teams...
    ReputationPage.All_TEAMS().then((allTeams) => {
      ReputationPage.All_FAVOURITE_TEAMS().then((allFavouriteTeams)=>{
        let currentNumberOfFavouriteTeams = allFavouriteTeams.length;
        let currentNumberOfTeams = allTeams.length;

        let randomIndex = Math.floor(Math.random() * currentNumberOfTeams);
        
        // Click on random favourite button
        ReputationPage.FAVOURITE_BUTTON_OF_ALL_TEAMS(randomIndex).click();
        cy.wait(10000);
        cy.reload();
        ReputationPage.scrollList();

        ReputationPage.All_TEAMS().then((allNewTeams) => {
          ReputationPage.All_FAVOURITE_TEAMS().then((allNewFavouriteTeams)=>{
            expect(currentNumberOfFavouriteTeams).to.eql(allNewFavouriteTeams.length-1);
            expect(currentNumberOfTeams).to.eql(allNewTeams.length+1);
          })
        })
      })
    })
  })

  it('Unmark favourite a team and check the result', function () {
    
    ReputationPage.scrollList();

    // In the list of teams...
    ReputationPage.All_TEAMS().then((allTeams) => {
      ReputationPage.All_FAVOURITE_TEAMS().then((allFavouriteTeams)=>{
        let currentNumberOfFavouriteTeams = allFavouriteTeams.length;
        let currentNumberOfTeams = allTeams.length;

        let randomIndex = Math.floor(Math.random() * currentNumberOfFavouriteTeams);
        
        // Click on random favourite button
        ReputationPage.FAVOURITE_BUTTON_OF_FAVOURITE_TEAMS(randomIndex).click();
        cy.wait(10000);
        cy.reload();
        ReputationPage.scrollList();

        ReputationPage.All_TEAMS().then((allNewTeams) => {
          ReputationPage.All_FAVOURITE_TEAMS().then((allNewFavouriteTeams)=>{
            expect(currentNumberOfFavouriteTeams).to.eql(allNewFavouriteTeams.length+1);
            expect(currentNumberOfTeams).to.eql(allNewTeams.length-1);
          })
        })
      })
    })
  })
})
