import { Body, Vector } from "matter-js";
import { clamp } from "../../functions/function.clamp.value";
import { SpriteEntity } from "../physics-objects/classes/game.physics-objects.classes.sprite-entity.class";
import { KeyboardController } from "../singletons/singletons.controller.class";

/** basic controllerble player */
export class Player{
    /** physical representation of the player */
    private _physical: SpriteEntity
    /** local reference to controller */
    private _controller: KeyboardController = KeyboardController.getInstance()
    /** factors to apply to velocity */
    private _lSpeed = 5
    private _aSpeed = 2


    constructor(x_:number, y_:number){
        this._physical = new SpriteEntity("spaceship",x_, y_)
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
        console.log(dir_)
        //this.testPlayer.body.angularSpeed = dir_ * 100
        Body.setAngularVelocity(this._physical.body, this._aSpeed * dir_)
    }

    /**
     * Apply linear velocity in specifid direction
     * @param dir_ - direction to apply linear velocity
     */
    applyLinear(dir_:number){
        // calculate forward vector and apply speed
        let dir:Vector = {
            y: this._lSpeed * dir_* -Math.cos(this._physical.body.angle * Math.PI / 180),
            x: this._lSpeed * dir_* Math.sin(this._physical.body.angle * Math.PI / 180)
        }
        console.log(dir, this._physical.body.angle, this._physical.body.angle * Math.PI / 180)
        Body.setVelocity(this._physical.body, dir)
    }
}