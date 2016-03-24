import {Observable, EventData} from "data/observable";
import {navigate, cache, lang} from "../Modules/Helpers";
import {LocalizedModelInterface} from "../Interfaces/LocalizedModelInterface";
import {LocalizedModel} from "./LocalizedModel";
import {Page} from "ui/page";
import dialogs = require("ui/dialogs");

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

            dialogs.confirm("Are you sure you want to change the language to " + lang.languages[data.value] ).then(function (result) {

                if (!result) return;

                lang.set(data.value);
                navigate.to('main-page');

            });

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