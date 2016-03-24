import {Observable, EventData} from "data/observable";
import {navigate, cache, lang} from "../Modules/Helpers";
import {LocalizedModelInterface} from "../Interfaces/LocalizedModelInterface";
import {LocalizedModel} from "./LocalizedModel";

export class SettingsPageModel extends LocalizedModel implements LocalizedModelInterface {

    /**
     * Constructor
     */
    public constructor() {

        super();

        this.set("languages", lang.getLanguages());
        this.set("selectedLanguage", lang.getIndex());

        this.addEventListener(Observable.propertyChangeEvent, function (data:EventData) {
            lang.set(data.value);
        });

    }

    public setup() {
    }

    /**
     * Localize Model
     * @returns {string[]}
     */
    public localize() {
        return ['SETTING', 'LANGUAGE', 'NEWS_LETTER', 'LOGOUT'];
    }

    /**
     * Navigate to Screen
     */
    public tapLogout() {
        cache.remove('login');
        navigate.to('login', {clearHistory: true});
    };

    /**
     * Back to previous page
     */
    public tapBack() {
        navigate.back();
    }

}