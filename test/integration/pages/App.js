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

        var viewName = "Master";

        Opa5.createPageObjects({
            onTheAppPage: {
                baseClass: Common,
                actions: {},
                assertions: {}
            }
        });
    });
