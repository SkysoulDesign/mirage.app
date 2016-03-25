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
        
        let product = context as! String;
        
        productName.setText(product);
        
    }


}
