"use strict";
var observable_1 = require("data/observable");
var app_1 = require("../app");
var SignInPageModel = (function (_super) {
    __extends(SignInPageModel, _super);
    function SignInPageModel() {
        _super.apply(this, arguments);
    }
    /**
     * Sing in Page
     */
    SignInPageModel.prototype.tapSignIn = function () {
        /**
         * Set Loader Spinner
         */
        this.set('isLoading', true);
        var _this = this, data = {
            credential: this.get('username'),
            password: this.get('password')
        }, onSuccess = function () {
            _this.set('isLoading', false);
            app_1.Mirage.navigate.to('main-page');
        }, onError = function (errors) {
            _this.set('isLoading', false);
            app_1.Mirage.api.alertErrors(errors);
        };
        app_1.Mirage.api.fetch('login', data, onSuccess, onError);
    };
    return SignInPageModel;
}(observable_1.Observable));
exports.SignInPageModel = SignInPageModel;
//# sourceMappingURL=sign-in-page-model.js.map