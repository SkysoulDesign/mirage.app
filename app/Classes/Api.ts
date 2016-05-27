import http = require('http');
import {Localizator} from "./Localizator";
import {File as file} from "./File";
import {apis} from "./Config";
import {Cache as cache} from "./Cache";
import {Navigator as navigate} from "./Navigator";
import dialogs = require("ui/dialogs");
import {extend, parseURL, except} from "../Modules/Helpers";
import {ApiUrlInterface} from "../Interfaces/ApiUrlInterface";
import {ImageSource} from "image-source";
import {ImageMetaDataInterface} from "../Interfaces/ImageMetaDataInterface";
import {ApiUserInterface} from "../Interfaces/ApiUserInterface";

/**
 * Navigator Class
 */
export class Api {

    /**
     * Constructor
     */
    constructor() {
    }

    /**
     * Post to the API Server
     * @param name
     * @param parameters
     * @param onSuccess
     * @param onError
     * @param toCache
     */
    public static fetch(name:string, parameters:{} = {}, onSuccess?:(data:any)=>void, onError?:(e:any)=>void, toCache:boolean = true):{} {

        let request = this.parse(name),
            handle = function (data:any) {

                console.log("Request:");
                console.dir(request);

                console.log("Response:");
                console.dir(data);

                /**
                 * If there is error on the request consider it as an error
                 */
                if (data.hasOwnProperty('error')) {

                    console.log('Response is valid, however there is an error property');
                    console.dir(data);

                    if (onError instanceof Function)
                        onError(data.error);

                    return;

                }

                /**
                 * Save cache on success
                 */
                if (toCache)
                    cache.set(request.name, data);

                /**
                 * Call Callback
                 */
                if (onSuccess instanceof Function)
                    onSuccess(data);

            };

        console.log("Making a " + request.method + " request to: " + request.url);

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

            let content = JSON.stringify(
                extend({
                    api_token: cache.get('api-token'),
                    language: Localizator.getUserLanguage().code
                }, parameters)
            );

            http.request({
                url: request.url,
                method: request.method,
                headers: {"Content-Type": "application/json"},
                content: content
            }).then(response => {
                handle(response.content.toJSON());
            }, (error) => {
                console.log("Error occurred " + error);
                if (onError instanceof Function)
                    onError(error);
            });

        }

        return cache.get(request.name)

    }

    /**
     * Fetch Image
     * @param url
     * @param onSuccess
     * @param onError
     * @returns {Observable}
     */
    public static fetchImage(url:string, onSuccess?:(image:ImageSource, meta:ImageMetaDataInterface)=>void, onError?:(e:any)=>void) {

        let metaData = parseURL(url);

        console.log('received url', url);
        console.log('loading image');
        console.dir(metaData);

        /**
         * if already cached, then load it
         */
        if (file.has(metaData.filename)) {
            console.log('image already in cache.. using it instead');
            return onSuccess(file.load(metaData.filename), metaData);
        }

        http.getImage(url).then((image:ImageSource) => {

            console.log('fetch a new image');

            /**
             * Cache it locally
             */
            file.save(image, metaData.filename);

            if (onSuccess instanceof Function)
                onSuccess(image, metaData)

        }, function (e) {

            console.error('Error loading image >>> ' + url);
            console.error('Error Message >>> ' + e);

            if (onError instanceof Function)
                onError(e)

        });

    }

    /**
     * Get Api full qualified URL
     * @param name
     * @param secure
     * @returns {string}
     */
    public static parse(name:string, secure:boolean = true):ApiUrlInterface {

        var url:ApiUrlInterface;

        for (var method in apis[name]) url = {
            name: name,
            method: method,
            fragment: apis[name][method],
            url: (secure ? 'https' : 'http') + '://' + apis.base + '/' + apis[name][method],
            cache: cache.get(name)
        }

        return url;

    }

    /**
     * Get Api full qualified URL
     * @param path
     * @param secure
     * @returns {string}
     */
    public static getBase(path:string = '', secure = true):string {
        return (secure ? 'https' : 'http') + '://' + apis.base + path;
    }

    /**
     * Get base url with user token
     */
    public static getBaseWithToken(path:string = '', appends:{} = {}):string {

        var base = this.getBase() + (path ? '/' + path : path),
            token = cache.get('api-token'),
            params = '?api_token=' + token + '&language=' + Localizator.getUserLanguage().code;

        if (!token) console.error('token not set or user not logged in');

        for (var obj in appends)
            params += '&' + obj + "=" + appends[obj]

        return encodeURI(base + params);

    }

    /**
     * Alert Errors
     * @param errors
     * @param okay
     */
    public static alertErrors(errors:{}, okay:string = 'Okay'):void {

        let message = '';

        for (let index in errors)
            message += `• ${errors[index]}\n`;

        dialogs.alert({
            title: "Ooops",
            okButtonText: okay,
            message: message
        });

    }

    /**
     * Refresh Session
     * @param success
     * @param error
     */
    public static refresh(success?:(data:ApiUserInterface)=>void, error?:(error:any) => void) {

        this.fetch('checkLogin', {}, function (user:ApiUserInterface) {

            cache.set('api-token', user.api_token);
            cache.set('codes', user.codes);
            cache.set('user', except(user, ['api_token', 'codes']));

            if (success instanceof Function)
                success(user);

        }, function (error) {

            if (error instanceof Function)
                error(error);

            cache.reset();
            navigate.to('login', {clearHistory: true});

        }, false);

    }

}