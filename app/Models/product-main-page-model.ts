import {Observable} from "data/observable";
import http = require("http");
import {cache, navigate} from "../Modules/Helpers";

export class ProductMainPageModel extends Observable {


    public tapMirage() {
		navigate.to("product-all");
    }
    public tapCode(){
		navigate.to("search-code");
    }
    public tapMovie(){
		navigate.to("search-movie");
    }

}