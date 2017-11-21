
enum DisplayType {
    //% block="rgb led"
    RGBLed = 0x0b,
    //% block="rgb led matrix"
    RGBLedMatrix = 0x60,
    //% block="digit display"
    DigitDisplay = 0x22
};

const colourValueArray: number[] = [
    0xff, 0x00, 0x00, 0xff, 0x18, 0x00, 0xff, 0x30, 0x00, 0xff, 0x48, 0x00, 0xff, 0x60, 0x00, 0xff, 0x78, 0x00, 0xff, 0x90, 0x00, 0xff, 0xa8, 0x00,
    0xff, 0xc0, 0x00, 0xff, 0xd8, 0x00, 0xff, 0xf0, 0x00, 0xf3, 0xff, 0x00, 0xdb, 0xff, 0x00, 0xc3, 0xff, 0x00, 0xab, 0xff, 0x00, 0x93, 0xff, 0x00,
    0x7b, 0xff, 0x00, 0x4b, 0xff, 0x00, 0x1b, 0xff, 0x00, 0x00, 0xff, 0x12, 0x00, 0xff, 0x42, 0x00, 0xff, 0x5a, 0x00, 0xff, 0x72, 0x00, 0xff, 0x8a,
    0x00, 0xff, 0xa2, 0x00, 0xff, 0xba, 0x00, 0xff, 0xd2, 0x00, 0xff, 0xea, 0x00, 0xff, 0xff, 0x00, 0xe7, 0xff, 0x00, 0xcf, 0xff, 0x00, 0xb7, 0xff,
    0x00, 0x9f, 0xff, 0x00, 0x87, 0xff, 0x00, 0x6f, 0xff, 0x00, 0x57, 0xff, 0x00, 0x3f, 0xff, 0x00, 0x0f, 0xff, 0x24, 0x00, 0xff, 0x54, 0x00, 0xff,
    0x84, 0x00, 0xff, 0x9c, 0x00, 0xff, 0xb4, 0x00, 0xff, 0xcc, 0x00, 0xff, 0xe4, 0x00, 0xff, 0xff, 0x00, 0xff, 0xff, 0x00, 0xe7, 0xff, 0x00, 0xcf,
    0xff, 0x00, 0xb7, 0xff, 0x00, 0x9f, 0xff, 0x00, 0x87, 0xff, 0x00, 0x6f, 0xff, 0x00, 0x57, 0xff, 0x00, 0x3f, 0xff, 0x00, 0x27, 0xff, 0x00, 0x0f
];

const colourIndexArray: number[] = [
    0x00,  0x04,  0x08,  0x0c,  0x10,  0x14,  0x18,  0x1c,  
    0x20,  0x24,  0x28,  0x2c,  0x30,  0x34,  0x38,  0x3c, 
    0x40,  0x48,  0x50,  0x58,  0x60,  0x64,  0x68,  0x6c,  
    0x70,  0x74,  0x78,  0x7c,  0x80,  0x84,  0x88,  0x8c,  
    0x90,  0x94,  0x98,  0x9c,  0xa0,  0xa8,  0xb0,  0xb8,  
    0xc0,  0xc4,  0xc8,  0xcc,  0xd0,  0xd4,  0xd8,  0xdc,  
    0xe0,  0xe4,  0xe8,  0xec,  0xf0,  0xf4,  0xf8,  0xfc
];

/**
 * Functions to operate Grove Zero module.
 */
//% color=#00acdb weight=100 icon="icons/display.svg" block="Display"
//% groups='["other", "Digit Display", "RGB Led", "RGB Led Matrix"]'
namespace display
{
    /**
     * Display the number.
     * @param num value want to display, from 0 to 9999.
     */
    //% blockId="display_digit_display_show_number" block="digit display show|%num"
    //% num.min=0 num.max=9999 num.defl=0
    //% weight=100 blockGap=8 group="Digit Display"
    export function showDigitDisplay(num: number)
    {
        let data: Buffer = pins.createBuffer(3);
        data[0] = 0x02;
        data[1] = num & 0xff;
        data[2] = (num >> 8) & 0xff;
        driver.i2cSendBytes(DisplayType.DigitDisplay, data);
    }
    
