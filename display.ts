
enum DisplayType {
    //% block="rgb led"
    RGBLed = 0x0b
};

/**
 * Functions to operate G2 module.
 */
//% color=#00acdb weight=100 icon="icons/basic.svg" block="Display"
namespace display
{
    /**
     * Set RGB Led color ...
     * @param red color of led
     * @param green color of led
     * @param blue color of led
     */
    //% blockId="display_rgb_led_show_leds" block="RGB Led show R|%red|G|%green|B|%blue"
    //% weight=100 blockGap=8
    //% help=
    export function showRGBLed(red: number, green: number, blue: number)
    {
        
    }
}