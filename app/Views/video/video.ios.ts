var moviePlayer;
// var app = require("application");
// Our new Observable view model for data binding

import app = require('application');
import {Page} from 'ui/page';
import {View} from 'ui/core/view'; // what s the namei
var changepage = true;
export function pageLoaded(args) {
    if (!changepage)
        return;
    var page = <Page>args.object,
        videoContainer: View = page.getViewById('image_video');
    videoContainer.requestLayout();
    console.log("TTTTTTTTTTTTTTTTTT");
    console.dir(videoContainer._nativeView.bounds.size);
    console.dir(page._nativeView.frame.size);

	//bug .  getViewbyId can not get view bounds.
    // console.dir(page);
    // var moviePath = NSBundle.mainBundle().pathForResourceOfType("app/test111" ,"mp4");
    // console.log(moviePath);
    // var url = NSURL.fileURLWithPath(moviePath);

    var url = NSURL.URLWithString("http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4");
    var playerViewController = MPMoviePlayerViewController.alloc().initWithContentURL(url);

    // where MPMoviePlayerViewController comes from? nowhere just can use like this . it is native code

    moviePlayer = playerViewController.moviePlayer;
    moviePlayer.scalingMode = MPMovieScalingModeAspectFit;
    moviePlayer.controlStyle = MPMovieControlStyleEmbedded;
    moviePlayer.repeatMode = MPMovieRepeatMode.MPMovieRepeatModeOne;

    var size = page._nativeView.bounds.size;
    var origin = page._nativeView.bounds.origin;
    if (videoContainer._nativeView.bounds.size.width ===0)
        moviePlayer.view.frame = CGRectMake(0, origin.y, size.width, 280);//videoContainer._nativeView.bounds;//
    else
        moviePlayer.view.frame = videoContainer._nativeView.bounds;//
     // console.dir(videoContainer._nativeView + "  TTTTTTTT " + moviePlayer.view);
    
    videoContainer._nativeView.addSubview(moviePlayer.view);

    moviePlayer.play();

    var exitFullScreen = function(notification) {
		UIDevice.currentDevice().setValueForKey(NSNumber.numberWithInteger(UIInterfaceOrientationPortrait), "orientation");
	}

	var enterFullScreen = function(notification) {
        changepage = false;
		UIDevice.currentDevice().setValueForKey(NSNumber.numberWithInteger(UIInterfaceOrientationLandscapeRight), "orientation");
	}

	var observer = app.ios.addNotificationObserver(MPMoviePlayerDidEnterFullscreenNotification, function onReceiveCallback(notification) {
        enterFullScreen(notification);
        moviePlayer.play();
        console.log("MPMoviePlayerDidEnterFullscreenNotification");
    });

	var observer1 = app.ios.addNotificationObserver(MPMoviePlayerWillExitFullscreenNotification, function onReceiveCallback(notification) {
        exitFullScreen(notification);
        console.log("MPMoviePlayerDidExitFullscreenNotification");
    });



}


export function pageUnloaded(args) {
    moviePlayer.pause();
    changepage = true;
    console.log("unloaded");
}




