import {Observable} from "data/observable";
import {navigate, api, file, parseURL} from "../Modules/Helpers";
import {ApiUserInterface, ApiExtraInterface} from "../Interfaces/ApiUserInterface";
import stackModule = require("ui/layouts/stack-layout");
import imageModule = require('ui/image');
import LabelModule = require("ui/label");
import gridModule  = require ("ui/layouts/grid-layout");
import {GestureTypes} from "ui/gestures";
import activityIndicatorModule = require("ui/activity-indicator");
import {ApiCodesInterface} from "../Interfaces/ApiUserInterface";
import {Page} from "ui/page";
import scrollViewModule = require("ui/scroll-view");
import {ApiProfileInterface} from "../Interfaces/ApiUserInterface";
import {LocalizedModelWithNavigation} from "./LocalizedModelWithNavigation";
import {LocalizedModelInterface} from "../Interfaces/LocalizedModelInterface";

export class ProductMainPageModel extends LocalizedModelWithNavigation implements LocalizedModelInterface {

    private page:Page;
    private codes:ApiCodesInterface;
    private components:{profile:{}, figure:{}, extra:{}} = {};

    /**
     * Constructor
     */
    constructor() {

        super();

        /**
         * Profile Tab
         * @type {{name: "ui/label".Label, code: "ui/label".Label}}
         */
        this.components.profile = {
            name: new LabelModule.Label(),
            code: new LabelModule.Label(),
            image: new imageModule.Image(),
            description: new LabelModule.Label(),
            scroll: new scrollViewModule.ScrollView(),
            stack: function () {
                return new stackModule.StackLayout();
            },
        };

        this.components.profile.name.className = "header-title";
        this.components.profile.code.className = "header-description";

        /**
         * Figure
         * @type {{image: "ui/image".Image}}
         */
        this.components.figure = {
            image: new imageModule.Image(),
        };

        this.components.figure.image.className = 'statue';

        /**
         * Extra Container
         * @returns {{title, description, loading: activityIndicatorModule.ActivityIndicator, image, grid: org.nativescript.widgets.GridLayout}}
         */
        this.components.extra = function () {

            /**
             * Extra Content
             * @type {{title: "ui/label".Label, description: "ui/label".Label, image: "ui/image".Image}}
             */
            var extra = {
                title: new LabelModule.Label(),
                description: new LabelModule.Label(),
                loading: new activityIndicatorModule.ActivityIndicator(),
                image: new imageModule.Image(),
                grid: new gridModule.GridLayout()
            };

            extra.title.className = "card-title";
            extra.description.className = "card-description";
            extra.loading.className = "card-loader";
            extra.image.className = 'card-bg';
            extra.grid.className = 'card-container';

            return extra;

        };

    }

    /**
     * Setup
     */
    public setup() {

        this.set('title', this.codes.product.name.toUpperCase());

        var components = this.components,
            profile_tab_container = this.page.getViewById('profile_container'),
            figure_container = this.page.getViewById('product_container');
            figure_container.addChild(components.figure.image);

        var extra_container = <stackModule.StackLayout>this.page.getViewById('extras_container');

        for (var extra in this.codes.product.extras) {
            this.setupContainer(extra_container, this.codes.product.extras[extra]);
        }

        this.addFigureImage();
        this.setupProfileTab(profile_tab_container, this.codes.product.profile);

    }

    /**
     * Localize Model
     * @returns {string[]}
     */
    public localize() {
        return ['VIDEO_HOLOGRAM', 'PROFILE'];
    }

    /**
     * Setup Profile Tab
     */
    private setupProfileTab(container, profile:ApiProfileInterface) {

        console.dir(this.codes);

        var stack = new stackModule.StackLayout();
            stack.className = 'details-header-container';

        var title = new LabelModule.Label();
            title.className = 'header-title';
            title.text = this.codes.product.name;

        var sub_title = new LabelModule.Label();
            sub_title.className = 'header-description';
            sub_title.text = this.codes.code;

        var image = new imageModule.Image();

        api.fetchImage(api.getBase() + profile.image, function (imageSource) {
            image.imageSource = imageSource;
        });

        var description = new LabelModule.Label();
            description.className = 'content-description';
            description.text = profile.description;
            description.textWrap = true;

        stack.addChild(title);
        stack.addChild(sub_title);

        container.addChild(image);
        container.addChild(stack);
        container.addChild(description);

    }

    /**
     * Add Toy Figure
     */
    private addFigureImage() {
        this.components.figure.image.imageSource = file.load(parseURL(this.codes.product.image).filename);
    }

    /**
     * Setup extra container viewer
     * @param container
     * @param extra
     */
    private setupContainer(container, extra:ApiExtraInterface) {

        var comp = this.components.extra();

        comp.grid.className = 'card-container';
        comp.grid.on(GestureTypes.tap, function () {
            navigate.to('video', {context: extra.id})
        });

        comp.loading.busy = true;

        comp.title.text = extra.title;
        comp.title.className = "card-title";

        comp.description.text = extra.description;
        comp.description.className = "card-description";

        comp.image.className = 'card-bg';

        api.fetchImage(api.getBase() + extra.image, function (imageSource) {
            comp.image.imageSource = imageSource;
            comp.loading.busy = false;
        });

        comp.grid.addChild(comp.image);
        comp.grid.addChild(comp.title);
        comp.grid.addChild(comp.description);
        comp.grid.addChild(comp.loading);

        container.addChild(comp.grid);

    }

}