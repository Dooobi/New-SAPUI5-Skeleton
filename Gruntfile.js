module.exports = function(grunt) {
    "use strict";

    var projectConfig = require('./project.conf.js');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        eslint: {
            options: {
                format: "checkstyle",
                outputFile: "reports/eslint-checkstyle.xml",
                quiet: true,
            },
            target: ['webapp/**/*.js']
        },

        trimtrailingspaces: {
            main: {
                src: ['webapp/**/*.js'],
                options: {
                    filter: 'isFile',
                    encoding: 'utf8',
                    failIfTrimmed: false
                }
            }
        },

        copy: {
            node_modules_mod: {
                files: [{
                    src: 'node_modules_mod/karma-qunit/lib/adapter.js',
                    dest: 'node_modules/karma-qunit/lib/adapter.js',
                }, ],
            },
        },

        clean: {
            options: {
                'force': true
            },
            src: ['reports']
        },

        sonarRunner: {
            analysis: {
                options: {
                    debug: true,
                    separator: '\n',
                    dryRun: false,
                    sonar: {
                        host: {
                            url: projectConfig.sonarHost
                        },
                        projectKey: projectConfig.sonarProjectKey,
                        projectName: projectConfig.sonarProjectName,
                        projectVersion: projectConfig.sonarProjectVersion,
                        sources: ['webapp'].join(','),
                        sourceEncoding: 'UTF-8',
                        exclusions: '**/*-preload.js'
                    }
                }
            }
        },

    });

    // jsHint
    grunt.loadNpmTasks('grunt-eslint');

    // Trim spaces
    grunt.loadNpmTasks('grunt-trimtrailingspaces');

    // Soncarcube
    grunt.loadNpmTasks('grunt-sonar-runner');

    // Clean
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Copy
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'copy:node_modules_mod', 'trimtrailingspaces', 'eslint']);
    grunt.registerTask('jenkins', ['clean', 'copy:node_modules_mod', 'trimtrailingspaces', 'eslint']);
    grunt.registerTask('sonar', ['trimtrailingspaces', 'sonarRunner:analysis']);
};
