//
//  InterfaceController.swift
//  Mirage 3D Extension
//
//  Created by Rafael on 3/23/16.
//  Copyright © 2016 Telerik. All rights reserved.
//

import WatchKit
import Foundation


class InterfaceController: WKInterfaceController {

    @IBOutlet var table: WKInterfaceTable!
    
    var products = ["Batman", "Super Man", "Wonder Woman"];
    
    override func awakeWithContext(context: AnyObject?) {
        super.awakeWithContext(context)
        
        // Configure interface objects here.
        
        table.setNumberOfRows(products.count, withRowType: "ProductRow");
        
        for index in 0..<products.count{
            let row = table.rowControllerAtIndex(index) as! ProductRow
                row.productLabel.setText(products[index]);
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
