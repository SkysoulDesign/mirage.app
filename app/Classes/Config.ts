import {ApiListInterface} from "../Interfaces/ApiListInterface";
import {LanguageInterface} from "../Interfaces/LanguageInterface";

/**
 * Available languages
 * @type {{en: string, zh: string, zh_tw: string, ja: string}}
 */
export var languages = {
    'en': 'English',
    'zh': '简体字',
    'zh_tw': '繁體字',
    'ja': '日本',
};

export var defaultLanguage:LanguageInterface = {
    code: 'en',
    name: languages['en'],
};

/**
 * List of Apis URL
 */
export var apis:ApiListInterface = {
    base: "cms.soapstudio.com",
    login: {POST: "api/user/login"},
    register: {POST: "api/user/register"},
    checkLogin: {POST: "api/auth/check"},
    countries: {GET: "api/form/countries"},
    ages: {GET: "api/form/ages"},
    product: {POST: "api/product"},
    products: {POST: "api/products"},
    registerProduct: {POST: "api/product/register"},
    resetPassword: {POST: "api/user/reset"},
    changePassword: {POST: "api/user/changePass"}
};