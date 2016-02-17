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
var settings = require("../settings");
var username_save = settings.GetUserName();
var password_save = settings.GetPassword();
var login = false;
var _this;

var SigninViewModel = (function (_super) {
    __extends(SigninViewModel, _super);
    function SigninViewModel() {
        _super.call(this);
        this.set("username",username_save);
        this.set("password",password_save);
        _this = this;
    }
   
    SigninViewModel.prototype.tapSignin= function() {
        if(this.isValidUsername())
        {
            if(this.isValidPassword())
            {
                return this.signin();
            }
        }
    }
    SigninViewModel.prototype.signin= function(){
         _this.set("isLoading",true);
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
            if(data.token === undefined)
            // if(data.hasOwnProperty("error"))
            {
                // this.set("isLoading",false);
                dialogsModule.alert({
                message: "invalid username or password",
                okButtonText: "OK"
                 });
                throw Error(data.error);
                // console.log(data.error);
            }
            console.log(data.token);
             console.log("response.json--"+JSON.stringify(data));
            config.token = data.token;
        })
        .then(function(){
            _this.set("isLoading",false);
            console.log(_this.get("username")+_this.get("password"));
            settings.SetUserName(_this.get("username"));
            settings.SetPassword(_this.get("password"));
            console.log("222");
            // if(!login)
            // {
            //     login = true;
                var topmost = frameModule.topmost();
                topmost.navigate("view/mainpage/mainpage");
            // }
        });
    }
     SigninViewModel.prototype.signinSuccess= function(){
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
            return response.json();
        })
        .then(function(data) {
            if(data.hasOwnProperty("token")){
                config.token = data.token;
                console.log("true");
                return true;
            }
            else{
                console.log("false");

                return false;
            }
        });
     }
     SigninViewModel.prototype.signOut= function(){
        login = false;
        config.token = "";
     }
     SigninViewModel.prototype.isValidUsername= function(){
        if (this.get("username") != "") 
        {
            return true;
        } 
        else 
        {
            dialogsModule.alert({
                message: "Enter a valid Username.",
                okButtonText: "OK"
            });
        }
    }
    SigninViewModel.prototype.isValidPassword= function(){
        if (this.get("password") != "") 
        {
            return true;
        } 
        else 
        {
            dialogsModule.alert({
                message: "Enter a valid password.",
                okButtonText: "OK"
            });
        }
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