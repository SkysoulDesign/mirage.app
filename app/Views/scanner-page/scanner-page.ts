import barcodeScanner = require("nativescript-barcodescanner");
import dialogs = require( "ui/dialogs");
import {Page} from "ui/page";
import {navigate} from "../../Modules/Helpers";
import {NavigatedData} from "ui/page";
import {ScannerPageModel} from "../../Models/scanner-page-model";

export function pageNavigatedTo(args:NavigatedData) {

    if (args.isBackNavigation)
        return navigate.back();

    var returnDefault = 'main-page';

    var scannerModel = new ScannerPageModel();
    var page = <Page>args.object,
        image = page.getViewById('figure');

    barcodeScanner.available().then(available => {

            if (!available) {

                return dialogs.alert("QRCode scanning is not available on your device").then(function () {
                    navigate.to(returnDefault)
                });

            }

            barcodeScanner.hasCameraPermission().then(granted => {

                    if (!granted) {

                        barcodeScanner.requestCameraPermission().then(() => {
                                console.log("Camera permission requested");
                            }
                        );

                        return dialogs.alert("You haven't granted access to the camera, entering in manual input mode").then(() => {
                            navigate.to(returnDefault)
                        });

                    }

                    barcodeScanner.scan({
                        cancelLabel: "Cancel",
                        message: "Scan Product",
                        preferFrontCamera: false,
                        showFlipCameraButton: false
                    }).then(
                        result => {
                            //navigate.to('register-product', {context: result.text})
                            page.bindingContext = scannerModel.init({page: page, image: image, scannedCode: result.text});
                        },
                        error => {
                            navigate.to(returnDefault)
                            //page.bindingContext = scannerModel.init({page: page, image: image, scannedCode: 'MF001-ffff-ffff-gggg'});
                        }
                    );
                }
            );
        }
    );
}