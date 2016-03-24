import {Observable} from "data/observable";
import {BaseModelInterface} from "../Interfaces/BaseModelInterface";
import {BaseModel} from "./BaseModel";
import {LocalizedModelInterface} from "../Interfaces/LocalizedModelInterface";
import {cache, api, config, file} from "../Modules/Helpers";
import {Localization} from "../Modules/Localization";
var platformModule = require("platform");

export class LocalizedModel extends BaseModel implements LocalizedModelInterface {

    /**
     * Init
     */
    constructor() {
        super();

        var values = this.localize();

        /**
         * Todo
         * 1 - Figure out which language the user is using
         *     Check cache has language, if have ignores Device Language and use it instead
         *     cache.get('language', deviceLanguageForDefault)
         * 2 - Initialize Localization class and call the public method corresponding to the Default/Cached Language
         *   - var english = english() {}, if(english.hasOwnProperty('LOGIN')) english.LOGIN
         */

        var currentLanguage = cache.get('language', platformModule.device.language);

        var localization = new Localization();

        var languageList = localization[currentLanguage]()

        for (var index in values){
            var key = values[index];
            if(languageList.hasOwnProperty(key)){
                this.set(key, languageList[key]);
            } else {
                this.set(key, 'hello world');
            }
        }

    }

    abstract localize();

}