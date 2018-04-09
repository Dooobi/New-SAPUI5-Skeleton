var rp = require("request-promise-native");
var fs = require("fs");
var util = require("./util");

module.exports = {
	
	start: async function(username, password, account, appname) {
		try {
			await util.stopApp(username, password, acount, appname);
			
			console.log(`Successfully stopped app '${appname}' on account '${account}'.`);
		} catch (error) {
			throw new Error(`Error when trying to start the app '${appname}' on account '${account}'.`);
		}
	},
	
	stop: async function(username, password, account, appname) {
		try {
			await util.stopApp(username, password, acount, appname);
			
			console.log(`Successfully stopped app '${appname}' on account '${account}'.`);
		} catch (error) {
			throw new Error(`Error when trying to stop the app '${appname}' on account '${account}'.`);
		}
	},
	
	deployApp: async function(username, password, account, appname, pathToZip) {
		try {
			var versionInfo = await util.getAppVersions(username, password, account, appname);
			
			await util.importApp(username, password, account, appname, pathToZip, versionInfo.nextVersion.string);
			await util.activateAppVersion(username, password, account, appname, versionInfo.nextVersion.string);
			await util.restartApp(username, password, account, appname);
			
			console.log(`Successfully deployed and restarted app '${appname}' on account '${account}' with new version '${versionInfo.nextVersion.string}'.`);
		} catch (error) {
			throw error;
		}
	}

}