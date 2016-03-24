import {Observable} from "data/observable";
import {BaseModelInterface} from "../Interfaces/BaseModelInterface";
import {BaseModel} from "./BaseModel";
import {LocalizedModelInterface} from "../Interfaces/LocalizedModelInterface";

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

        for (var key in values){
            this.set(values[key], 'hello world');
        }

    }

    abstract localize();

}