var scpAuth = require("../scpAuth");
var scp = require("../scpMethods");
var util = require("../util");

module.exports = function(grunt) {
	var getParameter = function(name) {
		var value = process.env[name];
		console.log("Env variable: " + name + " = " + value);
		if (!value) {
			value = grunt.option(name);
		}
		return value;
	}

	grunt.registerTask('scp-login', async function() {
		var done = this.async();

		var username = getParameter("username");
		var password = getParameter("password");

		if (!username || !password) {
			grunt.fatal("Provide username and password. (--username=<username> --password=<password>)");
			done();
			return;
		}

		try {
			var authData = await util.getAuthData(username, password);
			console.log(authData);
			done();
		} catch (error) {
			grunt.fatal(error.message);
		}
    });

	grunt.registerTask('scp-start', async function() {
		var done = this.async();

		var account = getParameter("account");
		var appname = getParameter("appname");

		if (!account || !appname) {
			grunt.fatal("Provide account and appname. (--account=<account> --appname=<appname>)");
			return;
		}

		try {
			await scp.start(getParameter("username"), getParameter("password"), account, appname);
			done();
		} catch (error) {
			grunt.fatal(error.message);
		}
	});

	grunt.registerTask('scp-getAppVersions', async function() {
		var done = this.async();

		var account = getParameter("account");
		var appname = getParameter("appname");

		if (!account || !appname) {
			grunt.fatal("Provide account and appname. (--account=<account> --appname=<appname>)");
			return;
		}

		try {
			var versionInfo = await util.getAppVersions(getParameter("username"), getParameter("password"), account, appname);
			console.log(JSON.stringify(versionInfo));

			done();
		} catch (error) {
			grunt.fatal(error.message);
		}
	});

	grunt.registerTask('scp-stop', async function() {
		var done = this.async();

		var account = getParameter("account");
		var appname = getParameter("appname");

		if (!account || !appname) {
			grunt.fatal("Provide account and appname. (--account=<account> --appname=<appname>)");
			return;
		}

		try {
			await scp.stop(getParameter("username"), getParameter("password"), account, appname);
			done();
		} catch (error) {
			grunt.fatal(error.message);
		}
	});

	grunt.registerTask('scp-deploy', async function() {
		var done = this.async();

		var account = getParameter("account");
		var appname = getParameter("appname");
		var pathToZip = getParameter("pathToZip");

		if (!account || !appname || !pathToZip) {
			grunt.fatal("Provide account, appname and the path to the zipped app. (--account=<account> --appname=<appname> --pathToZip=<pathToZip>)");
			return;
		}

		try {
			await scp.deployApp(getParameter("username"), getParameter("password"), account, appname, pathToZip);
			done();
		} catch (error) {
			grunt.fatal(error.message);
		}
	});

};
