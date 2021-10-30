import Matter = require("matter-js");
import { ASSET_MANAGER } from "../../constants/constants.asset-manager.constant";
import { GameApplication } from "../../managers/managers.game-manager.class";
import { Bodies, PhysicsWorld } from "../../singletons/singletons.physics-world.class";
import { IPhysicsEntity } from "../interfaces/game.physics-objects.physics-entity";

/** generic physics entity that has a sprite */
export class SpriteEntity implements IPhysicsEntity{
    /** visual representation of sprite */
    private _sprite: PIXI.Sprite
    /** rigid body of this entity */
    private _rb: Matter.Body


    /**
     * Create and initialise sprite enitity
     * @param _key_ - key for the sprite to use
     * @param _x_ - initial x position
     * @param _y_ - initial y position
     */
    constructor(private _key_:string, private _x_:number, private _y_: number){
        this.init()
    }

    /** initiallise this object straight away */
    private init(){
        this.create()
    }

    /** read access of body */
    get body(): Matter.Body {
        return this._rb
    }

    /** generate phyiscs and canvas objects */
    create(): void { 
        let {_key_:k, _x_:x, _y_:y} = this 
        this._sprite = ASSET_MANAGER.sprite(k, x, y)
        let {height, width} = this._sprite
        this._sprite.anchor.set(0.5)
        this._rb = Bodies.rectangle(x, y,height, width)
        GameApplication.GameStage.addChild(this._sprite)
        PhysicsWorld.getInstance().addEntity(this)
    }

    /** TODO - remove from physics steps */
    pause(): void {
        throw new Error("Method not implemented.");
    }
    /** TODO - add to physics steps */
    resume(): void {
        throw new Error("Method not implemented.");
    }

    update(): void {
        let {position, angle} = this.body       
        this._sprite.position.set(position.x, position.y)
        this._sprite.angle = angle  
    }
    
    /** TODO - remove from physics steps */
    destroy(): void {
        throw new Error("Method not implemented.");
    }
    
}