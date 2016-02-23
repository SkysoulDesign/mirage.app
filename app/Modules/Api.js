"use strict";
var app_1 = require("../app");
var dialogs_1 = require("ui/dialogs");
var http = require('http');
var Helpers_1 = require("./Helpers");
var observable_1 = require("data/observable");
var Api = (function () {
    function Api() {
        /**
         * Api List
         */
        this.apis = app_1.Mirage.config.apis;
    }
    /**
     * Get Api full qualified URL
     * @param name
     * @param secure
     * @returns {string}
     */
    Api.prototype.get = function (name, secure) {
        if (secure === void 0) { secure = false; }
        var url;
        for (var method in this.apis[name])
            url = {
                name: name,
                method: method,
                fragment: this.apis[name][method],
                url: secure ? 'https' : 'http' + '://' + this.apis.base + '/' + this.apis[name][method],
                cache: app_1.Mirage.database.get('api')[name]
            };
        return url;
    };
    /**
     * Concatenate all errors into a readable string
     * @param errors
     * @returns {string}
     */
    Api.prototype.parseErrors = function (errors) {
        var message = "Error \n\n";
        if (typeof errors === 'string') {
            return message + errors;
        }
        for (var error in errors) {
            message += "* " + errors[error] + "\n";
        }
        return message;
    };
    /**
     * Alert Errors
     * @param errors
     * @param okay
     */
    Api.prototype.alertErrors = function (errors, okay) {
        if (okay === void 0) { okay = 'Okay'; }
        dialogs_1.alert({
            message: this.parseErrors(errors),
            okButtonText: okay,
        });
    };
    /**
     * Fetch JSON data from the server
     * @param name
     * @param parameters
     * @param onSuccess
     * @param onError
     * @returns string[]
     */
    Api.prototype.fetch = function (name, parameters, onSuccess, onError) {
        if (parameters === void 0) { parameters = {}; }
        var _this = this, result = new observable_1.Observable({ data: this.getCache(name) }), request = this.get(name), handle = function (data) {
            console.log("TTTTTTTTTdataTTTTTTTTTT");
            console.dir(data);
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
                console.log("TTTTTTTTTsuccessTTTTTTTTTT");
            }
            if (data.hasOwnProperty('error')) {
                onError(data.error);
                console.log("TTTTTTTTTerrorTTTTTTTTTT");
            }
        };
        console.dir(app_1.Mirage.database.setup());
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
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify(Helpers_1.extend({ api_token: this.getCache('login.api_token') }, parameters))
            }).then(function (response) {
                handle(response.content.toJSON());
            }, function (e) {
                console.log("Error occurred " + e);
                onError(e);
            });
        }
        return result;
    };
    /**
     * Cache Results
     * @param name
     * @param data
     */
    Api.prototype.cache = function (name, data) {
        app_1.Mirage.database.set('api', Helpers_1.extend(app_1.Mirage.database.get('api'), (_a = {}, _a[name] = data, _a)));
        var _a;
    };
    /**
     * Get Saved Cache value
     * @param name
     * @returns {any}
     */
    Api.prototype.getCache = function (name) {
        return Helpers_1.dot(name, app_1.Mirage.database.get('api'));
        //if (api.hasOwnProperty(name))
        //    return api[name];
        //return null;
    };
    /**
     * Delete Cache
     * @param name
     */
    Api.prototype.deleteCache = function (name) {
        var cache = app_1.Mirage.database.get('api');
        if (cache.hasOwnProperty(name)) {
            delete cache[name];
            app_1.Mirage.database.set('api', JSON.stringify(cache));
        }
    };
    /**
     * Reset Cache
     */
    Api.prototype.resetCache = function () {
        app_1.Mirage.database.set('api', JSON.stringify({}));
    };
    return Api;
}());
exports.Api = Api;
//# sourceMappingURL=Api.js.map