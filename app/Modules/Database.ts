import database = require('application-settings');
import {isJSON} from "./Helpers";
import {Mirage as App} from "../app";

export class Database {

    /**
     * Database Name
     * @type {string}
     */
    private databaseName:string = App.config.databaseName;

    /**
     * Temporary fix for a bug on android on calling this method on the Constructor
     * @returns {any}
     */
    public setup():{} {

        if (database.hasKey(this.databaseName))
            return JSON.parse(database.getString(this.databaseName));

        database.setString(this.databaseName, JSON.stringify({created_at: new Date(), api: {}}));

        return this.setup();

    }

    /**
     * Check if key Exists
     * @param key
     * @returns {boolean}
     */
    public has(key:string):boolean {
        return this.setup().hasOwnProperty(key);
    }

    /**
     * Get Key from Database
     * @param key
     */
    public get(key:string):string|{} {

        if (isJSON(key)) {
            return JSON.parse(key);
        }

        if (this.has(key)) {

            var result = this.setup()[key];

            if (isJSON(result))
                return this.get(result);

            return result;

        }

    }

    /**
     * Set Keys from an Array
     * @param values
     */
    public setFromArray(values:string[]) {

        var db = this.setup();

        for (var key in values) {
            db[key] = values[key];
        }

        this.save(db);

    }

    /**
     * Set Key in the Database
     * @param key
     * @param value
     */
    public set(key:string, value:{}):void {

        var db = this.setup();
            db[key] = value;

        this.save(db);

    }

    /**
     * Save Database
     * @param db
     */
    public save(db:{}):void {
        database.setString(this.databaseName, JSON.stringify(db));
    }

    /**
     * Remove key from database
     * @param key
     */
    public remove(key:string):void {
        delete this.setup()[key];
    }

    /**
     * Reset Database
     */
    public reset() {
        database.remove(this.databaseName);
    }

}