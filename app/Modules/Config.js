"use strict";
var Config = (function () {
    function Config() {
        /**
         * List of Apis URL
         */
        this.apis = {
            base: "cms.soapstudio.com",
            login: { POST: "api/user/login" },
            register: { POST: "api/user/register" },
            checkLogin: { POST: "api/auth/check" },
            countries: { GET: "api/form/countries" },
            ages: { GET: "api/form/ages" },
            product: { POST: "api/product" },
            products: { POST: "api/products" }
        };
        /**
         * Database Name
         */
        this.databaseName = 'mirage_db';
    }
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=Config.js.map