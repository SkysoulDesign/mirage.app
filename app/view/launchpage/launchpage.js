var config = require("../config");
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var appSettings = require("../settings");
	
exports.pageLoaded = function(){
	if(config.token=="")
	{
		console.log("config.token");
		fetchModule.fetch(config.loginUrl, {
            method: "POST",
            body: JSON.stringify({
                credential: appSettings.GetUserName(),
                password: appSettings.GetPassword(),
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(handleErrors,function(e){
        	console.log(e);
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if(data.hasOwnProperty("token")){
                config.token = data.token;
               navigateTo("view/mainpage/mainpage");
                application.start();
            }
            else{
                console.log("false");
                navigateTo("view/login/login");
            }
        });
	}
	else
	{
		navigateTo("view/mainpage/mainpage");
	}
}
function navigateTo(name){
	var navigationEntry = {
	    moduleName: name,
	    // backstackVisible: false,
	    clearHistory: true
	};
	 frameModule.topmost().navigate(navigationEntry);
}
function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        navigateTo("view/login/login");
        throw Error(response.statusText);
    }
    console.log("handleErrors");
    return response;
}