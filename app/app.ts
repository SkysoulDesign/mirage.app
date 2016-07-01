import application = require("application");
import frameModule = require("ui/frame");
import {view, isIOS, isAndroid} from "./Modules/Helpers";
import fontModule = require("ui/styling/font");
import {iWatch as Watch} from "./Modules/iWatch";
import orientation = require("nativescript-screen-orientation");
import {topmost} from "ui/frame";

/**
 * Fix For Rotation lock on ios
 * @type {boolean}
 */
global.leaving = false;

/**
 * Mirage App
 */
export namespace Mirage {

    /**
     * Helpers
     */
    export var iWatch = application.ios ? new Watch() : null;

    /**
     * Start The Application
     */
    export class App {

        /**
         * Main View Variable
         * @type string
         */
        private view:string = "main-page";

        /**
         * Initialize The Application
         */
        constructor() {

            /**
             * Register Font on Ios
             */
            if (application.ios)
                fontModule.ios.registerFont("SourceSansPro-Regular.otf");

            /**
             * Initiate the Main App View
             */
            this.start();

        }

        /**
         * Start The Application
         */
        public start() {

            /**
             * Force device orientation to be Portrait
             */
            application.on(application.orientationChangedEvent, function (args:application.OrientationChangedEventData) {

                if (!topmost().currentPage)
                    return;

                if (args.newValue === 'landscape' && topmost().currentPage.id != 'video') {

                    if (isIOS())
                        UIDevice.currentDevice().setValueForKey(
                            NSNumber.numberWithInteger(UIInterfaceOrientationPortrait), "orientation"
                        );

                    if (isAndroid())
                        orientation.setCurrentOrientation("portrait", () => {
                            console.log('forced changing it back')
                        })
                }

                if (isIOS() && args.newValue === 'portrait' &&
                    topmost().currentPage.id === 'video' &&
                    global.leaving === false) {
                    UIDevice.currentDevice().setValueForKey(
                        NSNumber.numberWithInteger(UIInterfaceOrientationLandscapeLeft), "orientation"
                    );
                }

            });

            application.start({moduleName: view(this.view)});
            application.cssFile = './app.css';

        }

    }

}

/**
 * Start App
 * @type {Mirage.App}
 */
let app = new Mirage.App();
