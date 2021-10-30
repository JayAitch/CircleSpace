/** available controls typing*/
type control = "ArrowLeft" | "ArrowRight" | "ArrowDown" | "ArrowUp"

// list of all keys that can be used
const controls: control[] = ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"]

export class KeyboardController{
    // only local instance of the control
    private static _instance:KeyboardController = new KeyboardController()
    // all currently down keys
    private _pressedKeys: control[] = []
    // callbacks to apply to key presses
    private _callBacks: Map<control,()=>void> = new Map<control,()=>void>()
    
    // only instiated internally
    private constructor(){
        document.addEventListener('keydown',(evt_)=>this.keyDown(evt_))
        document.addEventListener('keyup',(evt_)=>this.keyUp(evt_))
    }

    /**
     * Register any key down events
     * @param evt_ - keyboard event
     */
    private keyDown(evt_: KeyboardEvent){
        let key = evt_.key as control
        if(controls.includes(key) && !this._pressedKeys.includes(key))
            this._pressedKeys.push(key)
    }

    /**
     * Register any key up events
     * @param evt_ - keyboard event
     */
    private keyUp(evt_: KeyboardEvent){
        let key = evt_.key as control
        const index = this._pressedKeys.indexOf(key)
        if(index > -1)
            this._pressedKeys.splice(index, 1)
            console.log(this._pressedKeys)
    }

    /**
     * Add callback to key presses
     * @param control_ - control being pressed
     * @param fnc_ - callback fuction
     */
    addCallback(control_:control, fnc_: ()=>void){
        this._callBacks.set(control_, fnc_)
    }

    /** fire any callbacks registered to currently pressed keys */
    update(){
        this._pressedKeys.map(key=>{
            if(this._callBacks.has(key))
                this._callBacks.get(key)()
        })
    }

    /** read value of instance */
    public static getInstance(){return KeyboardController._instance}
}
