sap.ui.require(
    [
        "fis/tgh/__project__/__component__/model/formatter",
        "sap/ui/model/resource/ResourceModel",
        "fis/tgh/__project__/__component__/model/Constant",
        "sap/ui/thirdparty/sinon",
        "sap/ui/thirdparty/sinon-qunit"

    ],
    function(formatter, ResourceModel, Constant) {
        "use strict";
        QUnit.module("UNIT Formatter", {
            beforeEach: function() {
                this._oResourceModel = new ResourceModel({
                    bundleUrl: jQuery.sap.getModulePath("fis.tgh.__project__.__component__",
                        "/i18n/i18n.properties")
                });
            },
            afterEach: function() {
                this._oResourceModel.destroy();
            }
        });
    }
);