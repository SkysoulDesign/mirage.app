import {Observable, EventData} from "data/observable";
import {navigate, cache} from "../Modules/Helpers";

export class SettingsPageModel extends Observable {

    /**
     * Constructor
     */
    public constructor() {
        super();
        this.set("languages", ["English", "日本語", "한국어", "繁體字", "简体字"]);
        this.set("selectedLanguage", 0);
        this.addEventListener(Observable.propertyChangeEvent, function (pcd:EventData) {
            console.log(pcd.eventName.toString() + " " + pcd.propertyName.toString() + " " + pcd.value.toString());
        });
    }

    /**
     * Navigate to Screen
     */
    public tapLogout() {
        cache.remove('login');
        navigate.to('login', {clearHistory: true});
    };

}