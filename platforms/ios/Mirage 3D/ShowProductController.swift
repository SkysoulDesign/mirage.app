//
//  ShowProductController.swift
//  mirageapp
//
//  Created by Rafael on 3/25/16.
//  Copyright © 2016 Telerik. All rights reserved.
//

import UIKit
import WatchKit
import WatchConnectivity

class ShowProductController: WKInterfaceController, WCSessionDelegate {
    
    var session:WCSession!
    var extraID:Int = 0;
    
    @IBOutlet var productName: WKInterfaceLabel!
    //@IBOutlet var productDescription: WKInterfaceLabel!
    
    @IBOutlet var playVideoButton: WKInterfaceButton!
    
    func session(session: WCSession, didReceiveMessage message: [String : AnyObject]) {
        
        print(message);
        
        /* Video Completed */
        if((message["completed"]) != nil){
            playVideoButton.setEnabled(true)
        }
        
    }
    
    @IBAction func playVideo() {
        
        print("playing video", extraID);
        
        playVideoButton.setEnabled(false)
        
        if(session.iOSDeviceNeedsUnlockAfterRebootForReachability){
            print("device not reachible");
        }
        
        session.sendMessage(["play_video": extraID], replyHandler: nil, errorHandler: nil)
        
    }
    
    override func awakeWithContext(context: AnyObject?) {
        
        super.awakeWithContext(context)
        
        print(context)
        
        extraID = context!["extraID"] as! Int;
        productName.setText(context!["name"] as? String);
        //productDescription.setText(context!["profile"] as? String);
        
        /** Set Session */
        if(WCSession.isSupported()){
            session = WCSession.defaultSession()
            session.delegate = self
            session.activateSession()
        }
        
        
        //        let data = NSData.init()
        //            data.setValue("hell iphone", forKey: "messahe")
        //
        
        //        let message : [String : AnyObject]
        //            message = [
        //                    "message":"Hello iPhone, sent from iWatch"
        //         ]
        
        
        //
        //        let requestURL: NSURL = NSURL(string: "https://cms.soapstudio.com/api/user/login?credential=demo1&password=demo123")!
        //                let urlRequest: NSMutableURLRequest = NSMutableURLRequest(URL: requestURL)
        //                let session = NSURLSession.sharedSession()
        //                let task = session.dataTaskWithRequest(urlRequest) {
        //                        (data, response, error) -> Void in
        //
        //        let httpResponse = response as! NSHTTPURLResponse
        
        
        //        print(response)
        
    }
    
}



//session.sendMessageData(data!, replyHandler: nil, errorHandler: nil);



//
//        let defaults = NSUserDefaults(suiteName: "group.com.soap.tumbler.Mirage3D");
//        defaults!.setObject("Vishal Virodhia", forKey: "test");
//        defaults!.setObject("iOS Programming", forKey: "description");
//
//        print(defaults!.synchronize());

//        let product = context as! String;

//        productName.setText(defaults!.stringForKey("shared"));


//        let userDefaults = NSUserDefaults(suiteName: "group.com.soap.tumbler.Mirage3D");
//            userDefaults!.synchronize();
//            userDefaults!.synchronize();

//        print(defaults!.stringForKey("shared"));




    