    /**
     * Clean digit display.
     */
    //% blockId="display_digit_display_clean" block="digit display clean"
    //% weight=99 blockGap=8 group="Digit Display"
    export function cleanDigitDisplay()
    {
        
    }
    
    /**
     * Start digit display timer.
     * @param time value of timer timeout.
     */
    //% blockId="display_digit_display_start_timer" block="start timer(second)|%time"
    //% time.min=0 time.max=9999 time.defl=0
    //% weight=98 blockGap=8 group="Digit Display"
    export function startTimer(time: number)
    {
        let data: Buffer = pins.createBuffer(3);
        data[0] = 0x03;
        data[1] = time & 0xff;
        data[2] = (time >> 8) & 0xff;
        driver.i2cSendBytes(DisplayType.DigitDisplay, data);
    }
    
    /**
     * Do something when the digit display timer out.
     * @param handler code to run
     */
    //% blockId=display_digit_display_create_event block="on Timerout"
    //% weight=97 blockGap=8 group="Digit Display"
    export function onTimerOut(handler: Action) {
        const eventId = driver.subscribeToEventSource(DisplayType.DigitDisplay);
        control.onEvent(eventId, 1, handler);
    }
    
    /**
     * Start the Stopwatch.
     */
    //% blockId="display_digit_display_start_stopwatch" block="start stopwatch"
    //% weight=96 blockGap=8 group="Digit Display"
    export function startStopwatch()
    {
        driver.i2cSendByte(DisplayType.DigitDisplay, 0x04);
    }
    
    /**
     * Pause the Stopwatch.
     */
    //% blockId="display_digit_display_pause_stopwatch" block="pause stopwatch"
    //% weight=95 blockGap=8 group="Digit Display"
    export function pauseStopwatch()
    {
        driver.i2cSendByte(DisplayType.DigitDisplay, 0x05);
    }
    
    /**
     * Resume the Stopwatch.
     */
    //% blockId="display_digit_display_resume_stopwatch" block="resume stopwatch"
    //% weight=94 blockGap=8 group="Digit Display"
    export function resumeStopwatch()
    {
        driver.i2cSendByte(DisplayType.DigitDisplay, 0x06);
    }
    
    /**
     * Reset the Stopwatch.
     */
    //% blockId="display_digit_display_reset_stopwatch" block="reset stopwatch"
    //% weight=93 blockGap=8 group="Digit Display"
    export function resetStopwatch()
    {
        driver.i2cSendByte(DisplayType.DigitDisplay, 0x07);
    }
    
    /**
     * Read the stopwatch value in millisecond.
     */
    //% blockId=sensor_get_stopwatch_value block="read stopwatch(ms)"
    //% weight=92 blockGap=8 group="Digit Display"
    export function stopwatch(): number
    {
        let data: Buffer = pins.createBuffer(4);
        driver.i2cSendByte(DisplayType.DigitDisplay, 0x08);
        data = driver.i2cReceiveBytes(DisplayType.DigitDisplay, 4);
        return (data[0] + data[1] * 256 + data[2] * 65536);
    }
    
    /**
     * Display always mode on RGB LED.
     * @param color the color of display.
     * @param duration display time duration(ms). Set it to 0 to display forever.
     */
    //% blockId="display_rgb_led_display_alway" block="RGB Led alway %color=colorNumberPicker"
    //% weight=100 blockGap=8 group="RGB Led"
    export function displayAlway(color: number, duration = 1000)
    {
        
        loops.pause(duration);
    }
    
    /**
     * Display a random color on RGB LED.
     * @param duration display time duration(ms). Set it to 0 to display forever.
     */
    //% blockId="display_rgb_led_display_random_color" block="RGB Led random color"
    //% weight=99 blockGap=8 group="RGB Led"
    export function displayRandomColor(duration = 1000)
    {
        
        loops.pause(duration);
    }
    
    /**
     * Display blink mode on RGB LED.
     * @param color the color of display.
     * @param interval display blink interval time(ms), this parameter determines the rate of blink, default 250ms.
     * @param duration display time duration(ms). Set it to 0 to display forever.
     */
    //% blockId="display_rgb_led_display_blink" block="RGB Led blink %color=colorNumberPicker"
    //% weight=98 blockGap=8 group="RGB Led"
    export function displayBlink(color: number, interval = 250, duration = 1000)
    {
        
        loops.pause(duration);
    }
    
