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
var mVideoView;
function createVideoView(args) {
    console.log("createVideoView");
    //create videoview    
    mVideoView = new android.widget.VideoView(args.context);
    var mMediaController = new android.widget.MediaController(args.context);
    mMediaController.setAnchorView(mVideoView);
    var params = new android.view.ViewGroup.LayoutParams(android.view.ViewGroup.LayoutParams.MATCH_PARENT,1); 
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
exports.createVideoView = createVideoView;
function switchfullscreen(fullscreen){
    var LayoutParams =  android.widget.RelativeLayout.LayoutParams;
    var RelativeLayout = android.widget.RelativeLayout;
      if(!fullscreen){//设置RelativeLayout的全屏模式
        var layoutParams=new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT);
            layoutParams.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM);
            layoutParams.addRule(RelativeLayout.ALIGN_PARENT_TOP);
            layoutParams.addRule(RelativeLayout.ALIGN_PARENT_LEFT);
            layoutParams.addRule(RelativeLayout.ALIGN_PARENT_RIGHT);
            mVideoView.setLayoutParams(layoutParams);
            fullscreen = true;//改变全屏/窗口的标记
        }else{//设置RelativeLayout的窗口模式
           var lp=new LayoutParams(320,240);
           lp.addRule(RelativeLayout.CENTER_IN_PARENT);
             mVideoView.setLayoutParams(lp);
             fullscreen = false;//改变全屏/窗口的标记
        }    
}
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