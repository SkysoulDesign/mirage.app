import {Observable} from "data/observable";
import {Mirage as App} from "../app";
import {navigate} from "../Modules/Helpers";
import {SearchBar} from "ui/search-bar";

export class SearchCodePageModel extends Observable{

	public constructor(searchBar) {
		super();
		searchBar.on(SearchBar.submitEvent, function(args) {
			console.log("Search for " + args.object.text);
		});
		searchBar.on(SearchBar.clearEvent, function(args) {
			console.log("Clear");
		});
	}
	public tapProduct(){
		navigate.to("video");
	}
}