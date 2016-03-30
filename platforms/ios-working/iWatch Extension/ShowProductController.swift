//
//  ShowProductController.swift
//  mirageapp
//
//  Created by Rafael on 3/29/16.
//  Copyright © 2016 Telerik. All rights reserved.
//

import UIKit
import WatchKit
import WatchConnectivity

class ShowProductController: WKInterfaceController, WCSessionDelegate {
    
    @IBOutlet var productName: WKInterfaceLabel!
    
    override func awakeWithContext(context: AnyObject?) {
        
        super.awakeWithContext(context)
        
        
        if WCSession.isSupported() {
            
            let session = WCSession.defaultSession();
            
            session.delegate = self;
          
            session.activateSession();
            
        }
        
        
        
        //        let product = context as! String;
        
//        productName.setText(defaults!.objectForKey("api"));
        
        
        //        let userDefaults = NSUserDefaults(suiteName: "group.com.soap.tumbler.Mirage3D");
        //            userDefaults!.synchronize();
        //            userDefaults!.synchronize();
        
    }
    
    func session(session: WCSession, didReceiveMessage message: [String : AnyObject]) {
        print(message);
    }
    
    
}
