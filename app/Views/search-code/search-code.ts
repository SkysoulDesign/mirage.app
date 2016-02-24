import {cache, database, api, navigate} from "../../Modules/Helpers";
import {Page} from 'ui/page';
import vmModule = require("../../Models/search-code-page-model");

export function pageLoaded(args) {

    var page = <Page>args.object;
    var searchbar = page.getViewById("searchbar");
	page.bindingContext = new vmModule.SearchCodePageModel(searchbar);

}
