import {ImageMetaDataInterface} from "../Interfaces/ImageMetaDataInterface";
import {ImageFormat} from "ui/enums";
import {ImageSource} from "image-source";
import fs = require("file-system");
import imageSource = require("image-source");
import application = require("application");
import {device, platformNames} from "platform";
import dialogs = require("ui/dialogs");

/**
 * Extend Object
 * @param defaults
 * @param object
 * @returns {any}
 */
export var extend = (defaults:{}, object:{}):{} => {

    for (var i in object) {
        if (object.hasOwnProperty(i)) {
            defaults[i] = object[i];
        }
    }

    return defaults;

};

/**
 * Remove Keys from object
 *
 * @param object
 * @param items
 * @returns object
 */
export var except = (object:{}, items:any[] = []):any => {

    items.forEach(function (item) {
        delete object[item];
    });

    return object;

};

/**
 * Check if an string is a Valid Json
 *
 * @param code
 * @returns {boolean}
 */
export var isJSON = (code:string):boolean => {

    try {
        JSON.parse(code);
        return true;
    }
    catch (error) {
        return false;
    }

};

/**
 * Check if object is boolean
 * @param a
 * @returns {boolean}
 */
export var isObject = (a:any):boolean => {
    return (!!a) && (a.constructor === Object);
};

/**
 * Get Object Key By value
 * @param object
 * @param value
 * @returns {string}
 */
export var getKeyByValue = (object:any, value:any):{} => {

    for (let key in object) {
        if (object[key] == value)
            return key;
    }

    console.log('object doesnt have the key: ' + value);

    return null;

};

/**
 * Export imageSource to base64String
 * @param source
 * @returns {string}
 */
export var toBase64 = (source:ImageSource):string => "data:image/png;base64," + source.toBase64String(ImageFormat.png);

/**
 * Check if object is a string
 * @param a
 * @returns {boolean}
 */
export var isString = (a:any):boolean => {
    return typeof a === 'string';
};

/**
 * Check if object is an array
 * @param a
 * @returns {boolean}
 */
export var isArray = (a:any):boolean => {
    return Array.isArray(a);
};

/**
 * Check if is android app
 * @returns {boolean}
 */
export var isAndroid = function ():Boolean {
    return device.os === platformNames.android;
};

export var isIOS = function ():Boolean {
    return device.os === platformNames.ios;
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
 * General Functions
 */
// export class general {
//
//     /**
//      * To Choose Add Product Option and Load Page
//      */
//     public static getAddProductAction() {
//         dialogs.action("Please Select an option below", "Cancel", ["Scan QR Code", "Enter Code"]).then(result => {
//             switch (result) {
//                 case "Scan QR Code":
//                     navigate.to("scanner-page");
//                     break;
//                 case "Enter Code":
//                     navigate.to("register-product");
//                     break;
//                 default:
//                     break;
//             }
//         });
//     }
//
//     /**
//      * validates code
//      * MF001XXXXXXXXXXXX
//      * MF001-XXXX-XXXX-XXXX
//      */
//     public static validateCode(code:string):boolean {
//         var index = code.indexOf('-') === -1;
//         return (code.length != 17 && index) || (code.length != 20 && !index);
//     }
//
//     /**
//      * Refresh Cache Data
//      * @param success
//      * @param error
//      */
//     public static refreshCache(success?:(data:ApiUserInterface)=>void, error?:(error:any) => void) {
//
//         api.fetch('checkLogin', {}, function (data) {
//             cache.set('login', data);
//             success(data);
//             if (application.ios) App.iWatch.sendMessage({products: data.codes});
//
//         }, function (error) {
//             navigate.to('login', {clearHistory: true});
//             error(error);
//         }, false);
//
//     }
//
// }
