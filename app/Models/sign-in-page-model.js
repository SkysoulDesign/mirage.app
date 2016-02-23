var observable_1 = require("data/observable");
var Helpers_1 = require("../Modules/Helpers");
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
            Helpers_1.navigate.to('main-page');
        }, onError = function (errors) {
            _this.set('isLoading', false);
            Helpers_1.api.alertErrors(errors);
        };
        Helpers_1.api.fetch('login', data, onSuccess, onError);
    };
    return SignInPageModel;
})(observable_1.Observable);
exports.SignInPageModel = SignInPageModel;
//# sourceMappingURL=sign-in-page-model.js.map