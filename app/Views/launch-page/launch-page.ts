import {Mirage as App} from "../../app";
import {cache, api, navigate,file} from "../../Modules/Helpers";

export function pageLoaded() {


    //api.fetchImage('http://cms.soapstudio.com/image/products/MF005.png', function (image, meta) {
    //
    //    file.save(image, meta.filename);
    //    console.log('finished', file.has('MF005.png'));
    //
    //});
    //
    //console.log(file.has('MF005.png'));
    //
    //return;

    var counter = 1;

    var onSuccess = function (hack = false) {

        if (!hack)
            if (counter !== 2)
                return counter++;

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
        onSuccess(true);
    }

}