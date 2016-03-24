import {Observable} from "data/observable";
import {BaseModelInterface} from "../Interfaces/BaseModelInterface";
import {BaseModel} from "./BaseModel";
import {LocalizedModelInterface} from "../Interfaces/LocalizedModelInterface";
import {cache, api, config, file, lang} from "../Modules/Helpers";
import {Localization} from "../Modules/Localization";

export class LocalizedModel extends BaseModel implements LocalizedModelInterface {

    /**
     * Init
     */
    constructor() {
        super();

        var values = this.localize();

        var currentLanguage = lang.activeLanguage();
        console.dir(currentLanguage);
        var localization = new Localization();
        var languageList = localization[currentLanguage]();

        for (var index in values) {
            var key = values[index];
            if (languageList.hasOwnProperty(key)) {
                this.set(key, languageList[key]);
            } else {
                this.set(key, key);
            }
        }

    }

    abstract localize();

}