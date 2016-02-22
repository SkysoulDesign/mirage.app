import application = require("application");
import frameModule = require("ui/frame");
import {Config} from "./Modules/Config";
import {Navigator} from "./Modules/Navigator";
import {Api} from "./Modules/Api";
import {Database} from "./Modules/Database";
import {view} from "./Modules/Helpers";

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
        private launch_view:string = "launch-page"; //launch-page

        /**
         * Initialize The Application
         */
        public init() {

            /**
             * Initiate the Main App View
             */
            this.start(view(this.launch_view));

            /**
             * Check if the app was lunch for the first time
             */
            //if (settings.getFirstLoadApp()) {
            //    settings.setFirstLoadApp(false);
            //    return this.start(view(this.first_launch_view));
            //}

            //console.log(settings.isFirstLaunch());


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