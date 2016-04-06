import application = require("application");
import {database, navigate} from "./Helpers";

export class iWatch {

    public session;

    public delegate = NSObject.extend({

        session: null,

        /**
         * Send Message to iWatch
         */
        sendMessage: (message:{})=> {
            console.log("sending message")
            this.session.sendMessageReplyHandlerErrorHandler(message, null, null);
        },

        /**
         * Send cache to iWatch
         */
        sendCache: ()=> {
            console.log("sending cache")
            this.sendMessage({products: database.query('login')});
        },

        /**
         * Plays video with specific ID on IOS
         * @param extraID
         */
        playIOSVideo: (extraID:Number) => {
            console.log("play video" + extraID)
            navigate.to('video', {context: {id: extraID}})
        },

        sessionDidReceiveMessage: function (session, data) {

            console.dir(data.valueForKey('paired'));

            /**
             * Set Session
             */
            this.session = session;

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
            this.sendMessage({paired: true})
        }

    }

    /**
     * Send Message to iWatch
     */
    public sendMessage(message:{}) {
        this.session.sendMessageReplyHandlerErrorHandler(message, null, null);
    }

}