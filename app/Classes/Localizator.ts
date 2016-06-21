import {Cache as cache} from "../Classes/Cache";
import {device} from "platform";
import {languages, defaultLanguage} from "../Classes/Config";
import {Observable} from "data/observable";
import {Localization} from "../Modules/Localization";
import {isNullOrUndefined} from "utils/types";
import {LanguageInterface} from "../Interfaces/LanguageInterface";

/**
 * Navigator Class
 */
export class Localizator {

    /**
     * Localize a model
     * @param model
     * @param data
     */
    public static localize(model:Observable, data:string[] = []) {

        let localization = new Localization(),
            language = this.getUserLanguage(),
            translations = <[]>localization[language.code]();

        data.forEach(function (item:string) {

            let translation = translations[item];

            if (isNullOrUndefined(translation))
                translation = null;

            model.set(item, translation);

        })

    }

    /**
     * Get Localized key
     * @param key
     */
    public static get(key:string) {

        let localization = new Localization,
            language = this.getUserLanguage(),
            translations = localization[language.code]();

        return translations[key];

    }

    /**
     * Set Language
     * @param language
     * @param defaults
     */
    public static set(language:string, defaults:LanguageInterface = defaultLanguage) {
        cache.set('language',
            languages.hasOwnProperty(language) ? languages[language] : defaults
        );
    }

    /**
     * Get all Languages as {en:English, ...}
     * @returns array
     */
    public static getLanguages():{} {
        return languages;
    }

    /**
     * Get all Languages as [english, korean, japanese...]
     * @returns array
     */
    public static getLanguagesAsArray():string[] {
        let lang = [];
        for (let index in languages) lang.push(languages[index])
        return lang;
    }

    /**
     * Get index of user current language
     * @returns {any}
     */
    public static getUserLanguageIndex():number {
        return this.getLanguagesAsArray().indexOf(this.getUserLanguage().name);
    }

    /**
     * Get User defined Language
     */
    public static getUserLanguage():LanguageInterface {

        var language = <LanguageInterface>cache.get('language', defaultLanguage);

        if (isNullOrUndefined(language))
            language = this.getDeviceLanguage();

        return language;
    }

    /**
     * Get Device Language
     * @returns string
     */
    public static getDeviceLanguage():LanguageInterface {

        /**
         * Language
         * @type {string}
         */
        let language = device.language.slice(0, 2);

        console.dir('selecting language ' + language);

        if (!languages.hasOwnProperty(language))
            return defaultLanguage;

        /**
         * Check if its chinese
         */
        if (language === 'zh')
            switch (device.region.toLocaleLowerCase()) {
                case 'hk':
                case 'tw':
                    language += '_tw'; //zh_tw
                    break;
            }

        return {
            code: language,
            name: languages[language],
        };

    }

}