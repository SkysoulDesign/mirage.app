import applicationSettings = require("application-settings");
import {isJSON, isString} from "../Modules/Helpers";

/**
 * Cache Class
 */
export class Cache {

    /**
     * Constructor
     */
    constructor() {}

    /**
     * Check if Key exists in the cache
     * @param key
     * @returns {boolean}
     */
    public static has(key:string):boolean {
        return applicationSettings.hasKey(key);
    }

    /**
     * Get key from cache
     * @param key
     * @param defaults
     * @returns string|{}
     */
    public static get(key:string, defaults:any = null):string|{} {

        let data = applicationSettings.getString(key, defaults);

        if (isJSON(data))
            data = JSON.parse(data);

        return data;
    }

    /**
     * Set key in cache
     * @param key
     * @param data
     */
    public static set(key:string, data:any):void {

        if (!isString(data))
            data = JSON.stringify(data);

        applicationSettings.setString(key, data);
    }

    /**
     * Delete Key from Cache
     * @param key
     */
    public static remove(key:string):void {
        applicationSettings.remove(key);
    }

    /**
     * Reset Cache
     */
    public static reset():void {
        applicationSettings.clear();
    }

}