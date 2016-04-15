import {Observable, EventData} from "data/observable";
import {navigate, cache, lang, general, extend, api} from "../Modules/Helpers";
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

            dialogs.confirm("Are you sure you want to change the language to " + lang.languages[data.value]).then(function (result) {

                if (!result) return;

                lang.set(data.value);

                general.refreshCache(data => {
                    navigate.to('main-page');
                });

            });

        });

    }

    /**
     * Localize Model
     * @returns string[]
     */
    public localize() {
        return ['SETTING', 'LANGUAGE', 'LOGOUT', 'CHANGE_PASSWORD']; //'NEWS_LETTER'
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

    /**
     * Change Password
     */
    public tapChangePassword() {

        var result = {current: null, password: null, password_confirmation: null},
            common = {
                title: "Change Password",
                message: "Please input your current password",
                okButtonText: "Okay",
                cancelButtonText: "Cancel",
                defaultText: "",
                inputType: dialogs.inputType.password
            };

        dialogs.prompt(extend(common, {
            title: "Change Password",
            message: "Please input your current password",
        })).then(r => {

            result.current = r.text;

            dialogs.prompt(extend(common, {
                title: "New Password",
                message: "Please input your a new password",
            })).then(r => {

                result.password = r.text;

                dialogs.prompt(extend(common, {
                    title: "Change Confirm New Password",
                    message: "Please input your new password confirmation",
                })).then(r => {

                    result.password_confirmation = r.text;

                    api.fetch('changePassword', result, function (data) {
                        alert(data.status);
                    }, function (errors) {
                        api.alertErrors(errors)
                    })

                });

            });

        })

    }

}