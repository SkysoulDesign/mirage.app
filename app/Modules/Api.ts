import {Mirage as App} from "../app";
import {alert} from "ui/dialogs";
import http = require('http');
import {ApiListInterface} from "../Interfaces/ApiListInterface";
import {extend, dot, parseURL, cache, config} from "./Helpers";
import {ApiUrlInterface} from "../Interfaces/ApiUrlInterface";
import {Observable} from "data/observable";
import {ImageSource} from "image-source";
import {ImageMetaDataInterface} from "../Interfaces/ImageMetaDataInterface";

export class Api {

    /**
     * Api List
     */
    private apis:ApiListInterface = config.get('apis');

    /**
     * Get Api full qualified URL
     * @param secure
     * @returns {string}
     */
    public getBase(secure = true):string {
        return secure ? 'https' : 'http' + '://' + this.apis.base;
    }

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
            cache: cache.get(name)
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
     * @param cache
     * @returns Observable
     */
    public fetch(name:string, parameters:{} = {}, onSuccess?:(data:any)=>void, onError?:(e:any)=>void, cache:boolean = true):Observable {

        var _this = this,
            result:Observable = new Observable({data: this.getCache(name)}),
            request = this.get(name),
            handle = function (data:any) {

                /**
                 * Save cache on success
                 */
                if (!data.hasOwnProperty('error')) {


                    if (cache)
                        _this.cache(request.name, data);

                    result.set('data', data);

                    /**
                     * Call Callback
                     */
                    if (onSuccess instanceof Function)
                        onSuccess(data);

                }

                if (data.hasOwnProperty('error')) {
                    if (onError instanceof Function)
                        onError(data.error);
                }

            };

        /**
         * Handle GET
         */
        if (request.method === 'GET') {

            http.getJSON(request.url).then(handle, function (e) {
                console.log(e);
                if (onError instanceof Function)
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
                content: JSON.stringify(extend({api_token: this.getCache('login.api_token')}, parameters))
            }).then(function (response) {
                handle(response.content.toJSON());
            }, function (e) {
                console.log("Error occurred " + e);
                if (onError instanceof Function)
                    onError(e);
            });
        }

        return result;

    }

    public fetchImage(url:string, onSuccess?:(image:ImageSource, meta:ImageMetaDataInterface)=>void, onError?:(e:any)=>void):Observable {

        var image:Observable = new Observable(),
            metaData = parseURL(url);

        http.getImage(url).then(function (r) {
            image.set('data', r);
            if (onSuccess instanceof Function)
                onSuccess(r, metaData)
        }, function (e) {

            console.error('Error loading image >>> ' + url);
            console.error('Error Message >>> ' + e);

            if (onError instanceof Function)
                onError(e)
        });

        return image;

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
     * @param defaults
     * @returns string|boolean
     */
    public getCache(name:string, defaults:string = null):string {
        var result = dot(name, App.database.get('api'));
        return result ? result : defaults;
    }

    /**
     * Delete Cache
     * @param name
     */
    public deleteCache(name:string):void {

        var cache = this.getCache(name);

        if (!cache)
            return console.log('There is nothing cached under the key: ' + name);

        delete cache[name];

        App.database.set('api', JSON.stringify(cache));

    }

    /**
     * Reset Cache
     */
    public resetCache() {
        App.database.set('api', JSON.stringify({}));
    }

}