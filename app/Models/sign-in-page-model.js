var observable_1 = require("data/observable");
var app_1 = require("../app");
var SignInPageModel = (function (_super) {
    __extends(SignInPageModel, _super);
    function SignInPageModel() {
        _super.apply(this, arguments);
    }
    SignInPageModel.prototype.tapSignIn = function () {
        /**
         * Set Loader Spinner
         */
<<<<<<< HEAD
        var _this = this;
        _this.set('isLoading', true);
        var onSuccess = function () {
            app_1.Mirage.navigate.to('main-page');
            _this.set('isLoading', false);
        }, onError = function (errors) {
            app_1.Mirage.api.alertErrors(errors);
            _this.set('isLoading', false);
        }, data = {
            credential: _this.get('username'),
            password: _this.get('password')
        };
        app_1.Mirage.api.fetch('login', data, onSuccess, onError);
        // http.request({
        //     url: App.api.get('login').url,
        //     method: "POST",
        //     headers: {"Content-Type": "application/json"},
        //     content: JSON.stringify({
        //         credential: this.get('username'),
        //         password: this.get('password')
        //     })
        // }).then(function (response) {
        //     /**
        //      * Disable Loader
        //      */
        //     _this.set('isLoading', false);
        //     var result = response.content.toJSON();
        //     /**
        //      * Store Token
        //      */
        //     if (result.hasOwnProperty('api_token')) {
        //         cache.set('user', result);
        //         App.navigate.to('main-page');
        //     }
        //     /**
        //      * Alert Errors
        //      */
        //     if (result.hasOwnProperty('error')) {
        //         App.api.alertErrors(result.error);
        //     }
        // }, function (e) {
        //     console.log("Error occurred " + e);
        // });
=======
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
>>>>>>> 9ba69f1764a7e5489620bf99c297b7c50c8993c6
    };
    return SignInPageModel;
})(observable_1.Observable);
exports.SignInPageModel = SignInPageModel;
//# sourceMappingURL=sign-in-page-model.js.map