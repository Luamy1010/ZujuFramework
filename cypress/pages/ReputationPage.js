
class ReputationPage {
    // *** CONSTANTS ***
    BASE_URL = "/reputation";
    SEARCH_BOX_PLACEHOLER = "Search for a team"

    // *** VARIABLES ***

    // *** ELEMENTS ***
    SEARCH_BOX                  = () => cy.get("input[type='search']");
    TEAM_LIST_CONTAINER         = () => cy.get("div[data-cy='team-list']");
    All_TEAMS                   = () => this.TEAM_LIST_CONTAINER().find("div.MuiPaper-elevation");
    TEAM                        = (i) => this.TEAM_LIST_CONTAINER().find("div.MuiPaper-elevation").eq(i);
    FAVOURITE_BUTTON_OF_ALL_TEAMS = (i) => this.TEAM(i).find("button[aria-label='favorite']");

    FAVOURITE_TEAM_LIST_CONTAINER = () => cy.get("div[data-cy='fav-team-list']");
    All_FAVOURITE_TEAMS           = () => this.FAVOURITE_TEAM_LIST_CONTAINER().find("div.MuiPaper-elevation");
    FAVOURITE_TEAM                = (i) => this.FAVOURITE_TEAM_LIST_CONTAINER().find("div.MuiPaper-elevation").eq(i);
    FAVOURITE_BUTTON_OF_FAVOURITE_TEAMS = (i) => this.FAVOURITE_TEAM(i).find("button[aria-label='favorite']");
    
    // *** GENERAL ACTIONS ***
    searchTeam = (searchtext) => {
        if (searchtext.length>0) this.SEARCH_BOX().type(searchtext);
    }

    clearSearchBox = () => {
        this.SEARCH_BOX().clear();
    }

    scrollList = (limit = -1) => { // limit = -1 means scroll to end of list
        if (limit == 0) return; // Done scrolling
        if (limit > 0) {
            cy.scrollTo("bottom");
            cy.wait(7000);
            return this.scrollList(limit-1); // scroll more
        }
        
        // scroll til no more item is loaded
        this.All_TEAMS().then((allteams) => {
            let currentNumberOfTeams = allteams.length;
            cy.scrollTo("bottom");
            cy.wait(7000);
            this.All_TEAMS().then((newallteams) => {
                let newNumberOfTeams = newallteams.length;
                if (newNumberOfTeams!= currentNumberOfTeams)
                    return this.scrollList(-1);
            });
        });
    }
}

exports.ReputationPage = new ReputationPage();