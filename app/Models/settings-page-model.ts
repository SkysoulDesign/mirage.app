import {Observable} from "data/observable";
import {navigate} from "../Modules/Helpers";

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
        navigate.to("login", this.navigationEntry);
    };

    /**
     * Navigate to Language
     */
    public tapLanguage() {
        navigate.to("language", this.navigationEntry);
    };

    /**
     * Navigate to Screen
     */
    public tapScreen() {
        // navigate.to("screen-size", this.navigationEntry);
    };

}