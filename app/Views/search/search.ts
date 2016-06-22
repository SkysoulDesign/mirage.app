import {Page} from 'ui/page';
import {SearchModel} from "./search-model";

export function loaded(args) {

    let page = <Page>args.object;
        page.bindingContext = new SearchModel(page)

}
