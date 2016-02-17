
var application = require("application");
var config = require("./view/config");
var appSettings = require("./view/settings");
var signin = require("./view/Signin/Signin");
var fetchModule = require("fetch");
application.cssFile = "./app.css";
if(appSettings.GetFirstLoadApp())
{
	console.log("GetFirstLoadApp ***"+appSettings.GetFirstLoadApp());
	application.mainModule = "view/language/language";
	appSettings.SetFirstLoadApp(false);
	application.start();
}
else
{
	// if(config.token=="")
	// {
	// 	fetchModule.fetch(config.loginUrl, {
 //            method: "POST",
 //            body: JSON.stringify({
 //                credential: appSettings.GetUserName(),
 //                password: appSettings.GetPassword(),
 //                // grant_type: "password"
 //            }),
 //            headers: {
 //                "Content-Type": "application/json"
 //            }
 //        })
 //        .then(handleErrors)
 //        .then(function(response) {
 //            return response.json();
 //        })
 //        .then(function(data) {
 //            if(data.hasOwnProperty("token")){
 //                config.token = data.token;
 //                application.mainModule = "view/mainpage/mainpage";
 //                console.log("mainpage");
 //                application.start();
 //            }
 //            else{
 //            	application.mainModule = "view/login/login";
 //                console.log("false");
 //                application.start();
 //            }
 //        });
	// }
	// else
	// {
	// console.log("3");
		// application.mainModule = "view/mainpage/mainpage";
		application.mainModule = "view/launchpage/launchpage";
		application.start();
	// appSettings.setBoolean("firstLoadApp",true);
	// }
}
application.start();

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    console.log("handleErrors");
    return response;
}
