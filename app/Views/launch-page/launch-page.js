"use strict";
var app_1 = require("../../app");
var Helpers_1 = require("../../Modules/Helpers");
function pageLoaded() {
    /**
     * Default Options
     */
    var options = { clearHistory: true };
    /**
     * Cache All forms api to fix a bug on dropdown menu
     * Hopefully the request will be done before user request them
     */
    app_1.Mirage.api.fetch('countries');
    app_1.Mirage.api.fetch('ages');
    /**
     * if Token is NOT set, Redirect to Main-Page
     */
    if (!Helpers_1.cache.has('user'))
        return app_1.Mirage.navigate.to("login", options);
    /**
     * Otherwise Redirect to the main page
     */
    app_1.Mirage.navigate.to("main-page", options);
}
exports.pageLoaded = pageLoaded;
//# sourceMappingURL=launch-page.js.map