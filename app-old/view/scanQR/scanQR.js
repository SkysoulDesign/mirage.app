var barcodescanner = require("nativescript-barcodescanner");
var frameModule = require("ui/frame");
var webViewModule = require("ui/web-view");
var page;
var timer = require("timer");

function pageLoaded(args) {
    var page = args.object;
    startscan();
    // var navigationEntry = {
    //         moduleName: "view/registerproduct/registerproduct",
    //         context: "MF001-11111-11111-11111"
    //       };
    //       frameModule.topmost().navigate(navigationEntry);
      // timer.setTimeout(function(){
      //   var navigationEntry = {
      //       moduleName: "view/registerproduct/registerproduct",
      //       context: "MF001-11111-11111-11111"
      //     };
      //     frameModule.topmost().navigate(navigationEntry);
      // },500);
}
exports.pageLoaded = pageLoaded;
var playaudio = function(resource) {
    var soundPath = NSBundle.mainBundle().pathForResourceOfType("app/test" ,"mp3");
    var moviePath = NSBundle.mainBundle().pathForResourceOfType("app/test" ,"mp4");
    var soundUrl = NSURL.fileURLWithPath(soundPath);
    var player = AVAudioPlayer.alloc().initWithContentsOfURLError(soundUrl, null);
    player.prepareToPlay();
    player.stop();
    player.currentTime = 0.0;
        player.play();
    console.log("moviePath: " + moviePath);
    console.log("soundPath: " + soundPath);
    
}
exports.playaudio = playaudio;
var playvideo = function()
{
    frameModule.topmost().navigate("view/video/video");
}
exports.playvideo = playvideo;
var startscan = function(){
   barcodescanner.scan({
      cancelLabel: "Stop scanning", // iOS only, default 'Close' 
      message: "Go scan something", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.' 
      preferFrontCamera: false,     // Android only, default false 
      showFlipCameraButton: true    // Android only, default false (on iOS it's always available) 
    }).then(
        function(result) {
          console.log("Scan format: " + result.format);
          console.log("Scan text:   " + result.text);
          var navigationEntry = {
            moduleName: "view/registerproduct/registerproduct",
            context: result.text
          };
          frameModule.topmost().navigate(navigationEntry);
        },
        function(error) {
          console.log("No scan: " + error);
          frameModule.topmost().goBack();
        }
    );
}
exports.startscan = startscan;
