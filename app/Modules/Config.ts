import {ApiListInterface} from "../Interfaces/ApiListInterface";

export class Config {

    /**
     * List of Apis URL
     */
    public apis:ApiListInterface = {
        base: "cms.soapstudio.com",
        login: {POST: "api/user/login"},
        register: {POST: "api/user/register"},
        checkLogin: {POST: "api/auth/check"},
        countries: {GET: "api/form/countries"},
        ages: {GET: "api/form/ages"},
        product: {POST: "api/product"},
        products: { POST: "api/products" }
    };

    /**
     * Database Name
     */
    public databaseName = 'mirage_db';

}