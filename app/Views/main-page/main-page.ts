import vmModule = require("../../Models/main-page-model");
import {Page} from 'ui/page';
import http = require('http');
import {Mirage as App} from "../../app";
import {cache, database, api} from "../../Modules/Helpers";

export function pageLoaded(args) {

    var page = <Page>args.object;
        page.bindingContext = new vmModule.MainPageModel();

    return ;
    /**
     * Check if User Token is Valid.
     */
    http.request({
        url: api.get('checkLogin').url,
        method: "POST",
        headers: {"Content-Type": "application/json"},
        content: JSON.stringify({api_token: cache.get('user.api_token')})
    }).then(function (response) {

        var result = response.content.toJSON();

        if (result.hasOwnProperty('error')) {
            App.api.alertErrors(result.error);
            App.navigate.to('login');
        }

    }, function (e) {
        console.log("Error occurred " + e);
    });

}