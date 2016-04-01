import {SignInPageModel} from "../../Models/sign-in-page-model";
import {Page} from 'ui/page';
import {NavigatedData} from "ui/page";
import application = require("application");

export function pageNavigatedTo(args:NavigatedData) {

    if (args.isBackNavigation)
        return;

    var page = <Page>args.object,
        model = new SignInPageModel(),
        loginButton = page.getViewById('login_button');

    page.bindingContext = model.init({
        page: page,
        loginButton: loginButton
    });

    if (!application.ios) return;

    var MyWCSessionDelegate = NSObject.extend({
        sessionDidReceiveMessageData: function (session, message) {
            console.log(message)
        }
    }, {
        name: "MyWCSessionDelegate",
        protocols: [WCSessionDelegate]
    });

    if (WCSession.isSupported()) {
        var session = WCSession.defaultSession();
        session.delegate = new MyWCSessionDelegate();
        session.activateSession();
        session.sendMessageReplyHandlerErrorHandler({"message": "Hello iWatch!"}, null, null);
    }

}

