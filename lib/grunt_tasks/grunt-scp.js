var scpAuth = require("../scpAuth");
var scp = require("../scpMethods");
var util = require("../util");

module.exports = function(grunt) {
	grunt.registerTask('scp-login', async function() {
		var done = this.async();
		
		var username = grunt.option("username");
		var password = grunt.option("password");
		
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

		var account = grunt.option("account");
		var appname = grunt.option("appname");

		if (!account || !appname) {
			grunt.fatal("Provide account and appname. (--account=<account> --appname=<appname>)");
			return;
		}
		
		try {
			await scp.start(grunt.option("username"), grunt.option("password"), account, appname);
			done();
		} catch (error) {
			grunt.fatal(error.message);
		}		
	});
	
	grunt.registerTask('scp-getAppVersions', async function() {
		var done = this.async();

		var account = grunt.option("account");
		var appname = grunt.option("appname");

		if (!account || !appname) {
			grunt.fatal("Provide account and appname. (--account=<account> --appname=<appname>)");
			return;
		}
		
		try {
			var versionInfo = await util.getAppVersions(grunt.option("username"), grunt.option("password"), account, appname);
			console.log(JSON.stringify(versionInfo));
			
			done();
		} catch (error) {
			grunt.fatal(error.message);
		}		
	});
	
	grunt.registerTask('scp-stop', async function() {
		var done = this.async();

		var account = grunt.option("account");
		var appname = grunt.option("appname");
		
		if (!account || !appname) {
			grunt.fatal("Provide account and appname. (--account=<account> --appname=<appname>)");
			return;
		}
		
		try {
			await scp.stop(grunt.option("username"), grunt.option("password"), account, appname);
			done();
		} catch (error) {
			grunt.fatal(error.message);
		}		
	});
	
	grunt.registerTask('scp-deploy', async function() {
		var done = this.async();
		
		var account = grunt.option("account");
		var appname = grunt.option("appname");
		var pathToZip = grunt.option("pathToZip");
		
		if (!account || !appname || !pathToZip) {
			grunt.fatal("Provide account, appname and the path to the zipped app. (--account=<account> --appname=<appname> --pathToZip=<pathToZip>)");
			return;
		}
		
		try {
			await scp.deployApp(grunt.option("username"), grunt.option("password"), account, appname, pathToZip);
			done();
		} catch (error) {
			grunt.fatal(error.message);
		}		
	});
	
};

