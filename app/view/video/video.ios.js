var moviePlayer;
var observable = require("data/observable");
var app = require("application");
// Our new Observable view model for data binding
var viewmodel = new observable.Observable({});
exports.pageLoaded = function(args){
    var page = args.object;
    var videoContainer = page.getViewById('image_video');
    var moviePath = NSBundle.mainBundle().pathForResourceOfType("app/test111" ,"mp4");
    console.log(moviePath);
    // var url = NSURL.fileURLWithPath(moviePath);
    var url = NSURL.URLWithString("http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4");
    var playerViewController = MPMoviePlayerViewController.alloc().initWithContentURL(url);
    moviePlayer = playerViewController.moviePlayer;
    moviePlayer.scalingMode = MPMovieScalingModeAspectFit;
    moviePlayer.controlStyle = MPMovieControlStyleEmbedded;
    moviePlayer.repeatMode = MPMovieRepeatMode.MPMovieRepeatModeOne;
    moviePlayer.view.frame = videoContainer._nativeView.bounds;
    videoContainer._nativeView.addSubview(moviePlayer.view);
    moviePlayer.play();
    console.log("load video");
     var observer = app.ios.addNotificationObserver(MPMoviePlayerDidEnterFullscreenNotification, function onReceiveCallback(notification) {
        enterFullScreen(notification);
        moviePlayer.play();
        console.log("MPMoviePlayerDidEnterFullscreenNotification");
    });
     var observer1 = app.ios.addNotificationObserver(MPMoviePlayerWillExitFullscreenNotification, function onReceiveCallback(notification) {
        exitFullScreen(notification);
        console.log("MPMoviePlayerDidExitFullscreenNotification");
    });
// enterFullScreen();
        // NSNotificationCenter.defaultCenter().addObserverSelectorNameObject(this, selector(exitFullScreen) ,MPMoviePlayerDidExitFullscreenNotification ,moviePlayer);
        // NSNotificationCenter.defaultCenter().addObserverSelectorNameObject(this, selector(enterFullScreen) ,MPMoviePlayerDidEnterFullscreenNotification ,moviePlayer);
        // moviePlayer.play();



        // moviePlayer = MPMoviePlayerController.alloc().initWithContentURL(url);
        // moviePlayer.prepareToPlay();
        // moviePlayer.view.frame = videoContainer._nativeView.bounds;
        // moviePlayer.controlStyle = MPMovieControlStyleEmbedded;
        // // moviePlayer.shouldAutoplay = false;
        // // moviePlayer.scalingMode = MPMovieScalingMode. MPMovieScalingModeAspectFit;
        // // moviePlayer.repeatMode = MPMovieRepeatMode.MPMovieRepeatModeOne;
        // moviePlayer.sourceType = MPMovieSourceType.MPMovieSourceTypeFile;
        // videoContainer._nativeView.addSubview(moviePlayer.view);
  
  // page = args.object;
  // var videoContainer = page.getViewById('image_video');
  // var playerLayer = AVPlayerLayer.new();
  // playerLayer.frame = videoContainer._nativeView.bounds;
  // // This video is inside the App_Resources under iOS
  // var videoUrl = NSBundle.mainBundle().URLForResourceWithExtension("app/test", "mp4");
  // var player = AVPlayer.playerWithURL(videoUrl);
  // player.actionAtItemEnd = AVPlayerActionAtItemEnd.AVPlayerActionAtItemEndNone;
  // playerLayer.player = player;
  // videoContainer._nativeView.layer.addSublayer(playerLayer);
  // player.play();

        // var page = args.object;
        // viewmodel.set("htmlString", '<iframe width="100%" height="250" src="https://www.youtube.com/embed/scGRfqV95Xw"frameborder="0"></iframe>');
        // page.bindingContext = viewmodel;
}
exports.pageUnloaded = function(args){
    moviePlayer.pause();
    console.log("unloaded");
}
 var exitFullScreen = function(notification){
    UIDevice.currentDevice().setValueForKey(NSNumber.numberWithInteger(UIInterfaceOrientationPortrait) ,"orientation");
}
var enterFullScreen = function(notification){
    UIDevice.currentDevice().setValueForKey(NSNumber.numberWithInteger(UIInterfaceOrientationLandscapeRight),"orientation");
}
