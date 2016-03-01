import {CreateViewEventData} from "ui/placeholder";
import {Page} from "ui/page";
import {ApiExtraInterface} from "../../Interfaces/ApiUserInterface";
import {Placeholder} from "ui/placeholder";
import {Image} from "ui/image";
import {Label} from "ui/label";

export function pageLoaded(args) {

    var page = <Page>args.object,
        surfaceView:Label = page.getViewById('video_player'),
        extras:ApiExtraInterface = page.navigationContext;

    //surfaceView.requestLayout();


    //
    //
    var videoLink = 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4';
    var mVideoURL = android.net.Uri.parse(videoLink);
    //
    //
    ////surfaceView._nativeView.addSubview(mediaPlayer);
    ////var surfaceView = android.widget.VideoView(surfaceView._nativeView.getContext());
    //
    var mediaPlayer = new android.media.MediaPlayer.create(
        surfaceView._nativeView.getContext(),
        mVideoURL
    );

    mediaPlayer.setSurface(surfaceView._nativeView);

    //,
    //surfaceView._nativeView.getHolder()
    mediaPlayer.prepare();
    mediaPlayer.start();

    //console.dir(mediaPlayer);

    //page.bindingContext = new vmModule.ProductMainPageModel(container);
}

export function createVideoView(args:CreateViewEventData) {

    var texture = new 	android.graphics.SurfaceTexture(11)

    args.view = new android.view.Surface(texture);

    return;

    var videoLink = 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4';
    var mVideoURL = android.net.Uri.parse(videoLink);
    var mediaPlayer = new android.media.MediaPlayer.create(placeholder.context, mVideoURL);
    mediaPlayer.start();


    placeholder.view = mediaPlayer;
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

