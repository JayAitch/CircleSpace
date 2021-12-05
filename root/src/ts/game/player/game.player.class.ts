import { Vector } from "detect-collisions";
import { SpriteEntity } from "../physics-objects/classes/game.physics-objects.classes.sprite-entity.class";
import { KeyboardController } from "../singletons/singletons.controller.class";

/** basic controllerble player */
export class Player extends SpriteEntity{
    /** local reference to controller */
    private _controller: KeyboardController = KeyboardController.getInstance()
    /** factors to apply to velocity */
    private _lSpeed = 0.1
    private _aSpeed = 0.5


    constructor(position_:Vector){
        super("spaceship", position_)
        this.createControls()
        console.log(this)
    }

    // TODO move somewhere better
    createControls(){
        this._controller.addCallback("ArrowDown", ()=>this.applyLinear(-0.5))
        this._controller.addCallback("ArrowUp", ()=>this.applyLinear(1))
        this._controller.addCallback("ArrowLeft", ()=>this.applyAngular(-1))
        this._controller.addCallback("ArrowRight", ()=>this.applyAngular(1))
    }


    /**
     * Apply angular velocity in specifid direction
     * @param dir_ - direction to apply angular velocity
     */
    applyAngular(dir_:number){
        this.body.applyAngularAcceleration(this._aSpeed * dir_)
    }

    /**
     * Apply linear velocity in specifid direction
     * @param dir_ - direction to apply linear velocity
     */
    applyLinear(dir_:number){
        // calculate forward vector and apply speed
        let dir:Vector = {
            y: this._lSpeed * dir_* -Math.cos(this.body.angle * Math.PI / 180),
            x: this._lSpeed * dir_* Math.sin(this.body.angle * Math.PI / 180)
        }
        this.body.applyLinnearAcceleration(dir)
    }
    get position(): PIXI.ObservablePoint{return this.sprite.position}
}