"use strict";
var app_1 = require("../app");
/**
 * Extend Object
 * @param defaults
 * @param object
 * @returns {any}
 */
exports.extend = function (defaults, object) {
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
exports.isJSON = function (code) {
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
exports.view = function (folder, name) {
    if (name === void 0) { name = folder; }
    return 'Views/' + folder + '/' + name;
};
/**
 * Find dot notation key in an object
 */
exports.dot = function (dot, obj) {
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
var cache = (function () {
    function cache() {
    }
    /**
     * Check if Key exists in the cache
     * @param key
     * @returns {boolean}
     */
    cache.has = function (key) {
        return this.get(key) ? true : false;
    };
    /**
     * Get key from cache
     * @param key
     * @returns string
     */
    cache.get = function (key) {
        return app_1.Mirage.api.getCache(key);
    };
    /**
     * Set key in cache
     * @param key
     * @param data
     */
    cache.set = function (key, data) {
        app_1.Mirage.api.cache(key, data);
    };
    /**
     * Delete Key from Cache
     * @param key
     */
    cache.remove = function (key) {
        app_1.Mirage.api.deleteCache(key);
    };
    /**
     * Reset Cache
     */
    cache.reset = function () {
        app_1.Mirage.api.resetCache();
    };
    return cache;
}());
exports.cache = cache;
/**
 * Database
 * @param folder
 * @param name
 * @returns {string}
 */
var database = (function () {
    function database() {
    }
    /**
     * Returns Everything stored on the database
     * @returns {}
     */
    database.all = function () {
        return app_1.Mirage.database.setup();
    };
    /**
     * Resets Database
     */
    database.query = function (value) {
        return exports.dot(value, app_1.Mirage.database.setup());
    };
    /**
     * Resets Database
     */
    database.reset = function () {
        app_1.Mirage.database.reset();
    };
    return database;
}());
exports.database = database;
/**
 * Database
 * @param folder
 * @param name
 * @returns {string}
 */
var api = (function () {
    function api() {
    }
    /**
     * Returns Everything stored on the database
     * @returns {}
     */
    api.get = function (name, secure) {
        if (secure === void 0) { secure = false; }
        return app_1.Mirage.api.get(name, secure);
    };
    return api;
}());
exports.api = api;
//# sourceMappingURL=Helpers.js.map