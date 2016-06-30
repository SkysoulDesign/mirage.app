import app = require('application');
import {Page} from 'ui/page';
import {View} from 'ui/core/view';
import {Navigator as navigate} from "../../Classes/Navigator";
import {Video as video} from "../../Classes/Video";
import {Mirage as App} from "../../app" ;
import {NavigatedData} from "ui/page";

let changePage = true,
    moviePlayer;

export function navigatedTo(args:NavigatedData) {

    if (!changePage)
        return;

    let page = <Page>args.object,
        videoContainer:View = page.getViewById('container'),
        url = video.getURL(page.navigationContext);

    global.leaving = false;

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

    let exitFullScreen = function () {
            UIDevice.currentDevice().setValueForKey(NSNumber.numberWithInteger(UIInterfaceOrientationPortrait), "orientation");
        },
        enterFullScreen = function () {
            changePage = false;
            UIDevice.currentDevice().setValueForKey(NSNumber.numberWithInteger(UIInterfaceOrientationLandscapeLeft), "orientation");
        };

    app.ios.addNotificationObserver(MPMoviePlayerDidEnterFullscreenNotification, function onReceiveCallback() {
        // enterFullScreen();
        moviePlayer.play();
        console.log("MPMoviePlayerDidEnterFullscreenNotification");
    });

    app.ios.addNotificationObserver(MPMoviePlayerWillExitFullscreenNotification, function onReceiveCallback() {
        // exitFullScreen();
        console.log("MPMoviePlayerDidExitFullscreenNotification");
    });

    app.ios.addNotificationObserver(MPMoviePlayerPlaybackDidFinishNotification, function onReceiveCallback() {
        global.leaving = true;
        exitFullScreen();
        moviePlayer.stop();
        navigate.back();
    });

    enterFullScreen();

}

export function unloaded(args) {

    moviePlayer.stop();
    changePage = true;
    console.log("unloaded");

    App.iWatch.sendMessage({completed: true});
    //App.iWatch.isPlaying = false;
}

// export function navigatingFrom() {
//     orientationModule.orientationCleanup();
// }




