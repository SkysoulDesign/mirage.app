import {Observable} from "data/observable";
import {BaseModelInterface} from "../Interfaces/BaseModelInterface";

export class BaseModel extends Observable implements BaseModelInterface {

    private initialized:boolean = false;

    /**
     * Bind everything on this model
     * Format {name:{}|number|string|array}
     * @param object
     */
    public bind(object) {
        for (var x in object) this[x] = object[x];
        return this;
    }

    /**
     * Init Class only once
     */
    public initOnce(bindings) {

        if (bindings instanceof Object)
            this.bind(bindings);

        if (this.initialized === true)
            return this;

        this.initialized = true;
        this.init();

        return this;

    }

}