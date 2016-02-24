import {Observable} from "data/observable";
import {Mirage as App} from "../app";
import {navigate} from "../Modules/Helpers";

export class ProductAllPageModel extends Observable{

	public tapProduct(){
		navigate.to("video");
	}
}