import {Mirage as App} from "../../app";
import {cache} from "../../Modules/Helpers";

export function pageLoaded() {

    /**
     * Default Options
     */
    var options = {clearHistory: true};

    /**
     * Cache All forms api to fix a bug on dropdown menu
     * Hopefully the request will be done before user request them
     */
    App.api.fetch('countries');
    App.api.fetch('ages');

    /**
     * if Token is NOT set, Redirect to Main-Page
     */
    if (!cache.has('user'))
        return App.navigate.to("login", options);

    /**
     * Otherwise Redirect to the main page
     */
    App.navigate.to("main-page", options);

}