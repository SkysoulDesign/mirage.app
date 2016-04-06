import {CreateViewEventData} from "ui/placeholder";
import {Page} from "ui/page";
import {ApiExtraInterface} from "../../Interfaces/ApiUserInterface";
import VideoView = android.widget.VideoView;
import orientationModule = require("nativescript-screen-orientation");
import statusBar = require("nativescript-status-bar");
import {api, platform} from "../../Modules/Helpers";
import activityIndicatorModule = require("ui/activity-indicator");

var videoNATIVE;

export function pageNavigatedTo(args) {

    var page = <Page>args.object,
        video = page.getViewById('video_player'),
        container = page.getViewById('container'),
        extras = <ApiExtraInterface>page.navigationContext;

    /**
     * hide Status Bar
     */
    statusBar.hide();

    var indicator = new activityIndicatorModule.ActivityIndicator();
        indicator.busy = true;
        indicator.width = 100;
        indicator.height = 100;
        indicator.color = 'green';

    container.addChild(indicator);

    orientationModule.setCurrentOrientation("landscape", function () {

        var videoView:VideoView = videoNATIVE,
            url = api.getBaseWithToken('api/video', {extra: extras.id, 'aspect': platform.getRatio()}),
            uri = android.net.Uri.parse(url);

        var controller = new android.widget.MediaController(videoView.getContext());

        var listener = android.media.MediaPlayer.OnPreparedListener.extend({
            onPrepared(player){
                indicator.busy = false;
                player.start();
            }
        });

        videoView.setMediaController(controller);
        videoView.setVideoURI(uri);
        videoView.setZOrderOnTop(true);
        videoView.requestFocus();
        videoView.setOnPreparedListener(new listener());

    });

}

export function onNavigatingFrom() {
    orientationModule.orientationCleanup();
}

export function createVideoView(args:CreateViewEventData) {
    args.view = videoNATIVE = new android.widget.VideoView(args.context);
}

