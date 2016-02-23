var vmModule = require("../../Models/main-page-model");
var http = require('http');
var Helpers_1 = require("../../Modules/Helpers");
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = new vmModule.MainPageModel();
    /**
     * Check if User Token is Valid.
     * Otherwise redirect user to login page
     * Use Http.request
     */
    http.request({
        url: Helpers_1.api.get('checkLogin').url,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({ api_token: Helpers_1.cache.get('login.api_token') })
    }).then(function (response) {
        var result = response.content.toJSON();
        if (result.hasOwnProperty('error')) {
            Helpers_1.api.alertErrors(result.error);
            Helpers_1.navigate.to('login');
        }
    }, function (e) {
        console.log("Error occurred " + e);
    });
}
exports.pageLoaded = pageLoaded;
//# sourceMappingURL=main-page.js.map