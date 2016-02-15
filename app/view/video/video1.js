
var frameModel = require("ui/frame");


function pageLoaded(args) {

    var page = args.object;
    if(page.ios)
    {
    	// var moviePath = NSBundle.mainBundle().pathForResourceOfType("app/test2" ,"mp4");
     //    console.log("moviePath: " + moviePath);
     //    var movieUrl = NSURL.alloc().initFileURLWithPath(moviePath);
     //    console.log("movieUrl: " + movieUrl);
     //    // playVideoIOS(page,movieUrl);
     //    // return;
     //    // NSURL*videoPathURL=[NSURL URLWithString:urlStr];//urlStr是视频播放地址
     //    // movieUrl = NSURL.URLWithString("http://techslides.com/demos/sample-videos/small.mp4");

     //    var playerViewController = MPMoviePlayerViewController.alloc().initWithContentURL(movieUrl);
     //    var player = playerViewController.moviePlayer;
     //    player.scalingMode = MPMovieScalingModeFill;
     //    player.controlStyle = MPMovieControlStyleEmbedded;
     //    var view1 = args.object._view;
     //    // player.view.frame = view1.frame;
     //    player.view.frame = CGRectMake(100, 100, 100, 100);
     //    view1.addSubview(player.view);
     //    player.play();
         // var movie= MPMoviePlayerController.alloc().initWithContentURL(movieUrl);  
        // movie.controlStyle = MPMovieControlStyleFullscreen;  
        // args.object._view.addSubview(movie.view);  
        // console.log("movie:: " + movie.view);
        // console.log("args.object._view:" + args.object._view);
        // movie.play();
        // var _view = args.object._view;
        var _view = page.getViewById("image_video");
         console.log("view--"+_view );
        var moviePath = NSBundle.mainBundle().pathForResourceOfType("app/test3" ,"mov");
        var movieUrl = NSURL.fileURLWithPath(moviePath);
        var moviePlayer = MPMoviePlayerController.alloc().initWithContentURL(movieUrl);
        // moviePlayer.prepareToPlay();
        // moviePlayer.view.frame = _view.frame;
        // _view = moviePlayer.view;
        // moviePlayer.view = _view;
        // console.log("view--"+_view + "     bounds--"+_view.bounds);
        console.log(" moviePlayer.view.frame--"+ moviePlayer.view.frame);
        console.log("movieUrl: " + movieUrl);
        // _view.addSubview(moviePlayer.view);
        // page.content = moviePlayer.view;

        // moviePlayer.fullscreen = YES;
        // moviePlayer.shouldAutoplay = YES;
        // moviePlayer.repeatMode = MPMovieRepeatModeNone;
        // moviePlayer.movieSourceType = MPMovieSourceTypeFile;
        // moviePlayer.play();
    }
    else if(page.android)
    {
        var videoVM = require("../viewmodel/video-view-model");
        var user = videoVM.instance1;
        // user.playAndroidVideo();
        // user.playAndroidVideoView();
        // playAndroidVideo1();
    }


}


exports.tapInfo = function(){
    frameModel.topmost().navigate("view/introduction/introduction");
}
