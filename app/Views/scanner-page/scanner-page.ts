import barcodeScanner = require("nativescript-barcodescanner");
import dialogs = require( "ui/dialogs");
import {Page} from "ui/page";
import {ShownModallyData} from "ui/page";
import {NavigatedData} from "ui/page";
import {navigate} from "../../Modules/Helpers";
import {EventData} from "data/observable";

export function pageNavigatedTo(args:NavigatedData) {

    if (args.isBackNavigation)
        return navigate.back();

    barcodeScanner.available().then(available => {

            if (!available) {

                return dialogs.alert("QRCode scanning is not available on your device").then(function () {
                    navigate.back()
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
                        cancelLabel: "Cancel",
                        message: "Scan Product QRCode",
                        preferFrontCamera: false,
                        showFlipCameraButton: false
                    }).then(
                        result => {
                            navigate.to('register-product', {context: result.text})
                        },
                        error => {
                            navigate.back()
                        }
                    );

                }
            );
        }
    );
}