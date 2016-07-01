import {parseURL} from "../../Modules/Helpers";
import {StackLayout} from "ui/layouts/stack-layout";
import {Label} from "ui/label";
import {GridLayout} from "ui/layouts/grid-layout";
import {ActivityIndicator} from "ui/activity-indicator";
import {ApiCodesInterface, ApiExtraInterface} from "../../Interfaces/ApiUserInterface";
import {Api as api} from "../../Classes/Api";
import {File as file} from "../../Classes/File";
import {Localizator} from "../../Classes/Localizator";
import {Video as video} from "../../Classes/Video";
import {Image} from "ui/image";
import {ImageSource} from "image-source";
import {GestureTypes} from "ui/gestures";
import {BaseModelWithMainNavigation} from "../../Models/BaseModelWithMainNavigation";
import dialogs = require("ui/dialogs");

let page, context:ApiCodesInterface, containers;

/**
 * Product Main Page Model
 */
export class ProductMainPageModel extends BaseModelWithMainNavigation {

    /**
     * Constructor
     */
    constructor(pageObject, contextObject:ApiCodesInterface) {

        super();

        page = pageObject;
        context = contextObject;

        /**
         * Localize
         */
        Localizator.localize(this,
            ['VIDEO_HOLOGRAM', 'PROFILE', 'SETTING', 'ABOUT_SOAP', 'NEWS', 'SEARCH']
        );

        containers = {
            profile: <StackLayout>page.getViewById('profile_container'),
            product: <StackLayout>page.getViewById('product_container'),
            extra: <StackLayout>page.getViewById('extras_container')
        };

        this.bind();

    }

    /**
     * Bind
     */
    public bind() {

        /**
         * Set Page Title
         */
        this.set('title', context.product.name.toUpperCase());

        /**
         * Profile Tab
         */
        this.bindProfileTab();

        containers.extra.removeChildren();

        /**
         * Bind products on Hologram Tab
         */
        for (var extra in context.product.extras) {
            this.bindVideoTab(context.product.extras[extra]);
        }

        /**
         * Bind Figure image
         */
        this.bindFigure();

    }

    /**
     * Bind data to profile tab
     */
    private bindProfileTab() {

        let container = containers.profile,
            title = container.getViewById('profile_title'),
            sub_title = container.getViewById('profile_sub_title'),
            image = container.getViewById('profile_poster'),
            description = container.getViewById('profile_description');

        sub_title.text = context.code;
        title.text = context.product.name;
        description.text = context.product.profile.description;

        api.fetchImage(api.getBase(context.product.profile.image), (imageSource) => {
            image.imageSource = imageSource;
        });

    }

    /**
     * Bind Image to Figure
     */
    private bindFigure() {

        let figure = <Image>containers.product.getChildAt(0);
        figure.imageSource = file.load(
            parseURL(context.product.image).filename
        );

    }

    /**
     * Setup extra container viewer
     * @param extra
     */
    private bindVideoTab(extra:ApiExtraInterface) {

        let title = new Label(),
            description = new Label(),
            loading = new ActivityIndicator(),
            image = new Image(),
            container = new GridLayout();

        /**
         * Style
         */
        title.className = "card-title";
        description.className = "card-description";
        loading.className = "card-loader";
        image.className = 'card-bg';
        container.className = 'card-container';

        if (!video.cached(extra.video)) {
            container.opacity = .3;
        }

        container.on(GestureTypes.tap, () => {

            container.isUserInteractionEnabled = false;

            video.play(extra, function () {
                container.isUserInteractionEnabled = true;
                container.opacity = 1;
            }, function () {
                container.isUserInteractionEnabled = true;
                container.opacity = .3;
                dialogs.alert(Localizator.get('DOWNLOAD_FAILED'));
            });

        });

        loading.busy = true;
        title.text = extra.title;
        description.text = extra.description;

        api.fetchImage(api.getBase(extra.image), (source:ImageSource) => {
            image.imageSource = source;
            loading.busy = false;
        });

        container.addChild(image);
        container.addChild(title);
        container.addChild(description);
        container.addChild(loading);

        containers.extra.addChild(container);

    }

}
