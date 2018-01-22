// Karma configuration
// Generated on Wed Mar 29 2017 10:12:48 GMT+0200 (Mitteleuropäische Sommerzeit)

module.exports = function(config) {

    var projectConfig = require('./project.conf.js');
    var customConfig = {

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['qunit', 'openui5'],

        // Plugins
        //plugins: ['karma-qunit'],

        // list of files / patterns to load in the browser
        files: [],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'webapp/**/*.js': ['coverage']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'dots', 'junit', 'coverage'],

        coverageReporter: {
            dir: 'reports/coverage',
            reporters: [{
                type: 'cobertura',
                subdir: 'cobertura',
                file: 'coverage.xml'
            }, {
                type: 'html',
                subdir: 'html'
            }, {
                type: 'lcovonly',
                subdir: 'lcov'
            }]
        },

        // junit
        junitReporter: {
            outputDir: 'reports', // results will be saved as $outputDir/$browserName.xml
            suite: '', // suite will become the package name attribute in xml testsuite element
            useBrowserName: false, // add browser name to report and classes names
            nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
            classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
            properties: {} // key value pair of properties to add to the <properties> section of the report
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_ERROR,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS_custom'],

        //How long will Karma wait for a message from a browser before disconnecting from it (in ms)
        browserNoActivityTimeout: [60000],

        // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
        phantomjsLauncher: {
            exitOnResourceError: false
        },

        // you can define custom flags
        customLaunchers: {
            PhantomJS_custom: {
                base: 'PhantomJS',
                options: {
                    viewportSize: {
                        width: 1440,
                        height: 900
                    },
                    customHeaders: {
                        DNT: "1"
                    },
                    windowName: 'my-window',
                    settings: {
                        webSecurityEnabled: false,
                        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.87 Safari/537.36"
                    }
                },
                flags: ['--load-images=true', '--debug=false', '--disk-cache=false'],
                debug: false
            }
        },

        openui5: {
            path: 'bower_components/openui5-sap.ui.core/resources/sap-ui-core.js',
            useMockServer: false
        },

        // How the client should execute the test, like run in an iframe, capture the console and so on.
        client: {
            captureConsole: false, // debug: true
            clearContext: true,
            useIframe: false,
            qunit: {
                showUI: false,
                testTimeout: 60000,
                autostart: false,
                autoload: false
            },
            openui5: {
                config: {
                    debug: 'true',
                    libs: "sap.m",
                    theme: 'sap_belize',
                    resourceroots: {
                        "sap.m": "/base/bower_components/openui5-sap.m/resources/sap/m",
                    },
                    themeroots: {
                        'sap_belize': '/base/bower_components/openui5-themelib_sap_belize/resources',
                        'sap_bluecrystal': '/base/bower_components/openui5-themelib_sap_bluecrystal/resources'
                    }
                },
            }
        },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

    };

    customConfig.client.openui5.config.resourceroots[projectConfig.ui5ComponentName] = "/base/webapp/";
    customConfig.client.openui5.config.resourceroots[projectConfig.ui5ComponentName + ".test"] = "/base/test/";
    customConfig.client.openui5.config.resourceroots[projectConfig.ui5ComponentName + ".app"] = "/base/test/mockServerKarma";

    if (projectConfig.karmaChromeDebug) {
        customConfig["singleRun"] = false;
        customConfig["browsers"] = ["Chrome"];
    }

    config.set(customConfig);
};