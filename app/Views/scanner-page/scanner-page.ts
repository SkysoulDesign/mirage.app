import barcodeScanner = require("nativescript-barcodescanner");
import dialogs = require( "ui/dialogs");
import {Page} from "ui/page";
import {navigate} from "../../Modules/Helpers";
import {NavigatedData} from "ui/page";

export function pageNavigatedTo(args:NavigatedData) {

    if (args.isBackNavigation)
        return navigate.back();

    barcodeScanner.available().then(available => {

            if (!available) {

                return dialogs.alert("QRCode scanning is not available on your device").then(function () {
                    navigate.to('register-product')
                });

            }

            barcodeScanner.hasCameraPermission().then(granted => {

                    if (!granted) {

                        barcodeScanner.requestCameraPermission().then(() => {
                                console.log("Camera permission requested");
                            }
                        );

                        return dialogs.alert("You haven't granted access to the camera, entering in manual input mode").then(() => {
                            navigate.to('register-product')
                        });

                    }

                    barcodeScanner.scan({
                        // iOS only, default 'Close'
                        cancelLabel: "Stop scanning",
                        // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
                        message: "Go scan something",
                        // Start with the front cam, if available. Android only, default false
                        preferFrontCamera: false,
                        // Render a button to switch between front and back cam. Android only, default false (on iOS it's always available)
                        showFlipCameraButton: false
                    }).then(
                        result => {
                            navigate.to('register-product', {context: result.text})
                        },
                        error => {
                            navigate.to('register-product')
                        }
                    );
                }
            );
        }
    );
}