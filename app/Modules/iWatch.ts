import application = require("application");

export class iWatch {

    public session;

    public delegate = NSObject.extend({
        sessionDidReceiveMessage: function (session, data) {
            // var message = data.descriptionInStringsFileFormat.concat("oi");
            //console.dir(data.valueForKey('message'));
            // console.dir(JSON.parse("{"+message+"}"));
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