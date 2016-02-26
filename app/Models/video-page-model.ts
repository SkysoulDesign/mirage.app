import {Observable} from "data/observable";
import http = require("http");
import {navigate, api, cache} from "../Modules/Helpers";

export class VideoPageModel extends Observable {

    public constructor() {

        super();

        this.set('source', 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4');

        console.log('shoould be playing')

    }

    public videoplayerLoaded(){
        console.log('shoould be loaded')
    }

}