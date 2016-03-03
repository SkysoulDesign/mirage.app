import {MainPageModel} from "../../Models/main-page-model";
import {Page} from 'ui/page';
import { api, navigate, database} from "../../Modules/Helpers";
import {NavigatedData} from "ui/page";

var mainPageModel = new MainPageModel();

export function pageNavigatedTo(args:NavigatedData) {

    var page = <Page>args.object;
        page.bindingContext = mainPageModel.initOnce({page: page});

    /**
     * Check if User Token is Valid.
     * Otherwise redirect user to login page
     * Use Http.request
     */
    mainPageModel.refreshLogin();

    console.log('pageNavigatedTo')

}