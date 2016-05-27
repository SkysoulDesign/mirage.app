import {Observable} from "data/observable";
import {extend, getKeyByValue} from "../../Modules/Helpers";
import {Page} from "ui/page";
import dialogs = require("ui/dialogs");
import {Localizator} from "../../Classes/Localizator";
import {Cache as cache} from "../../Classes/Cache";
import {Api as api} from "../../Classes/Api";
import {Navigator as navigate} from "../../Classes/Navigator";
import {PropertyChangeData} from "data/observable";

let page;

export class SettingsModel extends Observable {

    /**
     * Constructor
     */
    public constructor(pageObject:Page) {

        super();

        page = pageObject;

        Localizator.localize(this, [
            'SETTING', 'LANGUAGE', 'LOGOUT', 'CHANGE_PASSWORD'
        ]);

        this.setup();

    }

    /**
     * Setup
     */
    public setup() {

        let languages = Localizator.getLanguagesAsArray(),
            index = Localizator.getUserLanguageIndex();

        this.set("languages", languages);
        this.set("selectedLanguage", index);

        this.on(Observable.propertyChangeEvent, function (data:PropertyChangeData) {

            /**
             * Only for selectedLanguage
             */
            if (data.propertyName !== 'selectedLanguage')
                return;

            let language = languages[data.value];

            dialogs.confirm(Localizator.get('CONFIRM_CHANGE_LANGUAGE') + language).then(function (result) {

                if (!result) return;

                cache.set('language', {
                    name: language,
                    code: getKeyByValue(Localizator.getLanguages(), language)
                });

                console.dir(cache.get('language'));

                dialogs.alert({
                    title: Localizator.get('ATTENTION'),
                    message: Localizator.get('RESTART_APP'),
                    okButtonText: Localizator.get('OKAY'),
                });

            });

        });

    }

    /**
     * Navigate to Screen
     */
    public tapLogout() {
        cache.reset();
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