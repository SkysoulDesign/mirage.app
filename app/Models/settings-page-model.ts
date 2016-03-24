import {Observable, EventData} from "data/observable";
import {navigate, cache, lang} from "../Modules/Helpers";
import {LocalizedModelInterface} from "../Interfaces/LocalizedModelInterface";
import {LocalizedModel} from "./LocalizedModel";
import {Page} from "ui/page";

export class SettingsPageModel extends LocalizedModel implements LocalizedModelInterface {

    private page:Page;

    /**
     * Constructor
     */
    public constructor() {
        super();
    }

    /**
     * Setup
     */
    public setup() {

        this.set("languages", lang.getLanguages());
        this.set("selectedLanguage", lang.getIndex());

        this.addEventListener(Observable.propertyChangeEvent, function (data:EventData) {
            lang.set(data.value);
        });

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