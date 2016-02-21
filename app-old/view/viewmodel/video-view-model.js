// var __extends = (this && this.__extends) || function (d, b) {
//     for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
//     function __() { this.constructor = d; }
//     d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
// };
var observable = require("data/observable");
var dialogsModule = require("ui/dialogs");
var fetchModule = require("fetch");
var frameModule = require("ui/frame");



// var VideoViewModel = (function (_super) {
//     __extends(VideoViewModel, _super);
//     function VideoViewModel() {
//         _super.call(this);
//     }
//     // function onCreate(savedInstanceState){
//     //    super.onCreate(savedInstanceState);
//     //     this.setContentView(2130903040);
//     //     this.videoListView = (ListView)this.findViewById(2131099649);
//     //     this.init();
//     //     this.videoListView.setOnItemClickListener(new OnItemClickListener() {
//     //         public void onItemClick(AdapterView<?> arg0, View arg1, int arg2, long arg3) {
//     //             Intent playIntent = new Intent(VideoDemo.this, VideoPlayer.class);
//     //             String pathString = ((VideoDemo.VideoInfo)VideoDemo.this.videoList.get(arg2)).filePath;
//     //             playIntent.putExtra("path", pathString);
//     //             VideoDemo.this.startActivity(playIntent);
//     //         }
//     //     });
//     // }

//     VideoViewModel.prototype.playAndroidVideo= function() {
//         var Uri = android.net.Uri;
//         var Environment = android.os.Environment;
//         var uri = Uri.parse(Environment.getExternalStorageDirectory().getPath()+"/test.mp4");  
//     //调用系统自带的播放器 
//         var Intent = android.content.Intent;
//         var intent = new Intent(Intent.ACTION_VIEW); 
//         console.log("URI:::::::::", uri.toString()); 
//         intent.setDataAndType(uri, "video/mp4"); 
//         console.log("startActivity" + this.view);
//         this.startActivity(intent);
//     }
//     return VideoViewModel;
// })(activity);
// exports.VideoViewModel = VideoViewModel;
// exports.instance = new VideoViewModel();

function User(info) {
    info = info || {};
    // You can add properties to observables on creation
    var activity = android.app.Activity;
    var viewModel = new activity();
    viewModel.playIOSVideo = function(_view){
        // var moviePath = NSBundle.mainBundle().pathForResourceOfType("app/test2" ,"mp4");
        // console.log("moviePath: " + moviePath);
        // var movieUrl = NSURL.alloc().initFileURLWithPath(moviePath);
        // console.log("movieUrl: " + movieUrl);
        // var playerViewController = MPMoviePlayerViewController.alloc().initWithContentURL(movieUrl);
        // var player = playerViewController.moviePlayer;
        // player.scalingMode = MPMovieScalingModeFill;
        // player.controlStyle = MPMovieControlStyleEmbedded;
        // var view1 = args.object._view;
        // // player.view.frame = view1.frame;
        // player.view.frame = CGRectMake(100, 100, 100, 100);
        // view1.addSubview(player.view);
        // player.play();
        var moviePath = NSBundle.mainBundle().pathForResourceOfType("app/test2" ,"mp4");
        var movieUrl = NSU.fileURLWithPath(moviePath);
        var moviePlayer = MPMoviePlayerController.alloc().initWithContentURL(movieUrl);
        moviePlayer.prepareToPlay();
        moviePlayer.view.frame = _view.bounds;
        _view.addSubview(moviePlayer.view);
        // moviePlayer.fullscreen = YES;
        // moviePlayer.shouldAutoplay = YES;
        // moviePlayer.repeatMode = MPMovieRepeatModeNone;
        // moviePlayer.movieSourceType = MPMovieSourceTypeFile;
        moviePlayer.play();
    };
    viewModel.playAndroidVideo = function() {
        var Uri = android.net.Uri;
        var Environment = android.os.Environment;
        var uri = Uri.parse(Environment.getExternalStorageDirectory().getPath()+"/test.mp4");  
    //调用系统自带的播放器 
        var Intent = android.content.Intent;
        var intent = new Intent(Intent.ACTION_VIEW,uri); 
        console.log("URI:::::::::", uri.toString()); 
        // intent.setDataAndType(uri, "video/mp4"); 
        console.log("startActivity------" + this);
        this.startActivity(intent);
    };
    viewModel.playAndroidVideoView = function(){
        // var View = android.view.View;
        // var view = new View();
        // console.log("android.view.View------" + android.view.View);

        // var R = android.R;
        // // console.log("R.layout.video_view------" + R.layout.video_view);
        // // this.setContentView(R.layout.video_view);  
        var VideoView = android.widget.VideoView;
        this.setContentView(new VideoView(this));  
        // console.log("android.widget.VideoView------" + android.widget.VideoView);

        var Uri = android.net.Uri;
        var uri = Uri.parse("rtsp://v2.cache2.c.youtube.com/CjgLENy73wIaLwm3JbT_%ED%AF%80%ED%B0%819HqWohMYESARFEIJbXYtZ29vZ2xlSARSB3Jlc3VsdHNg_vSmsbeSyd5JDA==/0/0/0/video.3gp");  
        // var videoView = this.findViewById(R.id.video_view);  
        var MediaController = android.media.session.MediaController;
        videoView.setMediaController(new MediaController(this));  
        videoView.setVideoURI(uri);  
        //videoView.start();  
        videoView.requestFocus();  
        // var VideoView = android.widget.VideoView;
        // var vv = new VideoView(this);
        // this.setContentView(vv);
        // vv.setVideoPath();
        // vv.setMediaController(new MediaController(this));
    }; 
    viewModel.playAndroidVideo1 = function(){
        var MediaPlayer = android.media.MediaPlayer;
        var mp = new MediaPlayer();
        var Uri = android.net.Uri;
        var uri = Uri.parse("rtsp://v2.cache2.c.youtube.com/CjgLENy73wIaLwm3JbT_%ED%AF%80%ED%B0%819HqWohMYESARFEIJbXYtZ29vZ2xlSARSB3Jlc3VsdHNg_vSmsbeSyd5JDA==/0/0/0/video.3gp");  
        mp.setDataSource(uri);
        mp.prepare();
        mp.start();
    };
    return viewModel;
}
exports.User = User;
exports.instance1 = new User();
 // var mController;
 //        var vivi;
 //        super.onCreate(savedInstanceState);
 //        this.setContentView(2130903041);
 //        this.viv = (VideoView)this.findViewById(2131099650);
 //        this.mController = new MediaController(this);
 //        this.viv.setMediaController(this.mController);
 //        String videopath = this.getIntent().getStringExtra("path");
 //        if(videopath != null) {
 //            this.viv.setVideoPath(videopath);
 //        }
 //        this.viv.requestFocus();
 //        this.viv.start();