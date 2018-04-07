var scp = require("./scpMethods");

var account = "a3bb64753";
//var appname = "fistghmarketplaceproducts";
var appname = "trainergradesapp";
var username = "t.stelzer@fis-gmbh.de";
var password = "C0nquer!";
var pathToZip = "./dist.zip";

if (!account || !appname) {
	throw new Error("Provide account and appname");
}

test();

async function test() {
	try {
		//await scp.stop(username, password, account, appname);
		//await scp.start(username, password, account, appname);
		var response = await scp.deployApp(username, password, account, appname, pathToZip);
		
	} catch (exception) {
		throw exception;
	}
}