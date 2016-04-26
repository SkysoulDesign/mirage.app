import {SearchBar} from "ui/search-bar";
import {cache, navigate, api} from "../Modules/Helpers";
import {ApiCodesInterface} from "../Interfaces/ApiUserInterface";
import {LocalizedModelInterface} from "../Interfaces/LocalizedModelInterface";
import {LocalizedModel} from "./LocalizedModel";
import observableArray = require("data/observable-array");
import {ListView} from "ui/list-view";
import {Label} from "ui/label";
import {Image} from "ui/image";
import {StackLayout} from "ui/layouts/stack-layout";
import {ItemEventData} from "ui/list-view";
import {ObservableArray} from "data/observable-array";

export class SearchPageModel extends LocalizedModel implements LocalizedModelInterface {

    private searchBar:SearchBar;
    private container:StackLayout;
    private listView:ListView;
    private result = new ObservableArray();

    /**
     * Localize Model
     * @returns string[]
     */
    public localize() {
        return ['SEARCH', 'SEARCH_BY', 'LOGOUT', 'CHANGE_PASSWORD', 'RESULTS'];
    }

    /**
     * Setup
     */
    public setup() {

        var _this = this;

        this.initListView();

        this.set("types", ['Product Code', 'Product Name']);
        this.set("selectedType", 0);

        this.searchBar.on(SearchBar.submitEvent, function (data) {

            /**
             * Clear Results
             * @type {Array}
             */
            _this.resetResults();

            var codes = <ApiCodesInterface[]>cache.get('login.codes'),
                hasMatch = false;

            for (let code of codes) {

                /**
                 * @type {string|string}
                 */
                let searchBy = _this.get('selectedType') == 0 ? 'code' : 'name';

                /**
                 * Found Product Code
                 */
                if (code.product[searchBy].toUpperCase().indexOf(data.object.text.toUpperCase()) !== -1) {

                    _this.addProduct(code);

                    /**
                     * Clear Text after Search
                     * @type {string}
                     */
                    hasMatch = true;
                }

            }

            /**
             * Empty Search if has encounter a match
             */
            if (hasMatch)
                _this.searchBar.text = "";

        })

    }

    /**
     * Init List View
     */
    public initListView() {

        var _this = this;

        this.listView = new ListView();

        this.listView.className = "result-view";
        this.listView.rowHeight = 100;
        this.listView.minHeight = 1000;

        this.listView.items = _this.result;

        /**
         * Navigate to Product When Tapped
         */
        this.listView.on(ListView.itemTapEvent, function (args:ItemEventData) {
            navigate.to('product-main-page', {context: _this.result.getItem(args.index)});
        });

        this.listView.on(ListView.itemLoadingEvent, function (args:ItemEventData) {

            if (!args.view)
                args.view = _this.createItemsView();

            let item:ApiCodesInterface = _this.result.getItem(args.index),
                image = <Image>args.view.getChildAt(0),
                name = <Label>args.view.getChildAt(1);

            /**
             * no items found
             */
            if (!item)
                return console.log('no items found');

            api.fetchImage(api.getBase() + item.product.image, function (img) {
                image.imageSource = img
            });

            name.text = item.product.name;

        });

        /**
         * Add to the page
         */
        this.container.addChild(this.listView);

    }

    /**
     * Create Items view for listView
     * @returns {"ui/layouts/stack-layout".StackLayout}
     */
    public createItemsView():StackLayout {

        let stackLayout = new StackLayout(),
            image = new Image(),
            name = new Label();

        name.className = 'result-product-name';
        image.className = 'result-product-image';
        stackLayout.className = 'result-container';
        stackLayout.orientation = 'horizontal';

        stackLayout.addChild(image);
        stackLayout.addChild(name);

        return stackLayout;
    }

    /**
     * Reset Results
     */
    public resetResults() {

        while (this.result.length) {
            this.result.pop()
        }

    }

    /**
     * Add Product to search
     */
    public addProduct(code:ApiCodesInterface) {
        this.result.push(code);
        // this.listView.refresh();
    }

    /**
     * Back to previous page
     */
    public tapBack() {
        navigate.back();
    }

}