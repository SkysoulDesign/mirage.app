import {TextField} from "ui/text-field";
import {Observable} from "data/observable";
import {Localizator} from "../../Classes/Localizator";
import {File as file} from "../../Classes/File";
import {Api as api} from "../../Classes/Api";
import {Cache as cache} from "../../Classes/Cache";
import {Navigator as navigate} from "../../Classes/Navigator";
import dialogs = require("ui/dialogs");
import {ImageSource} from "image-source";
import {Image} from "ui/image";
import {Button} from "ui/button";
import {Page} from "ui/page";

let page,
    registerButton, figurine;

/**
 * Register Product Model
 */
export class RegisterProductModel extends Observable {

    private invalidMessage:string = 'Invalid Code';

    /**
     * Constructor
     */
    constructor(pageObject:Page) {

        super();

        page = pageObject;
        figurine = <Image>page.getViewById('figure');
        registerButton = <Button>page.getViewById('register_button');

        Localizator.localize(this, [
            'REGISTER', 'PASSWORD', 'INPUT_TEXT'
        ]);

        this.disableButton();
        this.register();

    }

    /**
     * Register Listeners
     */
    public register() {

        let self = this;

        this.on(TextField.propertyChangeEvent, function (args:any) {

            if (self.validate(args.value.toString()))
                return self.disableButton();

            /**
             * Enable Button
             * @type {boolean}
             */
            self.enableButton();

            /**
             * Disable Rechecks
             */
            self.set('isLoading', true);

            /**
             * Prepare Request
             * @type {{product_id: string, encode_image: boolean}}
             */
            let request = {
                    product_id: args.value.substr(0, 5).toUpperCase(),
                    encode_image: true
                },
                onCached = function (source:ImageSource) {
                    figurine.imageSource = source;
                    console.log(args.value.toString())
                    self.tapRegister(args.value.toString());
                },
                onSuccess = function ({code, image}) {

                    console.log("success, loading image and registering");
                    console.log(code);

                    let filename = code + "-figurine.png";

                    /**
                     * Cache image
                     */
                    file.saveFromBase64(image.encoded, filename);

                    self.set('isLoading', false);
                    figurine.imageSource = file.load(filename);
                    console.log(args.value.toString())
                    self.tapRegister(args.value.toString());

                },
                onError = function (errors) {
                    console.log('Ooops Error', errors);
                    self.set('isLoading', false);
                    self.disableButton();
                    alert(self.invalidMessage);
                };

            /**
             * Check if its cached
             */
            if (file.has(request.product_id + '-figurine.png'))
                return onCached(file.load(request.product_id + '-figurine.png'));

            /**
             * fetch product
             */
            api.fetch('product', request, onSuccess, onError, false);

        });

    }

    /**
     * Navigate to Account
     */
    public tapRegister(c = null) {

        let self = this,
            code = c ? c : this.get('code');

        console.log('going code')
        console.log(code)

        self.disableButton();

        if (self.validate(code)) {

            console.log('Invalid code');

            return dialogs.confirm(self.invalidMessage).then(() => {
                self.disableButton();
            });

        }

        let request = {code: code.replace(/-/g, '')},
            onSuccess = function () {

                /**
                 * Re-Fetch user info and cache it
                 */
                api.fetch('checkLogin', {}, ({codes}) => {

                    console.log('codes Received');

                    cache.set('codes', codes);

                    self.set('isLoading', false);

                    let options = {
                        title: "Success",
                        message: "Product Registered Successfully",
                        okButtonText: "OK"
                    };

                    dialogs.alert(options).then(() => {
                        navigate.to("main-page", {clearHistory: true});
                    });

                }, null, false);

            },
            onError = function () {

                dialogs.confirm(self.invalidMessage).then(() => {
                    self.set('isLoading', false);
                    self.enableButton();
                });

            };

        this.set('isLoading', true);

        api.fetch('registerProduct', request, onSuccess, onError, false);

    }

    /**
     * Validate Code
     * @param code
     * @returns {boolean}
     */
    public validate(code:string):boolean {
        let index = code.indexOf('-') === -1;
        return (code.length != 17 && index) || (code.length != 20 && !index);
    }

    /**
     * Enable Button
     */
    public enableButton() {
        registerButton.isUserInteractionEnabled = true;
        registerButton.isEnabled = true;
        registerButton.className = 'enabled';
    }

    /**
     * Disable Button
     */
    public disableButton() {
        registerButton.isUserInteractionEnabled = false;
        registerButton.isEnabled = false;
        registerButton.className = 'disabled';
    }

}