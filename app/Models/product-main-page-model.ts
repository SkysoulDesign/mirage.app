import {Observable} from "data/observable";
import {Mirage as App} from "../app";
import http = require("http");
import {cache} from "../Modules/Helpers";

export class ProductMainPageModel extends Observable {


    public tapMirage() {
		// App.navigate.to("product-all");
    }
    public tapCode(){
		// App.navigate.to("search-code");
    }
    public tapMovie(){
		// App.navigate.to("search-movie");
    }

}