    /**
     * Display breathe mode on RGB LED.
     * @param color the color of display.
     * @param interval display breathe interval time(ms), this parameter determines the rate of color change, default 20ms.
     * @param duration display time duration(ms). Set it to 0 to display forever.
     */
    //% blockId="display_rgb_led_display_breathe" block="RGB Led breathe %color=colorNumberPicker"
    //% weight=97 blockGap=8 group="RGB Led"
    export function displayBreathe(color: number, interval = 20, duration = 1000)
    {
        
        loops.pause(duration);
    }
    
    /**
     * Display rainbow mode on RGB LED.
     * @param interval display rainbow interval time(ms), this parameter determines the rate of color change, default 20ms.
     * @param duration display time duration(ms). Set it to 0 to display forever.
     */
    //% blockId="display_rgb_led_display_rainbow" block="RGB Led rainbow"
    //% weight=96 blockGap=8 group="RGB Led"
    export function displayRainbow(interval = 20, duration = 1000)
    {
        
        loops.pause(duration);
    }
    
    /**
     * Display fade mode on RGB LED. The RGB LED will change from color1 to color2.
     * @param color1 the color of display at first.
     * @param color2 the color of display at finally.
     * @param interval display breathe interval time(ms), this parameter determines the rate of color change, default 20ms.
     * @param duration display time duration(ms) after the color change finish, set it to 0 to display forever.
     */
    //% blockId="display_rgb_led_display_fade" block="RGB Led fade|from %color1=colorNumberPicker|to %color2=colorNumberPicker"
    //% weight=95 blockGap=8 group="RGB Led"
    export function displayFade(color1: number, color2: number, interval = 20, duration = 1000)
    {
        
        loops.pause(duration);
    }

    /**
     * Set the brightness of RGB LED.
     * @param brightness display brightness, from 0 - 255, default 100.
     */
    //% blockId="display_rgb_led_display_set_brighness" block="RGB Led set brightness|%brightness"
    //% brightness.min=0 brightness.max=255 brightness.defl=100
    //% weight=94 blockGap=8 group="RGB Led"
    export function setBrightness(brightness: number)
    {
        
    }
    
    /**
     * Display nothing on RGB LED.
     */
    //% blockId="display_rgb_led_display_stop" block="RGB Led stop display"
    //% weight=93 blockGap=8 group="RGB Led"
    export function stopDisplay()
    {
        
    }

