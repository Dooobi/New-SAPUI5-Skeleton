//Load the base configuration
var baseConfig = require('./karma.conf.js');

module.exports = function(config) {

    // Load base config
    baseConfig(config);

    // Override base config
    config.set({

        // list of files / patterns to load in the browser
        files: [{
            pattern: 'bower_components/openui5-sap.ui.core/resources/**/*',
            served: true,
            included: false,
            watched: false
        }, {
            pattern: 'bower_components/openui5-sap.m/resources/**/*',
            served: true,
            included: false,
            watched: false
        }, {
            pattern: 'bower_components/openui5-sap.ui.layout/resources/**/*',
            served: true,
            included: false,
            watched: false
        }, {
            pattern: 'bower_components/openui5-sap.ui.unified/resources/**/*',
            served: true,
            included: false,
            watched: false
        }, {
            pattern: 'bower_components/openui5-themelib_sap_belize/resources/**/*',
            served: true,
            included: false,
            watched: false
        }, {
            pattern: 'bower_components/openui5-themelib_sap_bluecrystal/resources/**/*',
            served: true,
            included: false,
            watched: false
        }, {
            pattern: 'webapp/**',
            included: false,
            served: true,
            watched: false,
            nocache: false
        }, {
            pattern: 'test/integration/AllJourneys.js',
            included: false,
            served: true,
            watched: false,
            nocache: false
        }, {
            pattern: 'test/integration/OpaTestsKarma.js',
            included: true,
            served: true,
            watched: false,
            nocache: false
        }, {
            pattern: 'test/**',
            included: false,
            served: true,
            watched: false,
            nocache: false
        }],

        reporters: ['progress', 'dots', 'junit'],

        // junit
        junitReporter: {
            outputDir: "reports",
            outputFile: 'junit_integration.xml'
        }
    });
};
