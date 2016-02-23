var database = require('application-settings');
var Helpers_1 = require("./Helpers");
var app_1 = require("../app");
var Database = (function () {
    function Database() {
        /**
         * Database Name
         * @type {string}
         */
        this.databaseName = app_1.Mirage.config.databaseName;
    }
    /**
     * Temporary fix for a bug on android on calling this method on the Constructor
     * @returns {any}
     */
    Database.prototype.setup = function () {
        if (database.hasKey(this.databaseName))
            return JSON.parse(database.getString(this.databaseName));
        database.setString(this.databaseName, JSON.stringify({ created_at: new Date(), api: {} }));
        return this.setup();
    };
    /**
     * Check if key Exists
     * @param key
     * @returns {boolean}
     */
    Database.prototype.has = function (key) {
        return this.setup().hasOwnProperty(key);
    };
    /**
     * Get Key from Database
     * @param key
     */
    Database.prototype.get = function (key) {
        if (Helpers_1.isJSON(key)) {
            return JSON.parse(key);
        }
        if (this.has(key)) {
            var result = this.setup()[key];
            if (Helpers_1.isJSON(result))
                return this.get(result);
            return result;
        }
    };
    /**
     * Set Keys from an Array
     * @param values
     */
    Database.prototype.setFromArray = function (values) {
        var db = this.setup();
        for (var key in values) {
            db[key] = values[key];
        }
        this.save(db);
    };
    /**
     * Set Key in the Database
     * @param key
     * @param value
     */
    Database.prototype.set = function (key, value) {
        var db = this.setup();
        db[key] = value;
        this.save(db);
    };
    /**
     * Save Database
     * @param db
     */
    Database.prototype.save = function (db) {
        database.setString(this.databaseName, JSON.stringify(db));
    };
    /**
     * Remove key from database
     * @param key
     */
    Database.prototype.remove = function (key) {
        delete this.setup()[key];
    };
    /**
     * Reset Database
     */
    Database.prototype.reset = function () {
        database.remove(this.databaseName);
    };
    return Database;
})();
exports.Database = Database;
//# sourceMappingURL=Database.js.map