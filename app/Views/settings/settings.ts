import {SettingsPageModel} from "../../Models/settings-page-model";
import {Page} from 'ui/page';
import {NavigatedData} from "ui/page";

export function pageNavigatedTo(args:NavigatedData) {

    if (args.isBackNavigation)
        return;

    var model = new SettingsPageModel();

    var page = <Page>args.object;
        page.bindingContext = model.init({page: page});

}