import {Page} from 'ui/page';
import {SearchPageModel} from "../../Models/search-page";
import {SearchModel} from "./search-model";

export function loaded(args) {

    let page = <Page>args.object;
        page.bindingContext = new SearchModel(page)

}
