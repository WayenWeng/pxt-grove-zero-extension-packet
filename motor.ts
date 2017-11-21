
enum MotorTpye {
    //% block=servo
    Servo = 0x24,
    //% block=wheel
    Wheel = 0x26
};

enum SpeedTpye {
    //% block=slow
    Slow = 0,
    //% block=medium
    Medium = 1,
    //% block=fast
    Fast = 2
};

enum DirectionTpye {
    //% block=left
    Left = 0,
    //% block=right
    Right = 1,
    //% block=straight
    Straight = 2,
    //% block=back
    Back = 3
};

/**
 * Functions to operate Grove Zero module.
 */
//% weight=95 color=#A26236 icon="icons/motor.svg" block="Motor"
//% groups='["other", "More"]'
namespace motor
{
    /**
     * Move the servo by a degree.
     * @param degree set the degree you want to move.
     */
    //% blockId=motor_move_servo block="servo move|%degree"
    //% degree.min=0 degree.max=180 degree.defl=0
    //% weight=100 blockGap=8
    export function moveServo(degree: number)
    {
        let data: Buffer = pins.createBuffer(2);
        data[0] = 0x02;
        data[1] = degree;
        driver.i2cSendBytes(0x24, data);
    }
    
    /**
     * Run wheel by speed and direction.
     * @param speed the speed that want to run.
     * @param direction the direction that want to set.
     */
    //% blockId=motor_run_wheel block="wheel run|%speed|on|%direction"
    //% weight=99 blockGap=8
    export function runWheel(speed: SpeedTpye, direction: DirectionTpye)
    {

    }
    
    /**
     * Set the mini fan by a speed.
     * @param speed the speed you want to set.
     */
    //% blockId=motor_set_mini_fan block="mini fan speed|%speed"
    //% speed.min=0 speed.max=128 speed.defl=0
    //% weight=98 blockGap=8
    export function setMiniFan(speed: number)
    {
        
    }
    
    /**
     * Run wheel by duty.
     * @param left the left speed you want to run.
     * @param right the right speed you want to run.
     */
    //% blockId=motor_run_wheel_with_duty block="wheel run|left|%left|right|%right"
    //% left.min=-128 left.max=128 left.defl=0
    //% right.min=-128 right.max=128 right.defl=0
    //% weight=100 blockGap=8 group="More"
    export function runWheelWithDuty(left: number, right: number)
    {

    }
}