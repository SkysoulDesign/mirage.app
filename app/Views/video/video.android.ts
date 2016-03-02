import {CreateViewEventData} from "ui/placeholder";
import {Page} from "ui/page";
import {ApiExtraInterface} from "../../Interfaces/ApiUserInterface";
import {Placeholder} from "ui/placeholder";
import {Image} from "ui/image";
import {Label} from "ui/label";
import StackLayout = org.nativescript.widgets.StackLayout;
import VideoView = android.widget.VideoView;
import application = require("application");
import Activity = android.app.Activity;
import orientationModule = require("nativescript-screen-orientation");
import statusBar = require("nativescript-status-bar");
import {api} from "../../Modules/Helpers";
import activityIndicatorModule = require("ui/activity-indicator");

export function pageLoaded(args) {

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

        var videoView:VideoView = video._nativeView,

            url = api.getBase() + extras.video,
            uri = android.net.Uri.parse(url);

        var controller =  new android.widget.MediaController(videoView.getContext());

        var listener = android.media.MediaPlayer.OnPreparedListener.extend({
            onPrepared(player){
                indicator.busy = false;
                player.start();
            }
        });

        videoView.setMediaController(controller);
        videoView.setVideoURI(uri);
        videoView.setOnPreparedListener(new listener());

    });

}

export function onNavigatingFrom() {
    orientationModule.orientationCleanup();
}

export function pageUnloaded(){
    console.log('tchau')
}

export function createVideoView(args:CreateViewEventData) {

    console.log('Starting Video >>>>>>');

    //var texture = new android.graphics.SurfaceTexture(11);

    args.view = new android.widget.VideoView(args.context);
    //    controller = new android.widget.MediaController(args.context);
    //
    //var videoLink = 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4';
    //var mVideoURL = android.net.Uri.parse(videoLink);
    //
    //var listener = android.media.MediaPlayer.OnPreparedListener.extend({
    //    onPrepared(player){
    //        console.log('ready');
    //        player.start();
    //    }
    //});
    //
    //videoView.setMediaController(controller);
    //videoView.setVideoURI(mVideoURL);
    //videoView.setOnPreparedListener(new listener());
    //videoView.bringToFront();
    //videoView.refreshDrawableState();
    //videoView.requestLayout();
    //videoView.requestFocus();
    //videoView.setTop(5);
    //
    //var params = new android.view.ViewGroup.LayoutParams(200,200);
    //
    //console.dir(videoView.setLayoutParams(params));
    //console.dir(videoView.getMeasuredHeightAndState());


    //
    //
    ////surfaceView._nativeView.addSubview(mediaPlayer);
    ////var surfaceView = android.widget.VideoView(surfaceView._nativeView.getContext());
    //


    return;

    //var videoLink = 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4';
    //var mVideoURL = android.net.Uri.parse(videoLink);
    //var mediaPlayer = new android.media.MediaPlayer.create(placeholder.context, mVideoURL);
    //mediaPlayer.start();
    //
    //
    //placeholder.view = mediaPlayer;
    //var videoView = new android.widget.VideoView(placeholder.context),
    //    mMediaController = new android.widget.MediaController(placeholder.context);
    //mMediaController.setAnchorView(videoView);
    //
    //var params = new android.view.ViewGroup.LayoutParams(android.view.ViewGroup.LayoutParams.MATCH_PARENT, 1);
    //
    //// parse the uri
    //var videoLink = 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4';
    //// var videoLink = 'rtsp://192.168.1.253:554/bunny.mp4';
    //var mVideoURL = android.net.Uri.parse(videoLink);
    //
    //videoView.setLayoutParams(params);
    //videoView.setVideoURI(mVideoURL);
    //videoView.setMediaController(mMediaController);
    //videoView.requestFocus();
    //videoView.start();
    //
    //placeholder.view = videoView;

    //var switchfullscreen = function (fullscreen) {
    //    var LayoutParams = android.widget.RelativeLayout.LayoutParams;
    //    var RelativeLayout = android.widget.RelativeLayout;
    //    if (!fullscreen) {//设置RelativeLayout的全屏模式
    //        var layoutParams = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT);
    //        layoutParams.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM);
    //        layoutParams.addRule(RelativeLayout.ALIGN_PARENT_TOP);
    //        layoutParams.addRule(RelativeLayout.ALIGN_PARENT_LEFT);
    //        layoutParams.addRule(RelativeLayout.ALIGN_PARENT_RIGHT);
    //        videoView.setLayoutParams(layoutParams);
    //        fullscreen = true;//改变全屏/窗口的标记
    //    } else {//设置RelativeLayout的窗口模式
    //        var lp = new LayoutParams(320, 240);
    //        lp.addRule(RelativeLayout.CENTER_IN_PARENT);
    //        videoView.setLayoutParams(lp);
    //        fullscreen = false;//改变全屏/窗口的标记
    //    }
    //};
    //
    //switchfullscreen(false);

    // Create our Complete Listener - this is triggered once a video reaches the end
    //var completionListener = new android.media.MediaPlayer.OnCompletionListener({
    //    onCompletion: function (placeholder) {
    //        console.log('Video Done');
    //    }
    //});
    //
    //// Set the listener using the correct method
    //videoView.setOnCompletionListener(completionListener);

}

