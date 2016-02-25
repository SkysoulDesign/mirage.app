import {Observable} from "data/observable";
import {navigate} from "../Modules/Helpers";

export class SettingsPageModel extends Observable {

    public constructor() {
        super();
        this.set("languages", ["English", "日本語", "한국어", "繁體字", "简体字"]);
        this.set("selectedLanguage", 0);
        this.addEventListener(Observable.propertyChangeEvent,function(pcd){
            console.log(pcd.eventName.toString() + " " + pcd.propertyName.toString() + " " + pcd.value.toString());
        });
    }
    /**
     * Defaults
     * @type {{backstackVisible: boolean, context: string}}
     */
    private navigationEntry = {
        backstackVisible: false,
        context: "setting"
    };

    /**
     * Navigate to Account
     */
    public tapAccount() {
        navigate.to("login", this.navigationEntry);
    };

    /**
     * Navigate to Language
     */
    public tapLanguage() {
        // navigate.to("language", this.navigationEntry);
    };

    /**
     * Navigate to Screen
     */
    public tapScreen() {
        // navigate.to("screen-size", this.navigationEntry);
    };

}