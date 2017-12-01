
enum MotorTpye {
    //% block=servo
    Servo = 0x24,
    //% block=wheel
    Wheel = 0x28
};

enum SpeedTpye {
    //% block=slow
    Slow = 1,
    //% block=medium
    Medium = 2,
    //% block=fast
    Fast = 3
};

enum DirectionTpye {
    //% block=straight
    Straight = 1,
    //% block=back
    Back = 2,
    //% block=left
    Left = 3,
    //% block=right
    Right = 4,
    //% block=clockwise
    Clockwise = 5,
    //% block=anticlockwise
    Anticlockwise = 6
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
        driver.i2cSendBytes(MotorTpye.Servo, data);
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
        let left = 0, right = 0;
        if(speed == SpeedTpye.Slow){left = 85; right = 85;}
        else if(speed == SpeedTpye.Medium){left = 170; right = 170;}
        else if(speed == SpeedTpye.Fast){left = 255; right = 255;}
        
        if(direction == DirectionTpye.Straight){}
        else if(direction == DirectionTpye.Back){left = (-1) * left; right = (-1) * right;}
        else if(direction == DirectionTpye.Left){left = 255 - left / 2; right = 255;}
        else if(direction == DirectionTpye.Right){right = 255 - right / 2; left = 255;}
        else if(direction == DirectionTpye.Clockwise){right = -right; }
        else if(direction == DirectionTpye.Anticlockwise){left = -left; }
        
        runWheelWithDuty(left, right);
    }
    
    /**
     * Stop wheel run.
     */
    //% blockId=motor_stop_wheel block="wheel stop"
    //% weight=98 blockGap=8
    export function stopWheel()
    {        
        runWheelWithDuty(0, 0);
    }
    
    /**
     * Set the mini fan by a speed.
     * @param speed the speed you want to set.
     */
    //% blockId=motor_set_mini_fan block="mini fan speed|%speed"
    //% speed.min=0 speed.max=128 speed.defl=0
    //% weight=97 blockGap=8
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
    //% right.min=-255 right.max=255 right.defl=0
    //% weight=100 blockGap=8 group="More"
    export function runWheelWithDuty(left: number, right: number)
    {
        let data: Buffer = pins.createBuffer(5);
        data[0] = 0x01;
        data[1] = left & 0xff;
        data[2] = (left >> 8) & 0xff;
        data[3] = right & 0xff;
        data[4] = (right >> 8) & 0xff;
        driver.i2cSendBytes(MotorTpye.Wheel, data);
    }
}