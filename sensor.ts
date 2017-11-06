
enum SensorType {
    //% block=pir
	Pir = 9
}

enum PIREvent
{
    //% block=move
    Move = 1,
    //% block=stop
	Stop = 3
};

enum LinerEvent
{
    //% block=left
    Left = 1,
    //% block=middle
	Middle = 2,
    //% block=right
	Right = 3
};

/**
 * Functions to operate G2 module.
 */
//% weight=98 color=#E5B646 icon="icons/sensor.svg" block="Sensor"
//% groups='["other", "More"]'
namespace sensor
{
    /**
     * Do something when the pir sensor detects ...
     * @param event type of pir to detect
     * @param handler code to run
     */
    //% blockId=sensor_pir_create_event block="on PIR|%event"
    //% weight=100 blockGap=8
    //% help=
    export function onPIR(event: PIREvent, handler: Action) {
        
    }
    
    /**
     * Do something when the liner sensor detects ...
     * @param event type of liner to detect
     * @param handler code to run
     */
    //% blockId=sensor_liner_create_event block="on liner|%event"
    //% weight=100 blockGap=8
    //% help=
    export function onLiner(event: LinerEvent, handler: Action) {
        
    }
}