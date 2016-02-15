
var application = require("application");
var config = require("./view/config");
var appSettings = require("application-settings");
var firstLoadApp = appSettings.getBoolean("firstLoadApp", true);
var signin = require("./view/Signin/Signin");
if(true)
{
	application.mainModule = "view/language/language";
	appSettings.setBoolean("firstLoadApp",false);
}
else
{
	if(config.token=="")
	{
		if(signin.signinSuccess())
		{
	console.log("1");

			application.mainModule = "view/mainpage/mainpage";
		}
		else
		{
	console.log("2");

			application.mainModule = "view/login/login";
		}
	}
	else
	{
	console.log("3");

		application.mainModule = "view/mainpage/mainpage";
	// appSettings.setBoolean("firstLoadApp",true);
	}
}

application.cssFile = "./app.css";
application.start();