    /**
     * Converts red, green, blue channels into a RGB color
     * @param red value of the red channel between 0 and 255. eg: 255
     * @param green value of the green channel between 0 and 255. eg: 255
     * @param blue value of the blue channel between 0 and 255. eg: 255
     */
    //% blockId="display_rgb_led_color" block="red %red|green %green|blue %blue"
    //% red.min=0 red.max=255 green.min=0 green.max=255 blue.min=0 blue.max=255
    //% red.shadowOptions.color="#FF6680"
    //% green.shadowOptions.color="#59C059"
    //% blue.shadowOptions.color="#4C97FF"
    //% weight=92 blockGap=8 group="RGB Led"
    export function rgbLedColor(red: number, green: number, blue: number): number {
        return ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF);
    }
    
    /**
     * Draw a pixel image on rgb LED Matrix.
     * @param color the color of display.
     * @param image a string describing the leds, eg: ""
     */
    //% blockId="display_rgb_matrix_show_leds" block="RGB LED Matrix show leds %color=colorNumberPicker|%image"
    //% image.fieldEditor="matrix"
    //% image.fieldOptions.onParentBlock=true
    //% image.fieldOptions.decompileLiterals=true
    //% image.fieldOptions.rows=8
    //% image.fieldOptions.columns=8
    //% blockExternalInputs="true"
    //% weight=100 blockGap=8 group="RGB Led Matrix"
    export function showRGBLeds(color: number, image: string)
    {
        
    }
    
    /**
     * Display text on the rgb LED Matrix. Any text with more than 1 character will scroll on the screen.
     * @param str the string pointer, the maximum number is 28 bytes, eg: hello
     * @param color the color of display.
     * @param orientation the orientation type.
     */
    //% blockId=display_rgb_matrix_dispaly_string block="RGB LED Matrix show string %str|%color=colorNumberPicker"
    //% weight=99 blockGap=8 group="RGB Led Matrix"
    export function showRGBString(str: string, color: number, orientation = OrientationType.Rotate0)
    {
        
    }
    
    /**
     * Display a number on the rgb LED Matrix. A number with more than 1 digit will scroll on the screen.
     * @param num set the number you want to display on LED matrix. Long numbers will roll on it, the shorter you set the time duration, the faster it rolls, eg: 0
     * @param color the color of display.
     * @param orientation the orientation type.
     */
    //% blockId=display_rgb_matrix_dispaly_number block="RGB LED Matrix show number %num|%color=colorNumberPicker"
    //% weight=98 blockGap=8 group="RGB Led Matrix"
    export function showRGBNumber(num: number, color: number, orientation = OrientationType.Rotate0)
    {
        
    }
    
    /**
     * Display a graph for a positive value on the rgb LED Matrix.
     * @param value the value to be graphed, eg: 0
     * @param max the maximum value of the graph, eg: 1023
     * @param color the color of display.
     */
    //% blockId=display_rgb_matrix_dispaly_bar block="RGB LED Matrix graph %value|up to %max|%color=colorNumberPicker"
    //% weight=97 blockGap=8 group="RGB Led Matrix"
    export function showRGBBars(value: number, max: number, color: number)
    {
        
    }
    
    /**
     * Show a single icon frame on the rgb LED Matrix.
     * @param icon the icon want to show
     * @param color the color of display.
     * @param duration display time duration(ms).
     */
    //% blockId=display_show_rgb_matrix_icon block="RGB LED Matrix show icon %animation=display_icon_picker|%color=colorNumberPicker"
    //% weight=96 blockGap=8 group="RGB Led Matrix"
    //% duration.defl=1000
    export function showRGBIcon(icon: IconClass, color: number)
    {
        let renderer = icon.createRenderer();
        renderer();
    }
    
    /**
     * Show a single animation frame on the rgb LED Matrix.
     * @param animation the animation want to show
     * @param duration display time duration(ms).
     */
    //% blockId=display_show_rgb_matrix_animation block="RGB LED Matrix show animation %animation=display_animation_picker"
    //% weight=95 blockGap=8 group="RGB Led Matrix"
    export function showRGBAnimation(animation: AnimationClass)
    {
        let renderer = animation.createRenderer();
        renderer();
    }
    
    /**
      * Get the color picker field editor
      * @param color color, eg: 0xFF0000
      */
    //% blockId=colorNumberPicker block="%color"
    //% colorSecondary="#FFFFFF"
    //% color.fieldEditor="colornumber" color.fieldOptions.decompileLiterals=true
    //% color.fieldOptions.colours='["#ff0000", "#ff1800", "#ff3000", "#ff4800", "#ff6000", "#ff7800", "#ff9000", "#ffa800", "#ffc000", "#ffd800", "#fff000", "#f3ff00", "#dbff00", "#c3ff00", "#abff00", "#93ff00", "#7bff00", "#4bff00", "#1bff00", "#00ff12", "#00ff42", "#00ff5a", "#00ff72", "#00ff8a", "#00ffa2", "#00ffba", "#00ffd2", "#00ffea", "#00ffff", "#00e7ff", "#00cfff", "#00b7ff", "#009fff", "#0087ff", "#006fff", "#0057ff", "#003fff", "#000fff", "#2400ff", "#5400ff", "#8400ff", "#9c00ff", "#b400ff", "#cc00ff", "#e400ff", "#ff00ff", "#ff00e7", "#ff00cf", "#ff00b7", "#ff009f", "#ff0087", "#ff006f", "#ff0057", "#ff003f", "#ff0027", "#ff000f"]'
    //% color.fieldOptions.columns=8
    //% blockHidden=true
    export function colorNumberPicker(color: number): number{
        for(let i = 0; i < 56; i ++) 
        {
            let temp = (colourValueArray[i * 3] << 16) + (colourValueArray[i * 3 + 1] << 8) + colourValueArray[i * 3 + 2];
            if(temp == color)return colourIndexArray[i];
        }
        return 0;
    }
    
