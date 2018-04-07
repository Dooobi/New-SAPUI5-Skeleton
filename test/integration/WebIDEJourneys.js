jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.define([
    "sap/ui/test/Opa5",
    "fis/tgh/__project__/__component__/test/integration/pages/Common",
    "fis/tgh/__project__/__component__/test/integration/pages/App"
], function(Opa5, Common) {
    "use strict";
    Opa5.extendConfig({
        arrangements: new Common(),
        viewNamespace: "fis.tgh.__project__.__component__.view.",
        autoWait: true
    });

    sap.ui.require([
        "fis/tgh/__project__/__component__/test/integration/journeys/AppJourney"
    ], function() {
        QUnit.start();
    });
});