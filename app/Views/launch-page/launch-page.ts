import {Mirage as App} from "../../app";
import {cache, api, navigate} from "../../Modules/Helpers";

export function pageLoaded() {

    var onSuccess = function () {

        /**
         * Default Options
         */
        var options = {clearHistory: true};

        /**
         * if Token is NOT set, Redirect to Main-Page
         */
        if (!cache.has('login'))
            return navigate.to("login", options);

        /**
         * Otherwise Redirect to the main page
         */
        navigate.to("main-page", options);

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

    if (!cache.has('countries')) {
        api.fetch('countries', {}, onSuccess);
    }

    if (!cache.has('ages')) {
        api.fetch('ages', {}, onSuccess);
    }

    if (cache.has('countries') && cache.has('ages')) {
        onSuccess();
    }

}