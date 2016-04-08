import barcodeScanner = require("nativescript-barcodescanner");
import dialogs = require( "ui/dialogs");
import {Page} from "ui/page";
import {ShownModallyData} from "ui/page";
import {NavigatedData} from "ui/page";
import {navigate} from "../../Modules/Helpers";
import {EventData} from "data/observable";

export function pageLoaded(args:EventData) {

    var page = <Page>args.object;

    barcodeScanner.available().then(available => {

            if (!available) {

                return dialogs.alert("QRCode scanning is not available on your device").then(function () {
                    page.closeModal()
                });

            }

            barcodeScanner.hasCameraPermission().then(granted => {

                    if (!granted) {

                        barcodeScanner.requestCameraPermission().then(() => {
                                console.log("Camera permission requested");
                            }
                        );

                        return dialogs.alert("You haven't granted access to the camera, entering in manual input mode").then(() => {
                            page.closeModal()
                        });

                    }

                    barcodeScanner.scan({
                        cancelLabel: "Cancel",
                        message: "Scan Product QRCode",
                        preferFrontCamera: false,
                        showFlipCameraButton: false
                    }).then(
                        result => {
                            page.closeModal(result.text);
                        },
                        error => {
                            page.closeModal()
                        }
                    );
                }
            );
        }
    );
}