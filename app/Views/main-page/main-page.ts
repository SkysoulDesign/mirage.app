import vmModule = require("../../Models/main-page-model");
import {Page} from 'ui/page';
import http = require('http');
import {Mirage as App} from "../../app";
import {cache, api, navigate} from "../../Modules/Helpers";

export function pageLoaded(args) {

    var page = <Page>args.object;
        page.bindingContext = new vmModule.MainPageModel();

    /**
     * Check if User Token is Valid.
     * Otherwise redirect user to login page
     * Use Http.request
     */
    api.fetch('checkLogin', {}, null, function (error) {
        api.alertErrors(error);
        navigate.to('login');
    }, false);

    //http.request({
    //    url: api.get('checkLogin').url,
    //    method: "POST",
    //    headers: {"Content-Type": "application/json"},
    //    content: JSON.stringify({api_token: cache.get('login.api_token')})
    //}).then(function (response) {
    //
    //    var result = response.content.toJSON();
    //
    //    if (result.hasOwnProperty('error')) {
    //        api.alertErrors(result.error);
    //        navigate.to('login');
    //    }
    //
    //}, function (e) {
    //    console.log("Error occurred " + e);
    //});

}