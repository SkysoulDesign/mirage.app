import {Observable, EventData} from "data/observable";
import {navigate, api, cache} from "../Modules/Helpers";

export class RegisterProductPageModel extends Observable {

    /**
     * Constructor
     */
    public constructor(str) {
        super();
        this.getProductInfo(str);
    }

    /**
     * getProductInfo
     *
     */
    public getProductInfo(str) {

        var _this = this;

        this.set('text1', str.substr(0, 5));
        this.set('text2', str.substr(6, 5));
        this.set('text3', str.substr(12, 5));
        this.set('text4', str.substr(18, 5));

        // this.set('text1', 'MF005');
        // this.set('text2', '7A56');
        // this.set('text3', 'C8DF');
        // this.set('text4', '929C');
//
        //MF005-7A56-C8DF-929C i will make the image mF005 very big so it will be slow to download wait // are u using local host? or cms?local okaty

        _this.set('isLoading', true);

        var data = {
                product_id: _this.get("text1"), //don't know
                encode_image: true
            },
            onSuccess = function (data) {
                _this.set('isLoading', false);
            },
            onError = function (errors) {
                api.alertErrors(errors);
                _this.set('isLoading', false);
            };

       // ; // try again, reset mean delete all caches? yes. yes ,it used cache .but result.on should changed image? can u see will close.yes
       //i think we have cached MF005. 
        var result = api.fetch('product', data, onSuccess, onError, true); //next param is if wanna cache or not but need to delete the cache first.. 
//maybve i can do something like this in the future so can make many caches..
// if always fetch the same product okay... will work.. but if first fetch product 1 then product 2 will not work.. it will still show data from the product 1 in the product 2
// first time take a long time.. but next time will be quicly
// understand? yes. so i think now wait just comment this when i make the cache to accept ['product', 'keyname'] so can use that
// ok , and i see if use cache.reset will lose token yes because it will delete all the database... u can use cache.delete('product') if u cache.delete('login') will lose token so will just delete what u want
        // console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTT');
        // console.dir(result.get('data')); // this will probably be data.image = null okay now MF005 = 10mb try to use the app    why first go 1? ohhh i know why....

        //fetch cache.. so next fetch it will already take that cache.. wait 

        // if u dont add this line it will happen an error? no i show you . have loading time . yeah but i think it`s right if u put before the first time also will have loading time
        //yes, but it can show cache picture very soon. try this wait
            // so means here cant put this  . i used this for loading picture quickly if have cache. uhm
        // if (cache.get('product.code') === _this.get("text1")) //test two times now okay i know...
        //     _this.set('product_image', result.get('data').image.encoded); // i think pusting _this.set here is a risk because result.get('data').image maybe is null and  result.get('data').image.encode will say encoded dont exist in .image 

// the cache.. cant cache two keys under the same name for example
///api.fetch('product') will make api.product = {code:..., name:...}
// when fetch again it will make again api.product = {code: new code....} so the old will lost... i need to make a new cache to detect if its the same and add as an array..
// api.product = [{cache1}, {cache2}] now just can api.product = {cache} so if cache a product first... next time u ask agin will first take the cached version which is wrong...
// understand?

//so i think is better set the image after the fetch finish now is very quicly because maybe its cached or the internet is fast but when internet is slow.. it will be null and will have error
// can add if () . yes but why if result.on() is already fired when it have the image? when fetch finish the first thin it do is to put the result inside  var result and when something add to result it will fire
        result.on(Observable.propertyChangeEvent, function (data:EventData) {
            _this.set('product_image', result.get('data').image.encoded);
        });

    }

    /**
     * Navigate to Account
     */
    public tapRegister() {
        navigate.to("register-success");
    }

}