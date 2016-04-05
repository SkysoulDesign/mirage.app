import {Mirage as App} from "../app";
import {NavigationEntry, topmost} from "ui/frame";
import {extend, view} from "./Helpers";
import {BackstackEntry} from "ui/frame";

export class Navigator {

    /**
     * Navigate to View
     * @param viewName
     * @param options
     */
    public to(viewName:string, options:NavigationEntry = {}):void {
        topmost().navigate(
            extend({
                moduleName: view(viewName),
            }, options)
        );
    }

    /**
     * Navigate back to the previous page
     */
    public back(to?:BackstackEntry) {
        topmost().goBack(to);
    }

}