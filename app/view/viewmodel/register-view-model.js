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
var http = require("http");
var settings = require("../settings");

var RegisterViewModel = (function (_super) {
    __extends(RegisterViewModel, _super);
    function RegisterViewModel() {
        _super.call(this);
        this.set("autoLogin", 2);
        this.set("gender", 2);
        this.set("agegroup", 0);
        this.set("username","");
        this.set("password","");
        this.set("confirmpassword","");
        this.set("email","");
        this.set("country","");
        this.set("agreement",false);
        this.set("information",false);
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
        if(this.isValidUsername())
        {
            if(this.isValidPassword())
            {
                if(this.isValidEmail())
                {
                    if(this.isValidGender())
                    {
                        if(this.isValidCountry())
                        {
                            if(this.isValidAgegroup())
                            {
                                if(this.isValidAgree())
                                {
                                    if(this.isValidInfo())
                                    {
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
         this.set("isLoading",true);
         console.log("register");
         return fetchModule.fetch(config.registerUrl, {
            method: "POST",
            body: JSON.stringify({
                username: this.get("username"),
                email: this.get("email"),
                password: this.get("password"),
                password_confirmation: this.get("confirmpassword"),
                gender: this.get("gender"),
                country: this.get("country"),
                age: this.get("agegroup"),
                // agreement: this.get("agreement"),
                // information: this.get("information")
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleErrors).then(function(response){
            this.set("isLoading",false);
            var topmost = frameModule.topmost();
            topmost.navigate("view/register/registersuccess");
            console.log(response.json());
             dialogsModule.alert({
                message: response.json(),
                okButtonText: "OK"
            });
        });
        // var result;
        // return http.request({
        //     url: "https://mirage.dev/register",
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     content: JSON.stringify({ 
        //         username: this.get("username"),
        //         email: this.get("email"),
        //         password: this.get("password"),
        //         password_confirmation: this.get("confirmpassword"),
        //         gender: this.get("gender"),
        //         country: this.get("country"),
        //         age: this.get("agegroup")
        //      })
        // }).then(function (response) {
        //     result = response.content.toJSON();
        //     console.log(result);
        //     var topmost = frameModule.topmost();
        //     topmost.navigate("view/register/registersuccess");
        // }, function (e) {
        //     this.set("isLoading",false);
        //     console.log("Error occurred " + e);
        // });
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