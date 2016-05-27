import connectivity = require("connectivity");
import application = require("application");
import {Localizator} from "./Localizator";
import {Navigator as navigate} from "./Navigator";
import dialogs = require("ui/dialogs");
import {Api as api} from "./Api";
import {Device as device} from "./Device";

/**
 * File Class
 */
export class Video {

    /**
     * Play Video
     * @param id
     */
    public static play(id:number|string) {

        var context = {context: id},
            connectionType = connectivity.getConnectionType();

        switch (connectionType) {

            case connectivity.connectionType.none:
                dialogs.alert(Localizator.get('NEED_INTERNET'));
                break;

            case connectivity.connectionType.wifi:
                navigate.to('video', context);
                break;

            case connectivity.connectionType.mobile:

                dialogs.confirm({
                    title: Localizator.get('ATTENTION'),
                    message: Localizator.get('RECOMMEND_WIFI'),
                    okButtonText: Localizator.get('CONTINUE'),
                    cancelButtonText: Localizator.get('CANCEL'),
                }).then(result => {
                    if (result) navigate.to('video', context)
                });

                break;

        }

    }

    /**
     * Return the video URL
     * @param extraID
     * @returns {string}
     */
    public static getURI(extraID:number) {
        return api.getBaseWithToken('api/video', {
            extra: extraID,
            aspect: device.getRatio()
        });
    }

    /**
     * Get native URL OBject
     * @param extraID
     */
    public static getURL(extraID:number):any {

        var uri = this.getURI(extraID);

        if (application.ios)
            return NSURL.URLWithString(uri);

        if (application.android)
            return android.net.Uri.parse(uri);

    }

}