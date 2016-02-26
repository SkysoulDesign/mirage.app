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
        navigate.to('login');
    }, false);

}