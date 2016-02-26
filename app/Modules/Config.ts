import {ApiListInterface} from "../Interfaces/ApiListInterface";

export class Config {

    /**
     * List of Apis URL
     */
    public apis:ApiListInterface = {
        base: "192.168.1.253",//cms.soapstudio.com",
        login: {POST: "api/user/login"},
        register: {POST: "api/user/register"},
        checkLogin: {POST: "api/auth/check"},
        countries: {GET: "api/form/countries"},
        ages: {GET: "api/form/ages"},
        product: {POST: "api/product"},
        products: {POST: "api/products"}
    };

    /**
     * Database Name
     */
    public databaseName = 'mirage_db';

    /**
     * Languages
     */
    public languages = ['English', 'Japanese', 'Korean', 'Traditional Chinese', 'Simplified Chinese'];
    public default_language = 'Korean';

    /**
     * File
     */
    public internal_folder_name = "mirage";

}