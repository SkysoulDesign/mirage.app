"use strict";
var observable_1 = require("data/observable");
var app_1 = require("../app");
var http = require("http");
var Helpers_1 = require("../Modules/Helpers");
var SignInPageModel = (function (_super) {
    __extends(SignInPageModel, _super);
    function SignInPageModel() {
        _super.apply(this, arguments);
    }
    SignInPageModel.prototype.tapSignIn = function () {
        /**
         * Set Loader Spinner
         */
        var _this = this;
        _this.set('isLoading', true);
        http.request({
            url: app_1.Mirage.api.get('login').url,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                credential: this.get('username'),
                password: this.get('password')
            })
        }).then(function (response) {
            /**
             * Disable Loader
             */
            _this.set('isLoading', false);
            var result = response.content.toJSON();
            /**
             * Store Token
             */
            if (result.hasOwnProperty('api_token')) {
                Helpers_1.cache.set('user', result);
                app_1.Mirage.navigate.to('main-page');
            }
            /**
             * Alert Errors
             */
            if (result.hasOwnProperty('error')) {
                app_1.Mirage.api.alertErrors(result.error);
            }
        }, function (e) {
            console.log("Error occurred " + e);
        });
    };
    return SignInPageModel;
}(observable_1.Observable));
exports.SignInPageModel = SignInPageModel;
//# sourceMappingURL=sign-in-page-model.js.map