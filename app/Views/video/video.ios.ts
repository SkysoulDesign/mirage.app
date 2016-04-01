import {ApiExtraInterface} from "../../Interfaces/ApiUserInterface";
var moviePlayer;
// var app = require("application");
// Our new Observable view model for data binding

import app = require('application');
import {Page} from 'ui/page';
import {View} from 'ui/core/view';
import {api, navigate, platform} from "../../Modules/Helpers";
var changepage = true;

export function pageLoaded(args) {
    if (!changepage)
        return;
    var page = <Page>args.object,
        videoContainer:View = page.getViewById('container'),
        extras = <ApiExtraInterface>page.navigationContext;

    videoContainer.requestLayout();

    console.dir(videoContainer._nativeView.bounds.size);
    console.dir(page._nativeView.frame.size);

    // bug .  getViewbyId can not get view bounds.
    // console.dir(page);
    // var moviePath = NSBundle.mainBundle().pathForResourceOfType("app/test111" ,"mp4");
    // console.log(moviePath);
    // var url = NSURL.fileURLWithPath(moviePath);

    var URI = api.getBaseWithToken('video', {extra: extras.id, 'aspect': platform.getRatio()});

    var url = NSURL.URLWithString(URI);
    var playerViewController = MPMoviePlayerViewController.alloc().initWithContentURL(url);

    moviePlayer = playerViewController.moviePlayer;
    moviePlayer.scalingMode = MPMovieScalingModeAspectFill;//MPMovieScalingModeAspectFit;
    moviePlayer.controlStyle = MPMovieControlStyleFullscreen;//MPMovieControlStyleEmbedded;
    moviePlayer.repeatMode = MPMovieRepeatMode.MPMovieRepeatModeOne;
    moviePlayer.fullscreen = true;
    moviePlayer.setFullscreenAnimated(true, true);

    var ui = UIApplication.sharedApplication().keyWindow.bounds.size;

    //var size = page._nativeView.bounds.size;

    moviePlayer.view.frame = CGRectMake(0, 0, ui.height, ui.width);//videoContainer._nativeView.bounds;//

    //videoContainer._nativeView.addSubview();
    videoContainer._nativeView.addSubview(moviePlayer.view);

    moviePlayer.play();

    var exitFullScreen = function (notification) {
        UIDevice.currentDevice().setValueForKey(NSNumber.numberWithInteger(UIInterfaceOrientationPortrait), "orientation");
    };

    var enterFullScreen = function (notification) {
        changepage = false;
        UIDevice.currentDevice().setValueForKey(NSNumber.numberWithInteger(UIInterfaceOrientationLandscapeRight), "orientation");
    };

    enterFullScreen();

    var observer = app.ios.addNotificationObserver(MPMoviePlayerDidEnterFullscreenNotification, function onReceiveCallback(notification) {
        enterFullScreen(notification);
        moviePlayer.play();
        console.log("MPMoviePlayerDidEnterFullscreenNotification");
    });

    var observer1 = app.ios.addNotificationObserver(MPMoviePlayerWillExitFullscreenNotification, function onReceiveCallback(notification) {
        exitFullScreen(notification);
        console.log("MPMoviePlayerDidExitFullscreenNotification");
    });

    var observer2 = app.ios.addNotificationObserver(MPMoviePlayerPlaybackDidFinishNotification, function onReceiveCallback(notification) {
        exitFullScreen(notification);
        moviePlayer.stop();
        navigate.back();
    });

}

export function pageUnloaded(args) {
    moviePlayer.pause();
    changepage = true;
    console.log("unloaded");
}




