var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var dialogsModule = require("ui/dialogs");
var validator = require("email-validator");
var config = require("../config");
var fetchModule = require("fetch");
var frameModule = require("ui/frame");
var http = require("http");
var settings = require("../settings");
var listPickerModule = require("ui/list-picker");
var listPicker = new listPickerModule.ListPicker();
var _this;
var RegisterViewModel = (function (_super) {
    __extends(RegisterViewModel, _super);
    function RegisterViewModel() {
        _super.call(this);
        this.set("autoLogin", 2);
        this.set("gender", 1);
        this.set("agegroup", 1);
        this.set("username","zhousong");
        this.set("password","123456");
        this.set("confirmpassword","123456");
        this.set("email","123@qq.com");
        // this.set("country","123");
        this.set("agreement",true);
        this.set("information",true);

        this.set("countries","");
        this.set("selectedIndex",0);
        _this = this;
        // this.set("isLoading",true);
    }
    RegisterViewModel.prototype.toggleAutoLogin= function (b) {
        if(b)
        {
            this.set("autoLogin", 0);
        }
        else
        {
            this.set("autoLogin", 1);
        }
        settings.SetAutoLogin(b);
        console.log("autoLogin" + this.get("autoLogin"));
    };
    RegisterViewModel.prototype.toggleGender= function (b) {
        if(b)
        {
            this.set("gender", 0);
        }
        else
        {
            this.set("gender", 1);
        }
       
    };
    RegisterViewModel.prototype.toggleAgegroup= function (args) {
        this.set("agegroup", args);
        // console.log("agegroup" + this.get("agegroup"));
    };
    RegisterViewModel.prototype.toggleAgreement= function () {
        this.set("agreement", !this.get("agreement"));
        console.log("agreement" + this.get("agreement"));
    };
    RegisterViewModel.prototype.toggleInformation= function () {
        this.set("information", !this.get("information"));
        console.log("information" + this.get("information"));
    };
    RegisterViewModel.prototype.tapOK= function() {
        //  var topmost = frameModule.topmost();
        // topmost.navigate("view/register/registersuccess");
        // return;
        if(this.isValidUsername()){
            if(this.isValidPassword()){
                if(this.isValidEmail()){
                    if(this.isValidGender()){
                        if(this.isValidCountry()){
                            if(this.isValidAgegroup()){
                                if(this.isValidAgree()){
                                    if(this.isValidInfo()){
                                        return this.register();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
    }
    RegisterViewModel.prototype.register= function(){
        _this.set("isLoading",true);
        console.log("register");
        return fetchModule.fetch(config.registerUrl, {
            method: "POST",
            body: JSON.stringify({
                username: this.get("username"),
                email: this.get("email"),
                password: this.get("password"),
                password_confirmation: this.get("confirmpassword"),
                gender: this.get("gender")===1?'female':'male',
                country_id: this.get("selectedIndex")+1,
                age: this.getAgegroup(this.get("agegroup")),
                terms:this.get("agreement"),
                newsletter:this.get("information")
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(handleErrors, function (e) {
            console.log(e);
        })
        .then(function(response) {
            console.log(response);
            return response.json();
        })
        .then(function(data){
            _this.set("isLoading",false);
            // if(data.hasOwnProperty("token")){
            if(data.error !== undefined){
                console.log("1 "+JSON.stringify(data.error));
                var message1 ="Error \n";
                // if(data.error.username !== undefined){
                //     message1 += "*" + data.error.username + "\n";
                // }
                // if(data.error.email !== undefined){
                //     message1 += "*" + data.error.email + "\n";
                // }
                // if(data.error.password !== undefined){
                //     message1 += "*" + data.error.password + "\n";
                // }
                // if(data.error.terms !== undefined){
                //     message1 += "*" + data.error.terms + "\n";
                // }
                for(x in data.error){
                    message1 += "*" + data.error[x] + "\n";
                }
                console.log(message1);
                console.log(_this.get("selectedIndex")+1);
                dialogsModule.alert({
                    message: message1,
                    okButtonText: "OK"
                });
            }
            if(data.token !== undefined){
                console.log("token");
                config.token = data.token;
                settings.SetUserName(_this.get("username"));
                settings.SetPassword(_this.get("password"));
                var topmost = frameModule.topmost();
                topmost.navigate("view/register/registersuccess");
                console.log(data.token + "//////"+data);
            }
        });
    }
    RegisterViewModel.prototype.getCountries= function(){
        // console.log("getCountries   "+config.contryUrl);
        var items = new Array();
         return fetchModule.fetch(config.contryUrl)
        .then(handleErrors)
        .then(function(response) {
            return response.json();
        })
        .then(function(data){
            // console.log(JSON.stringify(data));
            for(var country in data){
                items.push(data[country].name);
                // console.log(data[country].name);
            }
            _this.set("countries",items);
            _this.set("selectedIndex",10);
            console.log("countries");
        });

    }
    RegisterViewModel.prototype.getAgegroup = function(num){
        var result;
        switch(num){
                case 1:
                    result = "01/10";
                    break;
                case 2:
                    result = "11/20";
                    break;
                case 3:
                    result = "21/30";
                    break;
                case 4:
                    result = "31/40";
                    break;
                case 5:
                    result = "41/50";
                    break;
                case 6:
                    result = "51/60";
                    break;
                case 7:
                    result = "above 60";
                    break;
        }
        return result;
    }
    RegisterViewModel.prototype.isValidEmail= function(){
        if (validator.validate(this.get("email"))) 
        {
            return true;
        } 
        else 
        {
            dialogsModule.alert({
                message: "Enter a valid email address.",
                okButtonText: "OK"
            });
        }
    }
    RegisterViewModel.prototype.isValidUsername= function(){
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
    RegisterViewModel.prototype.isValidPassword= function(){
        if (this.get("password") != "" && this.get("password") == this.get("confirmpassword")) 
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
    RegisterViewModel.prototype.isValidGender= function(){
        if (this.get("gender") != 2) 
        {
            return true;
        } 
        else 
        {
            dialogsModule.alert({
                message: "Enter a valid gender.",
                okButtonText: "OK"
            });
        }
    }
     RegisterViewModel.prototype.isValidCountry= function(){
        if (this.get("country") != "") 
        {
            return true;
        } 
        else 
        {
            dialogsModule.alert({
                message: "Enter a valid country.",
                okButtonText: "OK"
            });
        }
    }
     RegisterViewModel.prototype.isValidAgegroup= function(){
        if (this.get("agegroup") != 0) 
        {
            return true;
        } 
        else 
        {
            dialogsModule.alert({
                message: "Enter a valid agegroup.",
                okButtonText: "OK"
            });
        }
    }
     RegisterViewModel.prototype.isValidAgree= function(){
        if (this.get("agreement")) 
        {
            return true;
        } 
        else 
        {
            dialogsModule.alert({
                message: "Enter a valid agreement.",
                okButtonText: "OK"
            });
        }
    }
     RegisterViewModel.prototype.isValidInfo= function(){
        if (this.get("information")) 
        {
            return true;
        } 
        else 
        {
            dialogsModule.alert({
                message: "Enter a valid information.",
                okButtonText: "OK"
            });
        }
    }
    // Object.defineProperty(RegisterViewModel.prototype, "exampleGroups", {
    //     get: function () {
    //         return examplesVM.groups;
    //     },
    //     enumerable: true,
    //     configurable: true
    // });
    // Object.defineProperty(RegisterViewModel.prototype, "featuredExamples", {
    //     get: function () {
    //         return examplesVM.featuredExamples;
    //     },
    //     enumerable: true,
    //     configurable: true
    // });
    // Object.defineProperty(RegisterViewModel.prototype, "screenWidth", {
    //     get: function () {
    //         return paltfrom.screen.mainScreen.widthDIPs;
    //     },
    //     enumerable: true,
    //     configurable: true
    // });
    return RegisterViewModel;
})(observable.Observable);
exports.RegisterViewModel = RegisterViewModel;
exports.instance = new RegisterViewModel();
function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    console.log("handleErrors");
    return response;
}