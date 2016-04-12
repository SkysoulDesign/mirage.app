//
//  InterfaceController.swift
//  MIrage 3D Extension
//
//  Created by Rafael on 3/25/16.
//  Copyright © 2016 Telerik. All rights reserved.
//

import WatchKit
import Foundation
import WatchConnectivity


class InterfaceController: WKInterfaceController, WCSessionDelegate {
    
    @IBOutlet var table: WKInterfaceTable!
    
    var products = [[String:AnyObject]]()
    
    var session:WCSession!
    var connected:Bool = false;
    
    func session(session: WCSession, didReceiveMessage message: [String : AnyObject]) {
        
        let values = message.values;
        
        if !values.isEmpty {

            /* Connect Device Device */
            if((message["paired"]) != nil){
                connected = message["paired"] as! Bool;
                print("device paired");
            }
            
            /* Error Message*/
            if((message["error"]) != nil){             
                print(message["error"]);
            }
            
            /* Received Products */
            if((message["products"]) != nil){
                
                print("received products");
                
                let items = message["products"];
                
                table.setNumberOfRows(items!.count, withRowType: "ProductRow");
                
                for index in 0..<items!.count{
                    
                    let product = message["products"]![index]["product"]
                    let row = table.rowControllerAtIndex(index) as! ProductRow
                        row.productName.setText(product!!["name"] as? String);
                    
                    let collection = [
                        "name": (product!!["name"] as? String)!,
                        "profile": (product!!["profile"]!!["description"] as? String)!,
                        "extraID": (product!!["extras"]!![0]["id"] as? Int)!
                    ]
                    
                    /** Append to clobal */
                    products.append(collection as! [String : AnyObject]);
                    
                    
                }
          

            }
            
        }
        
        
    }
    
    override func awakeWithContext(context: AnyObject?) {
        super.awakeWithContext(context)
        
        print("hi");
        
        if(WCSession.isSupported()){
            session = WCSession.defaultSession()
            session.delegate = self
            session.activateSession()
        }
        
        /** get cache **/
        session.sendMessage(["paired": true], replyHandler: nil, errorHandler: nil)

        
//        let userDefaults = NSUserDefaults(suiteName: "group.com.soap.tumbler.Mirage3D");
//        userDefaults!.synchronize();
//        
//        print(userDefaults!.objectForKey("shared"));
//        
//        if let restoredValue = userDefaults!.objectForKey("shared") {
//            products = restoredValue as! [String]
//        }
//        else {
//            products = ["nothing", "there", "god"];
//        }
        
//        table.setNumberOfRows(products.count, withRowType: "ProductRow");
//        
//        for index in 0..<products.count{
//            let row = table.rowControllerAtIndex(index) as! ProductRow
//            row.productName.setText(products[index]);
//        }
        
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
