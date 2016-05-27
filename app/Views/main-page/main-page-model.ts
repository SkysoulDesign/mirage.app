import {parseURL, isEven} from "../../Modules/Helpers";
import {Image} from "ui/image";
import {GestureTypes} from "ui/gestures";
import {StackLayout} from "ui/layouts/stack-layout";
import {Localizator} from "../../Classes/Localizator";
import {Cache as cache} from "../../Classes/Cache";
import {Api as api} from "../../Classes/Api";
import {ApiCodesInterface, ApiProductInterface} from "../../Interfaces/ApiUserInterface";
import {BaseModelWithMainNavigation} from "../../Models/BaseModelWithMainNavigation";
import {Page} from "ui/page";
import {Progress} from "ui/progress";

let page;

/**
 * Main page Model
 */
export class MainPageModel extends BaseModelWithMainNavigation {

    /**
     * Constructor
     */
    constructor(pageObject:Page) {

        super();

        page = pageObject;

        Localizator.localize(this, [
            'SETTING', 'ABOUT_SOAP', 'NEWS', 'MY_COLLECTION', 'MAIN_PAGE_TITLE', 'SEARCH'
        ]);

        this.setup();

    }

    /**
     * Setup
     */
    public setup() {

        let codes = <ApiCodesInterface[]>cache.get('codes', []),
            products = <ApiProductInterface[]>cache.get('products', []),
            progressData = {
                max: products.length,
                value: codes.length
            };

        this.set('progress_text', progressData.value + ' of ' + progressData.max);

        let progress = <Progress>page.getViewById('progress'),
            container = <StackLayout>page.getViewById("product_layout");

        progress.className = "progress-bar";
        progress.maxValue = progressData.max;
        progress.value = progressData.value;

        container.removeChildren();

        for (var x in codes) {

            let image = this.createImage(codes[x]);
                image.cssClass = isEven(x) ? 'background-statue' : 'foreground-statue';

            container.addChild(image);

        }

    }

    /**
     * Create Image
     * @param code
     * @returns {"ui/image".Image}
     */
    private createImage(code:ApiCodesInterface):Image {

        var self = this,
            image = new Image(),
            url = parseURL(code.product.image);

        console.log('Image Url');
        console.dir(url);

        api.fetchImage(api.getBase(url.full), function (imageSource) {
            console.log('Finished loading image ' + url.filename);
            image.imageSource = imageSource;
        });

        image.on(GestureTypes.tap, function () {
            self.tapProduct(code);
        });

        return image;

    }

}

