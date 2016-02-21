import {Mirage as App} from "../app";
import {ApiUrlInterface} from "../Interfaces/ApiUrlInterface";

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
 * Find dot notation key in an object
 */
export var dot = function (dot, obj):string {
    return dot.split('.').reduce(function (a, b) {
        return a[b];
    }, obj);
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
     * @returns string
     */
    public static get(key:string):string {
        return App.api.getCache(key);
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
    public static get(name:string, secure:boolean = false):ApiUrlInterface {
        return App.api.get(name, secure);
    }

}
