sap.ui.define([
        'sap/ui/test/Opa5'
    ],
    function(Opa5) {
        "use strict";

        function getFrameUrl(sHash, sUrlParameters) {
            sHash = sHash || "";
            var sUrl = jQuery.sap.getResourcePath("fis/tgh/__project__/__component__/app", ".html");

            if (sUrlParameters) {
                sUrlParameters = "?" + sUrlParameters;
            }

            return sUrl + sUrlParameters + "#" + sHash;
        }

        return Opa5.extend("fis.tgh.__project__.__component__.test.integration.pages.Common", {

            constructor: function(oConfig) {
                Opa5.apply(this, arguments);

                this._oConfig = oConfig;
            },

            iStartMyApp: function(oOptions) {
                var sUrlParameters;
                oOptions = oOptions || {
                    delay: 0
                };

                sUrlParameters = "serverDelay=" + oOptions.delay;

                this.iStartMyAppInAFrame(getFrameUrl(oOptions.hash, sUrlParameters));
            },

            iLookAtTheScreen: function() {
                return this;
            }

        });
    });
