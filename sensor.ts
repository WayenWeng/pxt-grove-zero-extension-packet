
enum SensorType {
    //% block=ultrasonic
	Ultrasonic= 0x23,
    //% block=pir
	Pir = 9,
    //% block=gesture
    Gesture = 0x0c,
    //% block=encoder
    Encoder = 0x10,   
    //% block=liner
    Liner = 0x27
}

enum UltrasonicEvent
{
    //% block=close
    Close = 1,
    //% block=far
	Far= 3
};

enum PIREvent
{
    //% block=move
    Move = 1,
    //% block=stop
	Stop = 3
};

enum GestureEvent
{
    //% block=left
    Left = 2,
    //% block=right
	Right = 1,
    //% block=up
    Up = 3,
    //% block=down
    Down = 4,
    //% block=forward
    Forward = 5,
    //% block=backward
    Backward = 6,
    //% block=clockwise
    Clockwise = 7,
    //% block=anticlockwise
    Anticlockwise = 8
};

enum EncoderEvent
{
    //% block=increase
	Increase = 1,
    //% block=decrease
	Decrease = 2,
    //% block=press
	Press = 3
};

enum ColorEvent
{
    //% block=black
	Black = 1,
    //% block=red
    Red = 2,
    //% block=green
    Green = 3,
    //% block=blue
    Blue = 4,
    //% block=other
    Other = 5
};

enum LinerEvent
{
    //% block=left
	Left = 1,
    //% block=right
    Right = 2,
    //% block=straight
	Straight = 3,
    //% block=end
    End = 4
};

enum LinerType
{
    //% block=A
	A = 0x10,
    //% block=B
    B = 0x08,
    //% block=C
	C = 0x04,
    //% block=D
	D = 0x02,
    //% block=E
    E = 0x01
};

/**
 * Functions to operate Grove Zero module.
 */
//% weight=98 color=#E5B646 icon="icons/sensor.svg" block="Sensor"
//% groups='["other", "More"]'
namespace sensor
{
    /**
     * Do something when the ultrasonic sensor detects ...
     * @param event type of ultrasonic to detect
     * @param handler code to run
     */
    //% blockId=sensor_ultrasonic_create_event block="on ultrasonic|%event"
    //% weight=90 blockGap=8
    export function onUltrasonic(event: UltrasonicEvent, handler: Action) {
        const eventId = driver.subscribeToEventSource(SensorType.Ultrasonic);
        control.onEvent(eventId, event, handler);
    }
    
    /**
     * Do something when the pir sensor detects ...
     * @param event type of pir to detect
     * @param handler code to run
     */
    //% blockId=sensor_pir_create_event block="on PIR|%event"
    //% weight=89 blockGap=8
    export function onPIR(event: PIREvent, handler: Action) {
        const eventId = driver.subscribeToEventSource(SensorType.Pir);
        control.onEvent(eventId, event, handler);
    }
    
    /**
     * Do something when the gesture sensor detects a motion event (move left, up etc...)
     * @param event type of gesture to detect
     * @param handler code to run
     */
    //% blockId=sensor_gesture_create_event block="on gesture|%event"
    //% weight=88 blockGap=8
    export function onGesture(event: GestureEvent, handler: Action) {
        const eventId = driver.subscribeToEventSource(SensorType.Gesture);
        control.onEvent(eventId, event, handler);
    }
    
    /**
     * Do something when the encoder sensor detects a motion event (increase, decrease etc...)
     * @param event type of encoder to detect
     * @param handler code to run
     */
    //% blockId=sensor_encoder_create_event block="on encoder|%event"
    //% weight=87 blockGap=8
    export function onEncoder(event: EncoderEvent, handler: Action) {
        const eventId = driver.subscribeToEventSource(SensorType.Encoder);
        control.onEvent(eventId, event, handler);
    }
    
    /**
     * Do something when the color sensor detects a color event (red, blue etc...)
     * @param event type of color to detect
     * @param handler code to run
     */
    //% blockId=sensor_color_create_event block="on color|%event"
    //% weight=86 blockGap=8
    export function onColor(event: ColorEvent, handler: Action) {
        const eventId = driver.subscribeToEventSource(SensorType.Liner);
        control.onEvent(eventId, event, handler);
    }
    
    const eventIdLiner = 9000;
    let initLiner = false;
    let lastLiner = 0;
    
    /**
     * Do something when the liner sensor detects a motion event (left, right etc...)
     * @param event type of liner to detect
     * @param handler code to run
     */
    //% blockId=sensor_liner_create_event block="on liner|%event"
    //% weight=85 blockGap=8
    export function onLiner(event: LinerEvent, handler: Action) {
        control.onEvent(eventIdLiner, event, handler);
        if (!initLiner) {
            initLiner = true;
            control.runInBackground(() => {
                while(true) {
                    driver.i2cSendByte(SensorType.Liner, 0x02);
                    const event = driver.i2cReceiveByte(SensorType.Liner);
                    if (event != lastLiner) {
                        lastLiner = event;
                        control.raiseEvent(eventIdLiner, lastLiner);
                    }
                    loops.pause(50);
                }
            })
        }
    }
    
