"use strict";
var observable_1 = require("data/observable");
var app_1 = require("../app");
var LoginModel = (function (_super) {
    __extends(LoginModel, _super);
    function LoginModel() {
        _super.apply(this, arguments);
    }
    /**
     * Register Button
     */
    LoginModel.prototype.tapRegister = function () {
        var navigationEntry = {
            backstackVisible: true
        };
        app_1.Mirage.navigate.to('register', navigationEntry);
    };
    /**
     * Login Button
     */
    LoginModel.prototype.tapSignIn = function () {
        app_1.Mirage.navigate.to('sign-in');
    };
    return LoginModel;
}(observable_1.Observable));
exports.LoginModel = LoginModel;
//# sourceMappingURL=login-page-model.js.map