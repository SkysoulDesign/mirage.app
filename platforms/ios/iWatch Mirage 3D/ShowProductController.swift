//
//  ShowProductController.swift
//  mirageapp
//
//  Created by Rafael on 3/25/16.
//  Copyright © 2016 Telerik. All rights reserved.
//

import UIKit
import WatchKit

class ShowProductController: WKInterfaceController {
    
    @IBOutlet var productName: WKInterfaceLabel!
    
    override func awakeWithContext(context: AnyObject?) {
        
        super.awakeWithContext(context)
        
        
        let defaults = NSUserDefaults(suiteName: "group.com.soap.tumbler.Mirage3D");
        defaults!.setObject("Vishal Virodhia", forKey: "test");
        defaults!.setObject("iOS Programming", forKey: "description");
        
        print(defaults!.synchronize());
        
        //        let product = context as! String;
        
        productName.setText(defaults!.stringForKey("shared"));
        
        
        //        let userDefaults = NSUserDefaults(suiteName: "group.com.soap.tumbler.Mirage3D");
        //            userDefaults!.synchronize();
        //            userDefaults!.synchronize();
        
        print(defaults!.stringForKey("shared"));
        
        
    }
    
    
}