import {RegisterPageModel} from "../../Models/register-page-model";
import {Page} from 'ui/page';
import placeholder = require("ui/placeholder");
import listPickerModule = require("ui/list-picker");
import {StackLayout} from "ui/layouts/stack-layout";
import {Observable} from "data/observable";
import {ListPicker} from "ui/list-picker";
import {api, cache} from "../../Modules/Helpers";

export function pageLoaded(args) {

    var page = <Page>args.object;

    var container = <StackLayout>page.getViewById('countriesContainer'),
        okay = page.getViewById('okay'),
        selectedIndex = 45;

    api.fetch('countries', {}, function (items) {

        var listPicker = new listPickerModule.ListPicker();

        var data = [];

        for (var item in items)
            data.push(items[item].name);

        listPicker.items = data;
        listPicker.selectedIndex = selectedIndex;

        container.addChild(listPicker);

        listPicker.on(ListPicker.propertyChangeEvent, function (object) {
            selectedIndex = object.value;
        });

        listPicker.automationText = 'Test';

    });

    //console.dir(cache.get('countries'));

    okay.on('tap', function () {
        console.log(selectedIndex);
        page.closeModal();
    })

}