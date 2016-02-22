var observable_1 = require("data/observable");
var app_1 = require("../app");
var observable_array_1 = require("data/observable-array");
var RegisterPageModel = (function (_super) {
    __extends(RegisterPageModel, _super);
    /**
     * Constructor
     */
    function RegisterPageModel() {
        _super.call(this);
        /**
         * Defaults
         */
        this.defaults();
        /**
         * Binders
         */
        this.bindCountries();
        this.bindAges();
    }
    /**
     * Set the defaults
     */
    RegisterPageModel.prototype.defaults = function () {
        this.set('newsletter', true);
    };
    /**
     * Bind Countries to Model
     */
    RegisterPageModel.prototype.bindCountries = function () {
        /**
         * Countries
         * @type {ObservableArray<string>}
         */
        var countriesArray = this.getObservableAsArray('countries', function (data, countriesArray) {
            for (var item in data)
                countriesArray.setItem(data[item].id, data[item].name);
        });
        this.set('countries', countriesArray);
        this.set('selectedCountry', 45); //45 China
    };
    /**
     * Bind Ages to Model
     */
    RegisterPageModel.prototype.bindAges = function () {
        /**
         * Ages
         * @type {ObservableArray<string>}
         */
        var agesArray = this.getObservableAsArray('ages', function (data, agesArray) {
            for (var item in data)
                agesArray.setItem(data[item].id, data[item].from + ' - ' + data[item].to);
        });
        this.set('ages', agesArray);
        this.set('selectedAge', 3);
    };
    RegisterPageModel.prototype.getObservableAsArray = function (name, setData) {
        /**
         * Fetch Model List
         */
        var model = app_1.Mirage.api.fetch(name);
        var modelArray = new observable_array_1.ObservableArray();
        /**
         * Set on Startup
         */
        if (model.get('data'))
            setData(model.get('data'), modelArray);
        /**
         * Set on Fetch from server
         */
        model.on(observable_1.Observable.propertyChangeEvent, function (data) {
            setData(data.object.get('data'), modelArray);
        });
        return modelArray;
    };
    /**
     * Tap Okay
     */
    RegisterPageModel.prototype.tapOK = function () {
        /**
         * Start Loader
         */
        this.set('isLoading', true);
        var _this = this, data = {
            username: this.get('username'),
            password: this.get('password'),
            password_confirmation: this.get('password_confirmation'),
            email: this.get('email'),
            gender: this.get('gender'),
            country_id: this.get('selectedCountry'),
            age_id: this.get('selectedAge'),
            newsletter: this.get('newsletter'),
            terms: this.get('agreement'),
        };
        var onSuccess = function () {
            _this.set('isLoading', false);
        }, onError = function (e) {
            _this.set('isLoading', false);
            app_1.Mirage.api.alertErrors(e);
        };
        /**
         * Fetch
         */
        app_1.Mirage.api.fetch('register', data, onSuccess, onError);
    };
    /**
     * Set Gender
     * @param event
     */
    RegisterPageModel.prototype.setGender = function (event) {
        this.set('gender', event.object.get('id'));
    };
    /**
     * Toggle Terms
     */
    RegisterPageModel.prototype.toggleAgreement = function () {
        this.toggle('agreement');
    };
    /**
     * Toggle Newsletter
     */
    RegisterPageModel.prototype.toggleNewsletter = function () {
        this.toggle('newsletter');
    };
    /**
     * Toggle Booleans
     * @param name
     */
    RegisterPageModel.prototype.toggle = function (name) {
        this.set(name, !this.get(name));
    };
    return RegisterPageModel;
})(observable_1.Observable);
exports.RegisterPageModel = RegisterPageModel;
//# sourceMappingURL=register-page-model.js.map