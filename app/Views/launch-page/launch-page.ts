import {cache, navigate} from "../../Modules/Helpers";
import {NavigatedData} from "ui/page";
import {api} from "../../Modules/Helpers";

export function pageNavigatedTo(args:NavigatedData) {

    /**
     * if Token is NOT set, Redirect to Main-Page
     */
    if (!cache.has('login'))
        return navigate.to("login", {clearHistory: true});

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
        api.fetch('countries', {});
    }

    if (!cache.has('ages')) {
        api.fetch('ages', {});
    }

    /**
     * Otherwise Redirect to the main page
     */
    navigate.to("main-page", {clearHistory: true});

    //if (cache.has('countries') && cache.has('ages')) {
    //    onSuccess(true);
    //}

}