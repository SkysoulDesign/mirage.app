import {Observable} from "data/observable";
import {Mirage as App} from "../app";
import {EventData} from "data/observable";
import {ObservableArray} from "data/observable-array";

export class RegisterPageModel extends Observable {

    /**
     * Constructor
     */
    public constructor() {

        super();

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
    private defaults() {
        this.set('newsletter', true);
    }

    /**
     * Bind Countries to Model
     */
    private bindCountries() {

        /**
         * Countries
         * @type {ObservableArray<string>}
         */
        var countriesArray = this.getObservableAsArray('countries', function (data, countriesArray) {
            for (var item in data) countriesArray.setItem(data[item].id, data[item].name)
        });

        this.set('countries', countriesArray);
        this.set('selectedCountry', 45); //45 China

    }

    /**
     * Bind Ages to Model
     */
    private bindAges() {

        /**
         * Ages
         * @type {ObservableArray<string>}
         */
        var agesArray = this.getObservableAsArray('ages', function (data, agesArray) {
            for (var item in data) agesArray.setItem(data[item].id, data[item].from + ' - ' + data[item].to)
        });

        this.set('ages', agesArray);
        this.set('selectedAge', 3);

    }

    private getObservableAsArray(name:string, setData:(data, modelArray:ObservableArray<{}>)=>void):ObservableArray<{}> {

        /**
         * Fetch Model List
         */
        var model = App.api.fetch(name);
        var modelArray = new ObservableArray();

        /**
         * Set on Startup
         */
        if (model.get('data'))
            setData(model.get('data'), modelArray);

        /**
         * Set on Fetch from server
         */
        model.on(Observable.propertyChangeEvent, function (data) {
            setData(data.object.get('data'), modelArray)
        });

        return modelArray;

    }

    /**
     * Tap Okay
     */
    public tapOK() {

        /**
         * Start Loader
         */
        this.set('isLoading', true);

        var _this = this,
            data = {
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
            },
            onError = function (e) {
                _this.set('isLoading', false);
                App.api.alertErrors(e);
            };

        /**
         * Fetch
         */
        App.api.fetch('register', data, onSuccess, onError)

    }

    /**
     * Set Gender
     * @param event
     */
    public setGender(event:EventData) {
        this.set('gender', event.object.get('id'));
    }

    /**
     * Toggle Terms
     */
    public toggleAgreement() {
        this.toggle('agreement');
    }

    /**
     * Toggle Newsletter
     */
    public toggleNewsletter() {
        this.toggle('newsletter');
    }

    /**
     * Toggle Booleans
     * @param name
     */
    private toggle(name:string):void {
        this.set(name, !this.get(name));
    }

}

