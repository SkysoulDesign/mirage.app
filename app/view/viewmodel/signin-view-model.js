var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var observable = require("data/observable");
var dialogsModule = require("ui/dialogs");
var validator = require("email-validator");
var config = require("../config");
var fetchModule = require("fetch");
var frameModule = require("ui/frame");
var appSettings = require("application-settings");
var username_save = appSettings.getString("username_save", "");
var password_save = appSettings.getString("password_save", "");


var SigninViewModel = (function (_super) {
    __extends(SigninViewModel, _super);
    function SigninViewModel() {
        _super.call(this);
        this.set("username",username_save);
        this.set("password",password_save);
    }
   
    SigninViewModel.prototype.tapSignin= function() {
        // var topmost = frameModule.topmost();
        // topmost.navigate("view/mainpage/mainpage");
        return this.signin();
    }
    SigninViewModel.prototype.signin= function(){
         this.set("isLoading",true);
         return fetchModule.fetch(config.loginUrl, {
            method: "POST",
            body: JSON.stringify({
                credential: this.get("username"),
                password: this.get("password"),
                // grant_type: "password"
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(handleErrors)
        .then(function(response) {
            console.log(response);
            return response.json();
        })
        .then(function(data) {
            console.log(data.token);
            config.token = data.token;
            console.log("111");
        })
        .then(function(){
            this.set("isLoading",false);
            // appSettings.setString("username_save", this.get("username"));
            // appSettings.setString("password_save", this.get("password"));
            var topmost = frameModule.topmost();
            // topmost.navigate("view/video/video");
            topmost.navigate("view/mainpage/mainpage");
        });
    }
     SigninViewModel.prototype.signinSuccess= function(){
        return fetchModule.fetch(config.loginUrl + "users", {
            method: "POST",
            body: JSON.stringify({
                username: this.get("username"),
                password: this.get("password"),
                grant_type: "password"
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(handleErrors)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            config.token = data.Result.access_token;
        })
        .then(function(){
            return false;
        });
     }
    return SigninViewModel;
})(observable.Observable);
exports.SigninViewModel = SigninViewModel;
exports.instance = new SigninViewModel();
function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    console.log("handleErrors");
    return response;
}