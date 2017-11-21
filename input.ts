
enum InputType {
    //% block=mesh
    Mesh = 0x0f,
    //% block=dimmer
    SlideDimmer = 0x21
};

enum MeshEvent {
    //% block="click"
    Click = 1,
    //% block="double click"
    DoubleClick = 2,
    //% block="thrice click"
    ThriceClick = 4,
    //% block="hold"
    Hold = 3
};

/**
 * Functions to operate G2 module.
 */
//% weight=99 color=#db8ccd icon="icons/loops.svg" block="Input"
//% groups='["other"]'
namespace input
{
    /**
     * Do something when a mesh key ...
     * @param event the kind of mesh key gesture that needs to be detected
     * @param handler code to run when the event is raised
     */
    //% blockId=input_mesh_create_event block="on mesh%event"
    //% weight=99 blockGap=8
    export function onMesh(event: MeshEvent, handler: Action) {
        const eventId = driver.subscribeToEventSource(InputType.Mesh);
        control.onEvent(eventId, event, handler);
    }
    
    /**
     * Get the value from the slide dimmer sensor.
     */
    //% blockId=sensor_get_dimmer_value block="slide dimmer"
    //% weight=98 blockGap=8
    export function slideDimmer(): number
    {
        
        return 0;
    }
    
    /**
     * Run code for a mesh key event and see if ...
     * @param button the button that needs to be clicked or used
     * @param event the kind of button gesture that needs to be detected
     */
    //% blockId=input_is_mesh_key_press block="was mesh key |%event |triggered"
    //% weight=49 blockGap=8
    export function wasMeshKeyTriggered(event: MeshEvent): boolean
    {
        let eventValue = event;
        if(driver.addrBuffer[InputType.Mesh] == 0)onMesh(event, () => {});
        if(driver.lastStatus[InputType.Mesh] == eventValue)return true;
        return false;
    }
}