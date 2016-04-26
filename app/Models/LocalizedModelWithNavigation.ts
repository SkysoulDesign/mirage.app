import {LocalizedModelInterface} from "../Interfaces/LocalizedModelInterface";
import {lang} from "../Modules/Helpers";
import {Localization} from "../Modules/Localization";
import {BaseModelWithMainNavigation} from "./BaseModelWithMainNavigation";

export class LocalizedModelWithNavigation extends BaseModelWithMainNavigation implements LocalizedModelInterface {

    /**
     * Init
     */
    constructor() {
        super();

        var values = this.localize();

        var currentLanguage = lang.activeLanguage();
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