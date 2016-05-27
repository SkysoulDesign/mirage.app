import application = require("application");
import frameModule = require("ui/frame");
import {view} from "./Modules/Helpers";
import fontModule = require("ui/styling/font");
import {iWatch as Watch} from "./Modules/iWatch";
import orientation = require("nativescript-screen-orientation");
import {topmost} from "ui/frame";

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
                if (args.newValue === 'landscape' && topmost().currentPage.id != 'video') {
                    orientation.setCurrentOrientation("portrait", () => {
                        console.log('forced changing it back')
                    })
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