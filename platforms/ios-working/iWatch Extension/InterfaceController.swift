//
//  InterfaceController.swift
//  MIrage 3D Extension
//
//  Created by Rafael on 3/25/16.
//  Copyright © 2016 Telerik. All rights reserved.
//

import WatchKit
import Foundation


class InterfaceController: WKInterfaceController {
    
    @IBOutlet var table: WKInterfaceTable!
    
    var products = ["Batman", "Super Man", "Wonder Woman"];
    
    override func awakeWithContext(context: AnyObject?) {
        super.awakeWithContext(context)
        
        let userDefaults = NSUserDefaults(suiteName: "group.com.soap.tumbler.sharedata");
            userDefaults!.synchronize();
        
        print(userDefaults!.objectForKey("api"));
        
        if let restoredValue = userDefaults!.objectForKey("shared") {
            products = restoredValue as! [String]
        }
        else {
            products = ["nothing", "there", "god"];
        }
        
        table.setNumberOfRows(products.count, withRowType: "ProductRow");
        
        for index in 0..<products.count{
        
            let row = table.rowControllerAtIndex(index) as! ProductRow
                row.productName.setText(products[index]);
            
        }
        
    }
    
    override func table(table: WKInterfaceTable, didSelectRowAtIndex rowIndex: Int) {
        pushControllerWithName("ShowProductController", context: products[rowIndex])
    }
    
    override func willActivate() {
        // This method is called when watch view controller is about to be visible to user
        super.willActivate()
    }
    
    override func didDeactivate() {
        // This method is called when watch view controller is no longer visible
        super.didDeactivate()
    }
    
}