    /**
     * Get the distance value from the ultrasonic sensor in centimeter.
     */
    //% blockId=sensor_get_ultrasonic_distance block="distance"
    //% weight=84 blockGap=8
    export function distance(): number
    {
        let data: Buffer = pins.createBuffer(2);
        driver.i2cSendByte(SensorType.Ultrasonic, 0x02);
        data = driver.i2cReceiveBytes(SensorType.Ultrasonic, 2);
        return ((data[0] + data[1] * 256) / 10);
    }
    
    /**
     * Get the color value from the color sensor in R:G:B.
     */
    //% blockId=sensor_get_color_rgb block="color"
    //% weight=83 blockGap=8
    export function color(): number
    {
        let data: Buffer = pins.createBuffer(4);
        driver.i2cSendByte(SensorType.Liner, 0x04);
        data = driver.i2cReceiveBytes(SensorType.Liner, 4);
        return (data[0] + data[1] * 256 + data[2] * 65536);
    }

    /**
     * Get the ultrasonic event, see if it detected a close or far distance.
     * @param event of ultrasonic sensor
     */
    //% blockId=sensor_is_ultrasonic_event_generate block="ultrasonic %event| was triggered"
    //% weight=96 blockGap=8 group="More"
    export function wasUltrasonicTriggered(event: UltrasonicEvent): boolean
    {
        let eventValue = event;
        if(driver.addrBuffer[SensorType.Ultrasonic] == 0)onUltrasonic(event, () => {});
        if(driver.lastStatus[SensorType.Ultrasonic] == eventValue)return true;
        return false;
    }
    
    /**
     * Get the PIR event, see if it detected a move or stop motion.
     * @param event of PIR sensor
     */
    //% blockId=sensor_is_pir_event_generate block="PIR %event| was triggered"
    //% weight=95 blockGap=8 group="More"
    export function wasPIRTriggered(event: PIREvent): boolean
    {
        let eventValue = event;
        if(driver.addrBuffer[SensorType.Pir] == 0)onPIR(event, () => {});
        if(driver.lastStatus[SensorType.Pir] == eventValue)return true;
        return false;
    }
    
    /**
     * Get the gesture sensor event, see if it detected a motion (move left etc...)
     * @param event of gesture device
     */
    //% blockId=sensor_is_gesture_event_generate block="gesture|%event|was triggered"
    //% weight=94 blockGap=8 group="More"
    export function wasGestureTriggered(event: GestureEvent): boolean
    {
        let eventValue = event;
        if(driver.addrBuffer[SensorType.Gesture] == 0)onGesture(event, () => {});
        if(driver.lastStatus[SensorType.Gesture] == eventValue)return true;
        return false;
    }
    
    /**
     * Get the encoder sensor event, see if it detected a motion (increase, decrease etc...)
     * @param event of encoder device
     */
    //% blockId=sensor_is_encoder_event_generate block="encoder|%event|was triggered"
    //% weight=93 blockGap=8 group="More"
    export function wasEncoderTriggered(event: EncoderEvent): boolean
    {
        let eventValue = event;
        if(driver.addrBuffer[SensorType.Encoder] == 0)onEncoder(event, () => {});
        if(driver.lastStatus[SensorType.Encoder] == eventValue)return true;
        return false;
    }
    
    /**
     * Get the color sensor event, see if it detected a motion (red, blue etc...)
     * @param event of color device
     */
    //% blockId=sensor_is_color_event_generate block="color|%event|was triggered"
    //% weight=92 blockGap=8 group="More"
    export function wasColorTriggered(event: ColorEvent): boolean
    {
        let eventValue = event;
        if(driver.addrBuffer[SensorType.Liner] == 0)onColor(event, () => {});
        if(driver.lastStatus[SensorType.Liner] == eventValue)return true;
        return false;
    }
    
    /**
     * Get the liner sensor event, see if it detected a motion (left, right etc...)
     * @param event of liner device
     */
    //% blockId=sensor_is_liner_event_generate block="liner|%event|was triggered"
    //% weight=91 blockGap=8 group="More"
    export function wasLinerTriggered(event: LinerEvent): boolean
    {
        let eventValue = event;
        if(!initLiner)onLiner(event, () => {});
        if(lastLiner == eventValue)return true;
        return false;
    }
    
    /**
     * Get the liner sensor value, see if it detected a motion (A, B etc...)
     * @param type of liner device
     */
    //% blockId=sensor_is_liner_type_generate block="liner|%type|was triggered"
    //% weight=90 blockGap=8 group="More"
    export function wasLinerTypeTriggered(type: LinerType): boolean
    {
        let data = 0;
        driver.i2cSendByte(SensorType.Liner, 0x03);
        data = driver.i2cReceiveByte(SensorType.Liner);
        if(data & type)return true;
        return false;
    }
}