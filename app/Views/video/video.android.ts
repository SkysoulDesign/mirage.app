import {CreateViewEventData} from "ui/placeholder";
import {Page} from "ui/page";
import orientationModule = require("nativescript-screen-orientation");
import statusBar = require("nativescript-status-bar");
import {Video as video} from "../../Classes/Video";
import {NavigatedData} from "ui/page";
import {Color} from "color";
import {StackLayout} from "ui/layouts/stack-layout";
import {ActivityIndicator} from "ui/activity-indicator";

let page, container, videoView,
    loading = new ActivityIndicator();

export function loaded(args:NavigatedData) {

    page = <Page>args.object;
    container = <StackLayout>page.getViewById('container');

    /**
     * Add Loading to the screen
     */
    if (!container.getChildIndex(loading)) {
        loading.width = 100;
        loading.height = 100;
        loading.color = new Color('green');
        container.addChild(loading);
    }

    /**
     * hide Status Bar
     */
    statusBar.hide();

}

export function navigatedTo() {

    loading.busy = true;

    orientationModule.setCurrentOrientation("landscape", () => {

        let uri = video.getURL(page.navigationContext),
            controller = new android.widget.MediaController(videoView.getContext()),
            listener = android.media.MediaPlayer.OnPreparedListener.extend({
                onPrepared(player){
                    loading.busy = false;
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

export function navigatingFrom() {
    orientationModule.setCurrentOrientation("portrait", () => {
        orientationModule.orientationCleanup();
    });
}

export function createView(args:CreateViewEventData) {
    args.view = videoView = new android.widget.VideoView(args.context);
}

