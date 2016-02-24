var mVideoView;
export function createVideoView(args) {
    console.log("createVideoView");
    //create videoview    
    mVideoView = new android.widget.VideoView(args.context);
    var mMediaController = new android.widget.MediaController(args.context);
    mMediaController.setAnchorView(mVideoView);
    var params = new android.view.ViewGroup.LayoutParams(android.view.ViewGroup.LayoutParams.MATCH_PARENT, 1);
    mVideoView.setLayoutParams(params);   
    // parse the uri
    var videoLink = 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4';
    // var videoLink = 'rtsp://192.168.1.253:554/bunny.mp4';
    var mVideoURL = android.net.Uri.parse(videoLink);
    mVideoView.setVideoURI(mVideoURL);
    mVideoView.setMediaController(mMediaController);
    mVideoView.requestFocus();
    mVideoView.start();

    args.view = mVideoView;
    switchfullscreen(false);
    // Create our Complete Listener - this is triggered once a video reaches the end
    var completionListener = new android.media.MediaPlayer.OnCompletionListener({
        onCompletion: function(args) {
            console.log('Video Done');
        }
    });
    // Set the listener using the correct method
    mVideoView.setOnCompletionListener(completionListener);
}

function switchfullscreen(fullscreen) {
    var LayoutParams = android.widget.RelativeLayout.LayoutParams;
    var RelativeLayout = android.widget.RelativeLayout;
    if (!fullscreen) {//设置RelativeLayout的全屏模式
        var layoutParams = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT);
        layoutParams.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM);
        layoutParams.addRule(RelativeLayout.ALIGN_PARENT_TOP);
        layoutParams.addRule(RelativeLayout.ALIGN_PARENT_LEFT);
        layoutParams.addRule(RelativeLayout.ALIGN_PARENT_RIGHT);
        mVideoView.setLayoutParams(layoutParams);
        fullscreen = true;//改变全屏/窗口的标记
    } else {//设置RelativeLayout的窗口模式
        var lp = new LayoutParams(320, 240);
        lp.addRule(RelativeLayout.CENTER_IN_PARENT);
        mVideoView.setLayoutParams(lp);
        fullscreen = false;//改变全屏/窗口的标记
    }
}