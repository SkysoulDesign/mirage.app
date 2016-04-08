import {ApiExtraInterface} from "../../Interfaces/ApiUserInterface";
//import orientationModule = require("nativescript-screen-orientation");
import app = require('application');
import {Page} from 'ui/page';
import {View} from 'ui/core/view';
import {api, navigate, platform, video} from "../../Modules/Helpers";

var changePage = true;
var moviePlayer;

export function pageNavigatedTo(args) {

    //orientationModule.orientationCleanup();

    if (!changePage)
        return;

    var page = <Page>args.object,
        videoContainer:View = page.getViewById('container'),
        url = video.getURL(page.navigationContext);

    videoContainer.requestLayout();

    var playerViewController = MPMoviePlayerViewController.alloc().initWithContentURL(url);

    moviePlayer = playerViewController.moviePlayer;
    moviePlayer.scalingMode = MPMovieScalingModeAspectFill;//MPMovieScalingModeAspectFit;
    moviePlayer.controlStyle = MPMovieControlStyleFullscreen;//MPMovieControlStyleEmbedded;
    moviePlayer.repeatMode = MPMovieRepeatMode.MPMovieRepeatModeOne;
    moviePlayer.fullscreen = true;
    moviePlayer.setFullscreenAnimated(true, true);

    var ui = UIApplication.sharedApplication().keyWindow.bounds.size;

    console.log("Height: " + ui.height + " width: " + ui.width);

    moviePlayer.view.frame = CGRectMake(0, 0, ui.height, ui.width);
    videoContainer._nativeView.addSubview(moviePlayer.view);

    moviePlayer.play();

    var exitFullScreen = function () {
        UIDevice.currentDevice().setValueForKey(NSNumber.numberWithInteger(UIInterfaceOrientationPortrait), "orientation");
    };

    var enterFullScreen = function () {
        changePage = false;
        UIDevice.currentDevice().setValueForKey(NSNumber.numberWithInteger(UIInterfaceOrientationLandscapeRight), "orientation");
    };

    enterFullScreen();

    var observer = app.ios.addNotificationObserver(MPMoviePlayerDidEnterFullscreenNotification, function onReceiveCallback() {
        enterFullScreen();
        moviePlayer.play();
        console.log("MPMoviePlayerDidEnterFullscreenNotification");
    });

    var observer1 = app.ios.addNotificationObserver(MPMoviePlayerWillExitFullscreenNotification, function onReceiveCallback() {
        exitFullScreen();
        console.log("MPMoviePlayerDidExitFullscreenNotification");
    });

    var observer2 = app.ios.addNotificationObserver(MPMoviePlayerPlaybackDidFinishNotification, function onReceiveCallback() {
        exitFullScreen();
        moviePlayer.stop();
        navigate.back();
    });

}

export function pageUnloaded(args) {
    moviePlayer.stop();
    changePage = true;
    console.log("unloaded");
}




