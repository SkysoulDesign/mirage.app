"use strict";
var vmModule = require("../../Models/main-page-model");
var http = require('http');
var app_1 = require("../../app");
var Helpers_1 = require("../../Modules/Helpers");
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = new vmModule.MainPageModel();
    return;
    /**
     * Check if User Token is Valid.
     */
    http.request({
        url: Helpers_1.api.get('checkLogin').url,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({ api_token: Helpers_1.cache.get('user.api_token') })
    }).then(function (response) {
        var result = response.content.toJSON();
        if (result.hasOwnProperty('error')) {
            app_1.Mirage.api.alertErrors(result.error);
            app_1.Mirage.navigate.to('login');
        }
    }, function (e) {
        console.log("Error occurred " + e);
    });
}
exports.pageLoaded = pageLoaded;
//# sourceMappingURL=main-page.js.map