//    /**
//     * test
//     * @param color the color of display.
//     */
//    //% blockId=display_test block="show color index %color=colorNumberPicker"
//    //% weight=95 blockGap=8 group="RGB Led Matrix"
//    export function showColorIndex(color: number)
//    {
//        display.showNumber(color, OrientationType.Rotate0);
//    }
    
    /**
      * Get the color wheel field editor
      * @param value value between 0 to 255 to get a color value, eg: 10
      */
    //% blockId=colorWheelPicker block="%color"
    //% colorSecondary="#FFFFFF"
    //% color.fieldEditor="colorwheel" color.fieldOptions.decompileLiterals=true
    //% color.fieldOptions.sliderWidth='200' color.fieldOptions.channel="hsvfast"
    //% color.fieldOptions.min=0 color.fieldOptions.max=255
    //% blockHidden=true
    export function colorWheelPicker(color: number): number {
        return color;
    }
    
    //% fixedInstances
    export class IconClass {
        constructor() { }
        createRenderer(): () => boolean {
            return undefined;
        }
    }
    
    class rgbIcon extends IconClass {
        public index: number;
        constructor(index: number) { 
            super();
            this.index = index;
        }

        public createRenderer(): () => boolean {
            return () => {
                display.showNumber(this.index, OrientationType.Rotate0);
                return false;
            }
        }
    }
    
    //% fixedInstance block="calmIcon" jres blockIdentity="display.iconPicker"
    export const calmIcon: IconClass = new rgbIcon(0);
    //% fixedInstance block="catIcon" jres blockIdentity="display.iconPicker"
    export const catIcon: IconClass = new rgbIcon(1);
    //% fixedInstance block="downIcon" jres blockIdentity="display.iconPicker"
    export const downIcon: IconClass = new rgbIcon(2);
    //% fixedInstance block="giraffeIcon" jres blockIdentity="display.iconPicker"
    export const giraffeIcon: IconClass = new rgbIcon(3);
    //% fixedInstance block="hatmanIcon" jres blockIdentity="display.iconPicker"
    export const hatmanIcon: IconClass = new rgbIcon(4);
    //% fixedInstance block="jellyfishIcon" jres blockIdentity="display.iconPicker"
    export const jellyfishIcon: IconClass = new rgbIcon(5);
    
    /**
     * An icon that can be shown on a rgb led matrix
     * @param icon The icon type
     */
    //% blockId=display_icon_picker block="%icon"
    //% icon.fieldEditor="imagedropdown"
    //% icon.fieldOptions.width=200 icon.fieldOptions.columns="3"
    //% blockHidden=true
    export function iconPicker(icon: IconClass): IconClass {
        return icon;
    }
    
    //% fixedInstances
    export class AnimationClass {
        constructor() { }
        createRenderer(): () => boolean {
            return undefined;
        }
    }
    
    class rgbAnimation extends AnimationClass {
        public index: number;
        constructor(index: number) { 
            super();
            this.index = index;
        }

        public createRenderer(): () => boolean {
            return () => {
                display.showNumber(this.index, OrientationType.Rotate0);
                return false;
            }
        }
    }
    
    //% fixedInstance block="rainbowAnimation" jres blockIdentity="display.animationPicker"
    export const rainbowAnimation: AnimationClass = new rgbAnimation(0);
    //% fixedInstance block="colorWipeAnimation" jres blockIdentity="display.animationPicker"
    export const colorWipeAnimation: AnimationClass = new rgbAnimation(1);
    //% fixedInstance block="runningLightsAnimation" jres blockIdentity="display.animationPicker"
    export const runningLightsAnimation: AnimationClass = new rgbAnimation(2);
    //% fixedInstance block="sparkleAnimation" jres blockIdentity="display.animationPicker"
    export const sparkleAnimation: AnimationClass = new rgbAnimation(3);
    //% fixedInstance block="theaterChaseAnimation" jres blockIdentity="display.animationPicker"
    export const theaterChaseAnimation: AnimationClass = new rgbAnimation(4);
    //% fixedInstance block="cometAnimation" jres blockIdentity="display.animationPicker"
    export const cometAnimation: AnimationClass = new rgbAnimation(5);

    /**
     * An animation that can be shown on a light strip
     * @param animation The animation type
     */
    //% blockId=display_animation_picker block="%animation"
    //% animation.fieldEditor="imagedropdown"
    //% animation.fieldOptions.width=200 animation.fieldOptions.columns="3"
    //% blockHidden=true
    export function animationPicker(animation: AnimationClass): AnimationClass {
        return animation;
    }
}