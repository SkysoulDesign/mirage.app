import connectivity = require("connectivity");
import application = require("application");
import {Localizator} from "./Localizator";
import {Navigator as navigate} from "./Navigator";
import dialogs = require("ui/dialogs");
import {Api as api} from "./Api";
import {Device as device} from "./Device";
import {ApiExtraInterface} from "../Interfaces/ApiUserInterface";
import http = require("http");
import fs = require("file-system");

/**
 * File Class
 */
export class Video {

    /**
     * Play Video
     * @param id
     */
    public static play(extra:ApiExtraInterface, callback?:Function, error?:Function) {

        let filePath = fs.path.join(
            fs.knownFolders.documents().path, extra.video
        );

        if (fs.File.exists(filePath)) {
            callback()
            return this.process({
                context: filePath
            })
        }

        let connectionType = connectivity.getConnectionType(),
            getFile = () => {

                dialogs.alert(Localizator.get('DOWNLOAD_BACKGROUND'));

                http.getFile(this.getURI(extra.id), filePath).then(video => {
                    console.log('file downloaded')

                    callback()

                    dialogs.confirm(Localizator.get('CONTINUE_PLAYING_THE_VIDEO')).then(result => {

                        if (result) this.process({
                            context: filePath
                        })

                    })

                }, function (e) {
                    error()
                    console.log('error downloading file')
                });
            }

        switch (connectionType) {

            case connectivity.connectionType.none:
                dialogs.alert(Localizator.get('NEED_INTERNET'));
                break;

            case connectivity.connectionType.wifi:
                getFile();
                break;

            case connectivity.connectionType.mobile:

                dialogs.confirm({
                    title: Localizator.get('ATTENTION'),
                    message: Localizator.get('RECOMMEND_WIFI'),
                    okButtonText: Localizator.get('CONTINUE'),
                    cancelButtonText: Localizator.get('CANCEL'),
                }).then(result => {
                    if (result) getFile();
                });

                break;

        }

    }

    /**
     * Check if file is cached
     *
     * @param video
     * @returns {boolean}
     */
    public static cached(video:string):boolean {

        let filePath = fs.path.join(
            fs.knownFolders.documents().path, video
        );

        return fs.File.exists(filePath);
    }

    /**
     * Play Video
     * @param context
     */
    private static process(context:any) {
        navigate.to('video', context);
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
    public static getURL(path:string):any {

        if (application.ios)
            return NSURL.fileURLWithPath(path);

        if (application.android)
            return android.net.Uri.parse(path);

    }

}
