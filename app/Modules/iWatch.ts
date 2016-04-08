import application = require("application");
import {database, navigate, view} from "./Helpers";
import orientationModule = require("nativescript-screen-orientation");

export class iWatch {

    public session = null;

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

        if (this.session === null)
            return console.log("session is null, couldn't send message");

        this.session.sendMessageReplyHandlerErrorHandler(message, null, null);

    }

    /**
     * Send cache to iWatch
     */
    public sendCache() {

        console.log("sending cache");

        var cache = database.query('api.login.codes');

        console.dir(JSON.stringify(cache));

        /**
         * If there is no cache in the iOS throws login error
         */
        if (cache === null)
            return this.sendError("please login first");

        this.sendMessage({products: cache});

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

        orientationModule.setCurrentOrientation("portrait", function () {
            console.log("play video on ios" + extraID);
            navigate.to('video', {context: extraID.toString()});
        });

    }

}