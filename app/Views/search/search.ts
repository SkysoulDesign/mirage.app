import {Page} from 'ui/page';
import {SearchBar} from "ui/search-bar";
import {SearchPageModel} from "../../Models/search-page";
import {StackLayout} from "ui/layouts/stack-layout";

export function pageNavigatedTo(args) {

    var page = <Page>args.object,
        searchBar = <SearchBar>page.getViewById("searchBar"),
        container = <StackLayout>page.getViewById("container"),
        model = new SearchPageModel();

    page.bindingContext = model.init({
        container: container,
        searchBar: searchBar
    });

}
