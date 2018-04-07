sap.ui.require(
    ["sap/ui/test/opaQunit"],
    function(opaTest) {
        "use strict";

        QUnit.module("OPA: App");

        opaTest("Should see the table with initial values", function(Given, When, Then) {
            // Arrangements
            Given.iStartMyApp();

            // Actions
            When.onTheAppPage.iLookAtTheScreen();

            // Assertions
            Then.onTheAppPage.theAppShouldBeVisible();
        });
    }
);
