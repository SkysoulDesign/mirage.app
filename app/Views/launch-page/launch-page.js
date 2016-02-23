"use strict";
var app_1 = require("../../app");
var Helpers_1 = require("../../Modules/Helpers");
function pageLoaded() {
    var onSuccess = function () {
        /**
         * Default Options
         */
        var options = { clearHistory: true };
        /**
         * if Token is NOT set, Redirect to Main-Page
         */
        if (!Helpers_1.cache.has('user'))
            return app_1.Mirage.navigate.to("login", options);
        /**
         * Otherwise Redirect to the main page
         */
        app_1.Mirage.navigate.to("main-page", options);
    };
    /**
     * @todo
     * Check For internet connection, and skip these if there is no internet
     * otherwise it will stays hang on here
     */
    /**
     * Cache All forms api to fix a bug on dropdown menu
     * Hopefully the request will be done before user request them
     */
    if (!Helpers_1.cache.has('countries')) {
        app_1.Mirage.api.fetch('countries', {}, onSuccess);
    }
    if (!Helpers_1.cache.has('ages')) {
        app_1.Mirage.api.fetch('ages', {}, onSuccess);
    }
    if (Helpers_1.cache.has('countries') && Helpers_1.cache.has('ages')) {
        onSuccess();
    }
}
exports.pageLoaded = pageLoaded;
//# sourceMappingURL=launch-page.js.map