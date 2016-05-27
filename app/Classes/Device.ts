import {screen} from "platform";

/**
 * Device Class
 */
export class Device {

    /**
     * Find out the greatest common divisor
     * @param a number|string
     * @param b number|string
     * @returns number
     */
    private static gcd(a:number, b:number):number {
        return (b == 0) ? a : this.gcd(b, a % b);
    }

    /**
     * Get device Ration ex 16:9
     */
    public static getRatio(divisor:string = "x"):string {
        let width = screen.mainScreen.widthPixels,
            height = screen.mainScreen.heightPixels,
            gcd = this.gcd(width, height);

        return height / gcd + divisor + width / gcd;
    }

}