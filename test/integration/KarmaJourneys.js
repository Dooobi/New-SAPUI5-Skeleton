jQuery.sap.require("sap.ui.test.Opa5");
jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
jQuery.sap.require("sap.ui.qunit.qunit-coverage");
jQuery.sap.require("fis.tgh.__project__.__component__.test.integration.pages.Common");

QUnit.config.autostart = false;

sap.ui.define([
    "sap/ui/test/Opa5",
    "fis/tgh/__project__/__component__/test/integration/pages/Common"
], function(Opa5, Common) {
    "use strict";

    Opa5.extendConfig({
        arrangements: new Common(),
        viewNamespace: "fis.tgh.__project__.__component__.view.",
        autoWait: true
    });

    /**
     * Delayed start of QUnit or KarmaJS might break.
     * @returns {void}
     */
    var startTests = function checkStart() {

        'use strict';

        var aModules, i, iLength;

        if (!window['sap-ui-config'] || !window['sap-ui-config'].libs || !sap) {

            setTimeout(checkStart, 500);

            return;
        }

        aModules = window['sap-ui-config'].libs.replace(/sap./g, '').replace(/\s/g, '').split(',');

        for (i = 0, iLength = aModules.length; i < iLength; i++) {

            if ((aModules[i].indexOf('.') !== -1 && !sap[aModules[i].split('.')[0]]) || (aModules[i].indexOf('.') === -1 && !
                    sap[aModules[i]])) {

                setTimeout(checkStart, 500);

                return;
            }
        }

        QUnit.load();
        QUnit.start();
    };

    sap.ui.require([
        "fis/tgh/__project__/__component__/test/integration/pages/Common",
        "fis/tgh/__project__/__component__/test/integration/pages/App",
        "fis/tgh/__project__/__component__/test/integration/journeys/AppJourney",
    ], function() {
        "use strict";

        startTests();
    });
});