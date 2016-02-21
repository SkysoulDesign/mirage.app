import {Mirage as App} from "../app";
import {alert} from "ui/dialogs";
import http = require('http');
import {ApiListInterface} from "../Interfaces/ApiListInterface";
import {extend, dot} from "./Helpers";
import {ApiUrlInterface} from "../Interfaces/ApiUrlInterface";
import {Observable} from "data/observable";

export class Api {

    /**
     * Api List
     */
    private apis:ApiListInterface = App.config.apis;

    /**
     * Get Api full qualified URL
     * @param name
     * @param secure
     * @returns {string}
     */
    public get(name:string, secure:boolean = false):ApiUrlInterface {

        var url:ApiUrlInterface;

        for (var method in  this.apis[name]) url = {
            name: name,
            method: method,
            fragment: this.apis[name][method],
            url: secure ? 'https' : 'http' + '://' + this.apis.base + '/' + this.apis[name][method],
            cache: App.database.get('api')[name]
        }

        return url;
    }

    /**
     * Concatenate all errors into a readable string
     * @param errors
     * @returns {string}
     */
    public parseErrors(errors:{}):string {

        var message = "Error \n\n";

        if (typeof errors === 'string') {
            return message + errors;
        }

        for (var error in errors) {
            message += "* " + errors[error] + "\n";
        }

        return message;

    }

    /**
     * Alert Errors
     * @param errors
     * @param okay
     */
    public alertErrors(errors:{}, okay:string = 'Okay'):void {

        alert({
            message: this.parseErrors(errors),
            okButtonText: okay,
        });

    }

    /**
     * Fetch JSON data from the server
     * @param name
     * @param parameters
     * @param onSuccess
     * @param onError
     * @returns string[]
     */
    public fetch(name:string, parameters:{} = {}, onSuccess?:(data:any)=>void, onError?:(e:any)=>void):Observable {

        var _this = this,
            result = new Observable({data: this.getCache(name)}),
            request = this.get(name),
            handle = function (data:any) {

                /**
                 * Save cache on success
                 */
                if (!data.hasOwnProperty('error')) {

                    _this.cache(request.name, data);
                    result.set('data', data);

                    /**
                     * Call Callback
                     */
                    onSuccess(data);

                }

                if (data.hasOwnProperty('error'))
                    onError(data.error);

            };

        /**
         * Handle GET
         */
        if (request.method === 'GET') {

            http.getJSON(request.url).then(handle, function (e) {
                console.log(e);
                onError(e);
            });

        }

        /**
         * Handle POST
         */
        if (request.method === 'POST') {

            http.request({
                url: this.get(name).url,
                method: "POST",
                headers: {"Content-Type": "application/json"},
                content: JSON.stringify(extend({api_token: App.database.get('api_token')}, parameters))
            }).then(function (response) {
                handle(response.content.toJSON());
            }, function (e) {
                console.log("Error occurred " + e);
                onError(e);
            });

        }

        return result;

    }

    /**
     * Cache Results
     * @param name
     * @param data
     */
    public cache(name:string, data:{}):void {
        App.database.set('api', extend(App.database.get('api'), {[name]: data}));
    }

    /**
     * Get Saved Cache value
     * @param name
     * @returns {any}
     */
    public getCache(name:string):string {

        return dot(name, App.database.get('api'));

        //if (api.hasOwnProperty(name))
        //    return api[name];

        //return null;

    }

    /**
     * Delete Cache
     * @param name
     */
    public deleteCache(name:string):void {

        var cache = App.database.get('api');

        if (cache.hasOwnProperty(name)) {
            delete cache[name];
            App.database.set('api', JSON.stringify(cache));
        }

    }

    /**
     * Reset Cache
     */
    public resetCache() {
        App.database.set('api', JSON.stringify({}));
    }

}