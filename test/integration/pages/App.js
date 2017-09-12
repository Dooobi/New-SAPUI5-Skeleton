sap.ui.require([
        'sap/ui/test/Opa5',
        'sap/ui/test/matchers/AggregationLengthEquals',
        'sap/ui/test/matchers/PropertyStrictEquals',
        'fis/tgh/__project__/__component__/test/integration/pages/Common'
    ],
    function(Opa5,
        AggregationLengthEquals,
        PropertyStrictEquals,
        Common) {
        "use strict";

        var viewName = "App";

        Opa5.createPageObjects({
            onTheAppPage: {
                baseClass: Common,
                actions: {},
                assertions: {
                    theAppShouldBeVisible: function() {
                        this.waitFor({
                            id: "app",
                            viewName: viewName,
                            success: function() {
                                Opa5.assert.ok(true, "The app is loaded");
                            },
                            errorMessage: "Couldn't find the app"
                        });
                    }
                }
            }
        });
    });
