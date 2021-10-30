import { Bodies, Body, Vector } from "matter-js";
import { clamp } from "../../functions/function.clamp.value";
import { ASSET_MANAGER } from "../constants/constants.asset-manager.constant";
import { GameApplication } from "../managers/managers.game-manager.class";
import { SpriteEntity } from "../physics-objects/classes/game.physics-objects.classes.sprite-entity.class";
import { KeyboardController } from "../singletons/singletons.controller.class";
import { PhysicsWorld } from "../singletons/singletons.physics-world.class";

/** basic controllerble player */
export class Player extends SpriteEntity{
    /** local reference to controller */
    private _controller: KeyboardController = KeyboardController.getInstance()
    /** factors to apply to velocity */
    private _lSpeed = 15
    private _aSpeed = 2


    constructor(x_:number, y_:number){
        super("spaceship", x_, y_)
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
        //this.testPlayer.body.angularSpeed = dir_ * 100
        Body.setAngularVelocity(this.body, this._aSpeed * dir_)
    }

    // create all required physics and sprite objects
    create(){
        let {_key_:k, _x_:x, _y_:y} = this 
        this._sprite = ASSET_MANAGER.sprite(k, x, y)
        let {height, width} = this._sprite
        this._sprite.anchor.set(0.5)
        this._rb = Bodies.rectangle(x, y,height, width)
        GameApplication.GameStage.addChild(this._sprite)
        PhysicsWorld.getInstance().addEntity(this)
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
        Body.setVelocity(this.body, dir)
    }

    get position(): PIXI.ObservablePoint{return this.sprite.position}
}