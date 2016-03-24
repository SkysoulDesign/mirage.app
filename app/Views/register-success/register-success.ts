import timer = require("timer");
import {Mirage as App} from "../../app";

exports.pageLoaded = function(){
	timer.setTimeout(function(){
		App.navigate.to("main-page");
	},500);
}