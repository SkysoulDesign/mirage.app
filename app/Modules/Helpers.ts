import {Mirage as App} from "../app";
import {ApiUrlInterface} from "../Interfaces/ApiUrlInterface";
import {NavigationEntry} from "ui/frame";
import {Observable} from "data/observable";
import fs = require("file-system");
import imageSource = require( "image-source");
import {ImageMetaDataInterface} from "../Interfaces/ImageMetaDataInterface";
import {ImageFormat} from "ui/enums";
import {ImageSource} from "image-source";
import platformModule = require("platform");

/**
 * Extend Object
 * @param defaults
 * @param object
 * @returns {any}
 */
export var extend = function (defaults:{}, object:{}):{} {

    for (var i in object) {
        if (object.hasOwnProperty(i)) {
            defaults[i] = object[i];
        }
    }

    return defaults;

};

/**
 * Check if an string is a Valid Json
 * @param code
 * @returns {boolean}
 */
export var isJSON = function (code:string):boolean {

    try {
        JSON.parse(code);
        return true;
    }
    catch (error) {
        return false;
    }

};

/**
 * View Helper
 * @param folder
 * @param name
 * @returns {string}
 */
export var view = function (folder:string, name:string = folder):string {
    return 'Views/' + folder + '/' + name;
};

/**
 * Parse given URL
 * @param url
 * @returns {{name: string, ext: string}}
 */
export var parseURL = function (url:string):ImageMetaDataInterface {

    var clone = url;
    clone = clone.substring(0, (clone.indexOf("#") == -1) ? clone.length : clone.indexOf("#"));
    clone = clone.substring(0, (clone.indexOf("?") == -1) ? clone.length : clone.indexOf("?"));
    clone = clone.substring(clone.lastIndexOf("/") + 1, clone.length);
    clone = clone.split('.');

    return {filename: clone.join('.'), full: url, name: clone[0], extension: clone[1]};
};

/**
 * Find dot notation key in an object
 */
export var dot = function (dot, obj):string {
    return dot.split('.').reduce(function (a, b) {
        return a ? a.hasOwnProperty(b) ? a[b] : null : null;
    }, obj);
};

/**
 * check if number is even or odd
 * @param value
 * @returns {boolean}
 */
export var isEven = function (value:number):boolean {
    return value % 2 == 0 ? true : false;
};

/**
 * Cache Helper
 * @param folder
 * @param name
 * @returns {string}
 */
export class cache {

    /**
     * Check if Key exists in the cache
     * @param key
     * @returns {boolean}
     */
    public static has(key:string):boolean {
        return this.get(key) ? true : false;
    }

    /**
     * Get key from cache
     * @param key
     * @param defaults
     * @returns string
     */
    public static get(key:string, defaults?:string):string|{} {
        return App.api.getCache(key, defaults);
    }

    /**
     * Set key in cache
     * @param key
     * @param data
     */
    public static set(key:string, data:{}):void {
        App.api.cache(key, data);
    }

    /**
     * Delete Key from Cache
     * @param key
     */
    public static remove(key:string):void {
        App.api.deleteCache(key);
    }

    /**
     * Reset Cache
     */
    public static reset():void {
        App.api.resetCache();
    }

}

/**
 * Database
 * @param folder
 * @param name
 * @returns {string}
 */
export class database {

    /**
     * Returns Everything stored on the database
     * @returns {}
     */
    public static all():{} {
        return App.database.setup();
    }

    /**
     * Resets Database
     */
    public static query(value:string):string {
        return dot(value, App.database.setup());
    }

    /**
     * Resets Database
     */
    public static reset():void {
        App.database.reset();
    }

}

/**
 * Database
 * @param folder
 * @param name
 * @returns {string}
 */
export class api {

    /**
     * Returns Everything stored on the database
     * @returns {}
     */
    public static getBase(secure = true):string {
        return App.api.getBase(secure);
    }

    public static get(name:string, secure:boolean = true):ApiUrlInterface {
        return App.api.get(name, secure);
    }

    /**
     * Alert Errors
     * @param errors
     * @param okay
     */
    public static alertErrors(errors:{}, okay?:string):void {
        App.api.alertErrors(errors, okay);
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
    public static fetch(name:string, parameters?:{}, onSuccess?:(data:any)=>void, onError?:(e:any)=>void, cache?:boolean):Observable {
        return App.api.fetch(name, parameters, onSuccess, onError, cache);
    }

    public static fetchImage(url:string, onSuccess?:(image:ImageSource, meta:ImageMetaDataInterface)=>void, onError?:(e:any)=>void):Observable {
        return App.api.fetchImage(url, onSuccess, onError);
    }

}

/**
 * Database
 * @param folder
 * @param name
 * @returns {string}
 */
export class navigate {

    /**
     * Navigate to View
     * @param viewName
     * @param options
     */
    public static to(viewName:string, options:NavigationEntry = {}):void {
        return App.navigate.to(viewName, options);
    }

    /**
     * Navigate back to the previous page
     */
    public static back():void {
        App.navigate.back();
    }

}

export class config {

    /**
     * Get key from config
     * @param key
     * @param defaults
     * @returns any
     */
    public static get(key:string, defaults = null):any {
        var result = dot(key, App.config);
        return result ? result : defaults;
    }

}

export class file {

    /**
     * Save Image
     * @param image
     * @param fileName
     * @returns {any}
     */
    public static save(image:imageSource, fileName:string):boolean {
        return image.saveToFile(this.getPath(fileName), ImageFormat.png);
    }

    /**
     * Navigate back to the previous page
     */
    public static load(fileName:string):imageSource {
        return imageSource.fromFile(this.getPath(fileName));
    }

    /**
     * Check if file exists
     * @param fileName
     * @returns {boolean}
     */
    public static has(fileName:string):boolean {
        return fs.File.exists(this.getPath(fileName));
    }

    /**
     * Get File Path
     * @param fileName
     * @returns {string}
     */
    private static getPath(fileName:string) {
        return fs.path.join(fs.knownFolders.documents().path, fileName);
    }

}

/**
 * Localization Class
 */
export class lang {

    public static languagesCode = ['en', 'zh_cn', 'zh_tw', 'jp'];
    public static languages = ["English", "简体字", "繁體字", "日本"];

    /**
     * Set Language
     * @param index
     */
    public static set(index:number) {
        cache.set('language', this.languagesCode[index]);
    }

    /**
     * Returns all available languages
     * @returns string[]
     */
    public static getLanguages() {
        return this.languages;
    }

    /**
     * get language Index
     */
    public static getIndex():number {
        return this.languagesCode.indexOf(this.activeLanguage());
    }

    /**
     * Returns Active Language
     * @returns string
     */
    public static activeLanguage() {
        return cache.get('language', this.deviceLanguage());
    }

    /**
     * Get Device Language
     * @returns string
     */
    public static deviceLanguage() {

        var language = platformModule.device.language;

        language = language.slice(0, 2);

        switch (language) {
            case 'en':
            case 'jp':
                break;
            default:
                language = language + '_' + this.deviceRegion();
                break;
        }

        return language;

    }

    public static deviceRegion() {
        return platformModule.device.region;
    }

}

