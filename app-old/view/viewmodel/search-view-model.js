// var __extends = (this && this.__extends) || function (d, b) {
//     for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
//     function __() { this.constructor = d; }
//     d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
// };
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var dialogsModule = require("ui/dialogs");
var config = require("../config");
var fetchModule = require("fetch");
var frameModule = require("ui/frame");
var loader = require("nativescript-loading-indicator");
var SearchViewModel = (function (_super) {
    __extends(SearchViewModel, _super);
    function SearchViewModel() {
        _super.call(this);
        _this = this;
    }
    
    SearchViewModel.prototype.searchById= function(codeid){
        loader.show();
        console.log("search");
        return fetchModule.fetch(config.searchUrl, {
            method: "POST",
            body: JSON.stringify({
               code: codeid,
               token: config.token
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(handleErrors, function (e) {
            console.log(e);
            dialogsModule.alert({
                    message: e,
                    okButtonText: "OK"
                });
        })
        .then(function(response) {
            console.log(response);
            return response.json();
        })
        .then(function(data){
            loader.hide();
            if(data.error !== undefined){
                console.log("1 "+JSON.stringify(data.error));
                var message1 ="Error \n";
                for(x in data.error){
                    message1 += "*" + data.error[x] + "\n";
                }
                console.log(message1);
                dialogsModule.alert({
                    message: message1,
                    okButtonText: "OK"
                });
            }
            else{
                return data;
            }
        });
    }
     SearchViewModel.prototype.searchNew = function(){
        loader.show();
        console.log("search");
        return fetchModule.fetch(config.searchUrl)
        .then(handleErrors, function (e) {
            console.log(e);
            dialogsModule.alert({
                    message: e,
                    okButtonText: "OK"
                });
        })
        .then(function(response) {
            console.log(response);
            return response.json();
        })
        .then(function(data){
            loader.hide();
            if(data.error !== undefined){
                console.log("1 "+JSON.stringify(data.error));
                var message1 ="Error \n";
                for(x in data.error){
                    message1 += "*" + data.error[x] + "\n";
                }
                console.log(message1);
                dialogsModule.alert({
                    message: message1,
                    okButtonText: "OK"
                });
            }
            else{
                return data;
            }
        });
    }
    return SearchViewModel;
})(observable.Observable);
exports.SearchViewModel = SearchViewModel;
exports.instance = new SearchViewModel();
function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}