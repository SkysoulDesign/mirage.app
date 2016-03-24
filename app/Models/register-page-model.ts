import {Observable, EventData} from "data/observable";
import {ObservableArray} from "data/observable-array";
import {api, navigate, cache,view} from "../Modules/Helpers";
import {BaseModel} from "./BaseModel";
import {Button} from "ui/button";
import {Page} from "ui/page";
import StackLayout = org.nativescript.widgets.StackLayout;
import listPickerModule = require("ui/list-picker");
import {LocalizedModel} from "./LocalizedModel";
import {LocalizedModelInterface} from "../Interfaces/LocalizedModelInterface";

export class RegisterPageModel extends LocalizedModel implements LocalizedModelInterface {

    private page:Page;
    private registerButton:Button;

    /**
     * Constructor
     */
    constructor() {
        super();
    }

    /**
     * Setup
     */
    public setup() {
        /**
         * Defaults
         */
        //this.defaults();

        /**
         * Binders
         */
        //this.bindCountries();
        //this.bindAges();
    }

    /**
     * Localize Model
     * @returns {string[]}
     */
    public localize() {
        return ['USERNAME', 'REGISTER', 'PASSWORD', 'PASSWORD_CONFIRM', 'EMAIL'];
    }

    /**
     * Set the defaults
     */
    private defaults() {
        //this.set('newsletter', true);
    }

    /**
     * Bind Countries to Model
     */
    private bindCountries() {


        //var container = <StackLayout>this.page.getViewById('countriesContainer');
        //var listPicker = new listPickerModule.ListPicker();
        //listPicker.items = ['africa', 'brazil', 'china', 'uberenita'];
        //listPicker.selectedIndex = 2;
        //container.addChild(listPicker);
        //
        //var page = this.page;
        //container.on('tap', function () {
        //
        //    page.showModal(view('modal-countries'), container, function () {
        //        console.log('test')
        //    }, false);
        //
        //});

        /**
         * Countries USING THIS
         * @type {ObservableArray<string>}
         */
        //var countriesArray = this.getObservableAsArray('countries', function (data, countriesArray) {
        //    for (var item in data) countriesArray.setItem(data[item].id, data[item].name)
        //});
        //
        //this.set('countries', countriesArray);
        //this.set('selectedCountry', 45); //45 China

    }

    /**
     * Bind Ages to Model
     */
    private bindAges() {

        /**
         * Ages
         * @type {ObservableArray<string>}
         */
        //var agesArray = this.getObservableAsArray('ages', function (data, agesArray) {
        //    for (var item in data) agesArray.setItem(data[item].id, data[item].from + ' - ' + data[item].to)
        //});
        //
        //this.set('ages', agesArray);
        //this.set('selectedAge', 3);

    }

    /**
     * Convert Observable to ObservableArray
     * @param name
     * @param setData
     * @returns {"data/observable-array".ObservableArray}
     */
    private getObservableAsArray(name:string, setData:(data, modelArray:ObservableArray<{}>)=>void):ObservableArray<{}> {

        /**
         * Fetch Model List
         */
        var model = api.fetch(name);
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
    public tapRegister() {

        /**
         * Start Loader
         */
        this.set('isLoading', true);

        this.registerButton.isEnabled = false;

        var _this = this,
            data = {
                username: this.get('username'),
                password: this.get('password'),
                password_confirmation: this.get('password_confirmation'),
                email: this.get('email'),
                //gender: this.get('gender'),
                //country_id: this.get('selectedCountry'),
                //age_id: this.get('selectedAge'),
                //newsletter: this.get('newsletter'),
                //terms: this.get('agreement'),
            };

        var onSuccess = function (data) {

                /**
                 * Cache the Data to the user info
                 */
                cache.set('login', data);
                api.fetch('products', {}, function () {
                    _this.set('isLoading', false);
                    navigate.to("main-page", {clearHistory: true});
                });

            },
            onError = function (e) {
                _this.set('isLoading', false);
                _this.registerButton.isEnabled = true;

                api.alertErrors(e);
            };

        /**
         * Fetch
         */
        api.fetch('register', data, onSuccess, onError)

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

