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
})();
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
})();
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
    /**
     * Alert Errors
     * @param errors
     * @param okay
     */
    api.alertErrors = function (errors, okay) {
        app_1.Mirage.api.alertErrors(errors, okay);
    };
    /**
     * Fetch JSON data from the server
     * @param name
     * @param parameters
     * @param onSuccess
     * @param onError
     * @param cache
     * @returns Observable
     */
    api.fetch = function (name, parameters, onSuccess, onError, cache) {
        return app_1.Mirage.api.fetch(name, parameters, onSuccess, onError, cache);
    };
    return api;
})();
exports.api = api;
/**
 * Database
 * @param folder
 * @param name
 * @returns {string}
 */
var navigate = (function () {
    function navigate() {
    }
    /**
     * Navigate to View
     * @param viewName
     * @param options
     */
    navigate.to = function (viewName, options) {
        if (options === void 0) { options = {}; }
        return app_1.Mirage.navigate.to(viewName, options);
    };
    /**
     * Navigate back to the previous page
     */
    navigate.prototype.back = function () {
        app_1.Mirage.navigate.back();
    };
    return navigate;
})();
exports.navigate = navigate;
//# sourceMappingURL=Helpers.js.map