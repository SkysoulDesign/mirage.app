import {ImageFormat} from "ui/enums";
import {ImageSource, fromFile} from "image-source";
import fs = require("file-system");
import {Image} from "ui/image";

/**
 * File Class
 */
export class File {

    /**
     * Save Image
     * @param source
     * @param fileName
     * @returns {any}
     */
    public static save(source:ImageSource, fileName:string):boolean {
        return source.saveToFile(this.getPath(fileName), ImageFormat.png);
    }

    /**
     * Save image from Base64
     * @param image
     * @param fileName
     * @returns {boolean}
     */
    public static saveFromBase64(image:string, fileName:string):boolean {
        let source = new Image();
            source.src = image;
        return this.save(source.imageSource, fileName);
    }

    /**
     * Load the image from source
     */
    public static load(fileName:string):ImageSource {
        return fromFile(this.getPath(fileName));
    }

    /**
     * Check if file exists
     * @param fileName
     * @returns {boolean}
     */
    public static has(fileName:string):boolean {
        return fs.File.exists(this.getPath(fileName));
    }

    /**
     * Get File Path
     * @param fileName
     * @returns {string}
     */
    private static getPath(fileName:string) {
        return fs.path.join(fs.knownFolders.documents().path, fileName);
    }

}