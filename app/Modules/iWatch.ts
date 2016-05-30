import application = require("application");
import platform = require("platform");
import {Cache as cache} from "../Classes/Cache";
import {Video as video} from "../Classes/Video";

export class iWatch {

    public session = null;
    public isSupported = true;

    public delegate = NSObject.extend({

        /**
         * Receiving message from iWatch
         * @param session
         * @param data
         */
        sessionDidReceiveMessage: (session, data) => {

            console.log("message received");
            console.dir(data.description);

            /**
             * iWatch just paired, it needs some Cache
             */
            if (data.valueForKey('paired'))
                this.sendCache();

            /**
             * User Played Video
             */
            if (data.valueForKey('play_video'))
                this.playIOSVideo(data.valueForKey('play_video'));

        }
    }, {
        name: "delegate",
        protocols: [WCSessionDelegate]
    });

    /**
     * Constructor
     */
    constructor() {

        let version = parseFloat(platform.device.osVersion);

        if (version < 9) {
            this.isSupported = false;
            console.log('Your device doesn\'t support iWatch.');
            return;
        }

        if (WCSession && WCSession.isSupported()) {
            this.session = WCSession.defaultSession();
            this.session.delegate = new this.delegate();
            this.session.activateSession();
            this.sendMessage({paired: true});
        }

    }

    /**
     * Send Message to iWatch
     */
    public sendMessage(message:{}) {

        console.log("sending message");
        console.dir(message);

        if (!this.isSupported) return;

        if (this.session === null)
            return console.log("session is null, couldn't send message");

        this.session.sendMessageReplyHandlerErrorHandler(message, null, null);

    }

    /**
     * Send cache to iWatch
     */
    public sendCache() {

        console.log("sending cache");

        var codes = cache.get('codes', null);

        /**
         * If there is no cache in the iOS throws login error
         */
        if (codes === null)
            return this.sendError("please login first");

        this.sendMessage({products: codes});

    }

    /**
     * Send Error Message to ios
     * @param message string
     */
    public sendError(message:string) {
        this.sendMessage({error: message});
    }

    /**
     * Plays video with specific ID on IOS
     * @param extraID
     */
    public playIOSVideo(extraID:Number) {
        video.play(extraID.toString());
    }

}