import {Observable} from "data/observable";
import {Mirage as App} from "../app";

export class SettingsPageModel extends Observable {

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
        App.navigate.to("login", this.navigationEntry);
    };

    /**
     * Navigate to Language
     */
    public tapLanguage() {
        App.navigate.to("language", this.navigationEntry);
    };

    /**
     * Navigate to Screen
     */
    public tapScreen() {
        // App.navigate.to("screen-size", this.navigationEntry);
    };

}