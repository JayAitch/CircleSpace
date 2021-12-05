import { Vector } from "detect-collisions";
import { ASSET_MANAGER } from "../../constants/constants.asset-manager.constant";
import { GameApplication } from "../../managers/managers.game-manager.class";
import { PhysicsWorld } from "../../singletons/singletons.physics-world.class";
import { IPhysicsEntity } from "../interfaces/game.physics-objects.physics-entity";
import { Body } from "./game.physics-objects.classes.body.class";

/** generic physics entity that has a sprite */
export class SpriteEntity  implements IPhysicsEntity {
    /** visual representation of sprite */
    protected _sprite: PIXI.Sprite
    /** rigid body of this entity */
    protected _rb: Body


    /**
     * Create and initialise sprite enitity
     * @param _key_ - key for the sprite to use
     * @param _x_ - initial x position
     * @param _y_ - initial y position
     */
    constructor(protected _key_:string, protected _position_:Vector){
        this.init()
    }

    /** initiallise this object straight away */
    private init(){
        this.create()
    }

    /** read access of body */
    get body(): Body {
        return this._rb
    }

    /** read access of sprite */
    get sprite(): PIXI.Sprite{
        return this._sprite
    }

    /** generate phyiscs and canvas objects */
    create(): void { 
        let {_key_:k, _position_} = this 
        this._sprite = ASSET_MANAGER.sprite(k, _position_.x, _position_.y)
        this._sprite.anchor.set(0.5)
        this._rb = new Body(_position_)
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
        // update physical
        this.body.update()
        let {position, angle} = this.body       
        this._sprite.position.set(position.x, position.y)
        this._sprite.angle = angle  
    }
    
    /** TODO - remove from physics steps */
    destroy(): void {
        throw new Error("Method not implemented.");
    }
}