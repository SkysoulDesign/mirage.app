import application = require("application");
import frameModule = require("ui/frame");
import {Config} from "./Modules/Config";
import {Navigator} from "./Modules/Navigator";
import {Api} from "./Modules/Api";
import {Database} from "./Modules/Database";
import {view} from "./Modules/Helpers";
import fontModule = require("ui/styling/font");

/**
 * Mirage App
 */
export namespace Mirage {

    export var config = new Config();

    /**
     * Helpers
     */
    export var navigate = new Navigator();
    export var api = new Api();
    export var database = new Database();

    /**
     * Start The Application
     */
    export class App {

        /**
         * Main View Variable
         * @type {string}
         */
        private view:string = "main-page"; //launch-page

        /**
         * Initialize The Application
         */
        public init() {

            /**
             * Register Font on Ios
             */
            if (application.ios) {
                fontModule.ios.registerFont("SourceSansPro-Regular.otf");
            }

            /**
             * Initiate the Main App View
             */
            this.start(view(this.view));

        }

        /**
         * Start The Application
         */
        public start(view:string) {

            application.start({moduleName: view});
            application.cssFile = './app.css';

        }

    }

}

/**
 * Start App
 * @type {Mirage.App}
 */
var app = (new Mirage.App()).init();