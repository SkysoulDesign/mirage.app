"use strict";
var application = require("application");
var Config_1 = require("./Modules/Config");
var Navigator_1 = require("./Modules/Navigator");
var Api_1 = require("./Modules/Api");
var Database_1 = require("./Modules/Database");
var Helpers_1 = require("./Modules/Helpers");
/**
 * Mirage App
 */
var Mirage;
(function (Mirage) {
    Mirage.config = new Config_1.Config();
    /**
     * Helpers
     */
    Mirage.navigate = new Navigator_1.Navigator();
    Mirage.api = new Api_1.Api();
    Mirage.database = new Database_1.Database();
    /**
     * Start The Application
     */
    var App = (function () {
        function App() {
            /**
             * Main View Variable
             * @type {string}
             */
            this.launch_view = "launch-page";
        }
        /**
         * Initialize The Application
         */
        App.prototype.init = function () {
            /**
             * Initiate the Main App View
             */
            this.start(Helpers_1.view(this.launch_view));
            /**
             * Check if the app was lunch for the first time
             */
            //if (settings.getFirstLoadApp()) {
            //    settings.setFirstLoadApp(false);
            //    return this.start(view(this.first_launch_view));
            //}
            //console.log(settings.isFirstLaunch());
        };
        /**
         * Start The Application
         */
        App.prototype.start = function (view) {
            application.start({ moduleName: view });
            application.cssFile = './app.css';
        };
        return App;
    }());
    Mirage.App = App;
})(Mirage = exports.Mirage || (exports.Mirage = {}));
/**
 * Start App
 * @type {Mirage.App}
 */
var app = (new Mirage.App()).init();
//# sourceMappingURL=app.js.map