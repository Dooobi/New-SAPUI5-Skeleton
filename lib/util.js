var rp = require("request-promise-native");
var fs = require("fs");
var scpAuth = require("./scpAuth");

module.exports = {

	checkAuthData: function(authData) {
		if (authData && authData.cookieString && authData.clientSessionId
			&& authData.createdOn && authData.validTo) {

			try {
				authData.createdOn = new Date(Date.parse(authData.createdOn));
				authData.validTo = new Date(Date.parse(authData.validTo));
			} catch (exception) {
				console.log("Couldn't parse Date from authData.json");
				return false;
			}

			return new Date().getTime() <= authData.validTo.getTime();
		}
		return false;
	},

	getAuthData: async function(username, password) {
		try {
			var authData = this.getAuthDataFromEnv();

			if (!this.checkAuthData(authData)) {
				authData = this.getAuthDataFromFile();
			}

			if (!this.checkAuthData(authData)) {
				if (!username || !password) {
					throw new Error("You have to provide a username and a password because the stored authentication data is not valid.");
				}
				authData = await this.getAuthDataByLogin(username, password);
			}
		} catch (error) {
			throw error;
		}

		if (this.checkAuthData(authData)) {
			this.setAuthDataToEnv(authData);
			this.writeAuthDataToFile(authData);
			return authData;
		}

		throw new Error("Error when trying to receive authentication data.");;
	},

	startApp: async function(username, password, account, appname) {
		try {
			var authData = await this.getAuthData(username, password);

			await rp({
				method: "POST",
				uri: "https://account.hana.ondemand.com/ajax/triggerHtml5AppAction/" + account + "/" + appname,
				resolveWithFullResponse: true,
				headers: {
					"Cookie": authData.cookieString,
					"X-ClientSession-Id": authData.clientSessionId
				},
				body: "START"
			});
		} catch (error) {
			throw error;
		}
	},

	stopApp: async function(username, password, account, appname) {
		try {
			var authData = await this.getAuthData(username, password);

			await rp({
				method: "POST",
				uri: "https://account.hana.ondemand.com/ajax/triggerHtml5AppAction/" + account + "/" + appname,
				resolveWithFullResponse: true,
				headers: {
					"Cookie": authData.cookieString,
					"X-ClientSession-Id": authData.clientSessionId
				},
				body: "STOP"
			});
		} catch (error) {
			throw error;
		}
	},

	getAppVersions: async function(username, password, account, appname) {
		try {
			var authData = await this.getAuthData(username, password);

			var response = await rp({
				method: "GET",
				uri: "https://account.hana.ondemand.com/ajax/getAllHtml5AppVersions/" + account + "/" + appname,
				resolveWithFullResponse: true,
				headers: {
					"Cookie": authData.cookieString,
					"X-ClientSession-Id": authData.clientSessionId
				}
			});

			return this.makeVersionInfoObject(JSON.parse(response.body));
		} catch (error) {
			throw error;
		}
	},

	importApp: async function(username, password, account, appname, pathToZip, version) {
		try {
			var authData = await this.getAuthData(username, password);

			var fileContent = fs.readFileSync(pathToZip);

			var response = await rp({
				method: "POST",
				uri: "https://account.hana.ondemand.com/ajax/importHtml5Application/" + account + "/" + appname + "/" + version + "?X-ClientSession-Id=" + authData.clientSessionId,
				resolveWithFullResponse: true,
				headers: {
					"Cookie": authData.cookieString
				},
				formData: {
					Html5FileImporter: {
						value: fileContent,
						options: {
							filename: 'dist.zip',
							contentType: 'application/x-zip-compressed'
						}
					}
				}
			});
			if (response.body !== "<html><head></head><body>[201]:Created</body></html>") {
				throw new Error(response.body);
			}
		} catch (error) {
			throw error;
		}
	},

	activateAppVersion: async function(username, password, account, appname, version) {
		try {
			var authData = await this.getAuthData(username, password);

			var response = await rp({
				method: "POST",
				uri: "https://account.hana.ondemand.com/ajax/triggerHtml5AppVersionAction/" + account + "/" + appname + "/" + version,
				resolveWithFullResponse: true,
				headers: {
					"Cookie": authData.cookieString,
					"X-ClientSession-Id": authData.clientSessionId
				},
				body: "ACTIVATE"
			});
		} catch (error) {
			throw error;
		}
	},

	restartApp: async function(username, password, account, appname) {
		try {
			var authData = await this.getAuthData(username, password);

			var response = await rp({
				method: "POST",
				uri: "https://account.hana.ondemand.com/ajax/triggerHtml5AppAction/" + account + "/" + appname,
				resolveWithFullResponse: true,
				headers: {
					"Cookie": authData.cookieString,
					"X-ClientSession-Id": authData.clientSessionId
				},
				body: "RESTART"
			});
		} catch (error) {
			throw error;
		}
	},

	makeVersionInfoObject: function(versions) {
		var highestVersion = {
			string: "",
			major: 0,
			minor: 0,
			patch: 0
		};

		// Finds the highest Version
		for (var i = 0; i < versions.length; i++) {
			var parts = versions[i].version.split(".");
			var major = parseInt(parts[0], 10),
				minor = parseInt(parts[1], 10),
				patch = parseInt(parts[2], 10);

			if (major > highestVersion.major
				|| major === highestVersion.major && minor > highestVersion.minor
				|| major === highestVersion.major && minor === highestVersion.minor && patch > highestVersion.patch) {

				highestVersion = {
					string: versions[i].version,
					major: major,
					minor: minor,
					patch: patch
				};
			}
		}
		var nextVersion = {
			string: highestVersion.major + "." + highestVersion.minor + "." + (highestVersion.patch+1),
			major: highestVersion.major,
			minor: highestVersion.minor,
			patch: highestVersion.patch + 1
		};

		return {
			highestVersion: highestVersion,
			nextVersion: nextVersion,
			allVersions: versions
		};
	},

	getAuthDataFromFile: function() {
		try {
			return JSON.parse(fs.readFileSync("./authData.json", "utf8"));
		} catch (error) {
			return null;
		}
	},

	getAuthDataFromEnv: function() {
			var authData = {
				cookieString: process.env.auth_data_cookie_string,
				clientSessionId: process.env.auth_data_client_session_id,
				createdOn: process.env.auth_data_created_on,
				validTo: process.env.auth_data_valid_to
			};
			return authData;
	},

	getAuthDataByLogin: async function(username, password) {
		try {
			var authData = await scpAuth.login(username, password);
			authData.createdOn = new Date();
			authData.validTo = new Date(authData.createdOn.getTime() + 20 * 60000);
			return authData;
		} catch (error) {
			throw error;
		}
	},

	writeAuthDataToFile: function(authData) {
		var json = JSON.stringify(authData);
		fs.writeFileSync("./authData.json", json);
	},

	setAuthDataToEnv: function(authData) {
		process.env.auth_data_cookie_string = authData.cookieString;
		process.env.auth_data_client_session_id = authData.clientSessionId;
		process.env.auth_data_created_on = authData.createdOn.getTime();
		process.env.auth_data_valid_to = authData.validTo.getTime();
	}

}
