 // exports.pageLoaded = function(args) {
 //    //     var Uri = android.net.Uri;
 //    //     var Environment = android.os.Environment;
 //    //     var uri = Uri.parse(Environment.getExternalStorageDirectory().getPath()+"/test.mp4");  
 //    // //调用系统自带的播放器 
 //    //     var Intent = android.content.Intent;
 //    //     var intent = new Intent(Intent.ACTION_VIEW,uri); 
 //    //     console.log("URI:::::::::", uri.toString()); 
 //    //     // intent.setDataAndType(uri, "video/mp4"); 
 //    //     console.log("startActivity------" + this);
 //    //     this.startActivity(intent);
 //    // var test = new AndroidVideoPlayer();
 //    };
function createVideoView(args) {
    console.log("createVideoView");
    //create videoview    
    var mVideoView = new android.widget.VideoView(args.context);
    var mMediaController = new android.widget.MediaController(args.context);
    mMediaController.setAnchorView(mVideoView);
        
    // parse the uri
    var videoLink = 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4';
    var mVideoURL = android.net.Uri.parse(videoLink);
    mVideoView.setVideoURI(mVideoURL);
    mVideoView.setMediaController(mMediaController);
    mVideoView.requestFocus();
    mVideoView.start();

    args.view = mVideoView;

    // Create our Complete Listener - this is triggered once a video reaches the end
    var completionListener = new android.media.MediaPlayer.OnCompletionListener({
        onCompletion: function(args) {
            console.log('Video Done');
        }
    });
    // Set the listener using the correct method
    mVideoView.setOnCompletionListener(completionListener);
}
exports.createVideoView = createVideoView;

//Implement SurfaceHolder interface to Play video
//Implement this interface to receive information about changes to the surface  
// implements SurfaceHolder.Callback
// var AndroidVideoPlayer = extends android.app.Activity({
 
//     var mediaPlayer;
//     var surfaceView;
//     var surfaceHolder;
//     var pausing = false;

//     /** Called when the activity is first created. */
//     onCreate: function(savedInstanceState) {
//         this.super.onCreate(savedInstanceState);
//         setContentView(android.R.layout.main);
         
//         // var buttonPlayVideo = (Button)findViewById(R.id.playvideoplayer);
         
//         getWindow().setFormat(android.graphics.PixelFormat.UNKNOWN);
        
//         //Displays a video file.   
//         // VideoView mVideoView = (VideoView)findViewById(R.id.videoview);
//         var mVideoView = new android.widget.VideoView();
        
//         var Uri = android.net.Uri;
//         var Environment = android.os.Environment;
//         var uri = Uri.parse(Environment.getExternalStorageDirectory().getPath()+"/test.mp4");  
//         // String uriPath = "android.resource://com.android.AndroidVideoPlayer/"+R.raw.k;
//         // Uri uri = Uri.parse(uriPath);
//         mVideoView.setVideoURI(uri);
//         mVideoView.requestFocus();
//         mVideoView.start();
     
//         // buttonPlayVideo.setOnClickListener(new Button.OnClickListener(){
 
//         //     @Override
//         //     public void onClick(View v) {
             
//         //             // VideoView refference see main.xml
//         //             var mVideoView = new android.widget.VideoView();
                    
//         //             String uriPath = "android.resource://com.android.AndroidVideoPlayer/"+R.raw.k;
                     
//         //             Uri uri = Uri.parse(uriPath);
//         //             mVideoView.setVideoURI(uri);
//         //             mVideoView.requestFocus();
//         //             mVideoView.start();
                 
                 
//         //     }});
//      }
     
//     surfaceChanged: function(holder,format, width,height) {
//         // TODO Auto-generated method stub
         
//     }
//     surfaceCreated: function(holder) {
//         // TODO Auto-generated method stub
         
//     }
 
//     surfaceDestroyed:function(older) {
//         // TODO Auto-generated method stub
         
//     }
// })