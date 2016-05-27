import {SearchBar} from "ui/search-bar";
import {ListView, ItemEventData} from "ui/list-view";
import {Label} from "ui/label";
import {Image} from "ui/image";
import {StackLayout} from "ui/layouts/stack-layout";
import {ObservableArray} from "data/observable-array";
import {Observable, EventData} from "data/observable";
import {Localizator} from "../../Classes/Localizator";
import {Cache as cache} from "../../Classes/Cache";
import {Api as api} from "../../Classes/Api";
import {Navigator as navigate} from "../../Classes/Navigator";
import {Page} from "ui/page";
import {ApiCodesInterface} from "../../Interfaces/ApiUserInterface";
import {DropDown} from "nativescript-drop-down";
import observableArray = require("data/observable-array");
import {toBase64} from "../../Modules/Helpers";

let page, listView, searchBar, container, dropdown,
    result = new ObservableArray();

/**
 * Search Model
 */
export class SearchModel extends Observable {

    /**
     * Constructor
     * @param pageObject
     */
    constructor(pageObject:Page) {

        super();

        page = pageObject;
        searchBar = <SearchBar>page.getViewById("searchBar");
        container = <StackLayout>page.getViewById("container");
        listView = <ListView>page.getViewById("listView");
        dropdown = <DropDown>page.getViewById("dropdown");

        Localizator.localize(this, [
            'SEARCH', 'SEARCH_BY', 'LOGOUT', 'CHANGE_PASSWORD', 'RESULTS'
        ]);

        this.setup();

    }


    /**
     * Setup
     */
    public setup() {

        this.set("types", [
            Localizator.get('PRODUCT_CODE'),
            Localizator.get('PRODUCT_NAME'),
        ]);

        this.set("selectedType", 0);
        this.set('result', result);

        searchBar.on(SearchBar.submitEvent, function (args:EventData) {

            let search = <SearchBar>args.object;

            /**
             * Clear Results
             * @type {Array}
             */
            this.resetResults();

            let codes = <ApiCodesInterface[]>cache.get('codes'),
                hasMatch = false;

            for (let code of codes) {

                /**
                 * @type {string|string}
                 */
                let searchBy = this.get('selectedType') == 0 ? 'code' : 'name';

                /**
                 * Found Product Code
                 */
                if (code.product[searchBy].toUpperCase().indexOf(search.text.toUpperCase()) !== -1) {

                    console.log('found');
                    console.dir(code);

                    this.addProduct(code);

                    /**
                     * Clear Text after Search
                     * @type {string}
                     */
                    hasMatch = true;

                }

            }

            /**
             * Refresh Listview
             */
            listView.refresh();

            /**
             * Empty Search if has encounter a match
             */
            if (hasMatch)
                searchBar.text = "";

        }, this);

        /**
         * onItemTapped
         */
        listView.on(ListView.itemTapEvent, function (args:ItemEventData) {

            navigate.to('product-main-page', {
                context: result.getItem(args.index).context,
                backstackVisible: false
            });

        }, this);

    }

    /**
     * Reset Results
     */
    public resetResults() {

        while (result.length) {
            result.pop()
        }

    }

    /**
     * Add Product to search
     */
    public addProduct(code:ApiCodesInterface) {

        api.fetchImage(api.getBase() + code.product.image, function (source) {
            console.log(toBase64(source))
            result.push({
                name: code.product.name,
                source: toBase64(source),
                context: code
            });
        });

    }

    /**
     * Back to previous page
     */
    public tapBack() {
        navigate.back();
    }

}