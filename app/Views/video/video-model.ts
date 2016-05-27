import {Observable} from "data/observable";
import http = require("http");
import {navigate, api, cache} from "../../Modules/Helpers";

export class VideoModel extends Observable {

    public constructor() {
        super();
    }

    public setup() {
        this.set('source', 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4');
    }

    public videoplayerLoaded() {
        console.log('shoould be loaded')
    }

}