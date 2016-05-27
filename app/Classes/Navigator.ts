import {topmost, NavigationEntry} from "ui/frame";
import {view, extend} from "../Modules/Helpers";
import {BackstackEntry} from "ui/frame";

/**
 * Navigator Class
 */
export class Navigator {

    /**
     * Constructor
     */
    constructor() {}

    /**
     * Navigate to View
     * @param viewName
     * @param options
     */
    public static to(viewName:string, options:NavigationEntry = {}):void {
        topmost().navigate(
            extend({
                moduleName: view(viewName),
            }, options)
        );
    }

    /**
     * Navigate back to the previous page
     */
    public static back(to?:BackstackEntry) {
        topmost().goBack(to);
    }

}