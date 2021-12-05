import { ICollider, Vector } from "detect-collisions";
import { getRandomInt } from "../../../functions/functions.get-random-int.function";
import { ASSET_MANAGER } from "../../constants/constants.asset-manager.constant";
import { AssetManager } from "../../managers/managers.asset.class";
import { GameApplication } from "../../managers/managers.game-manager.class";
import { PhysicsWorld } from "../../singletons/singletons.physics-world.class";
import { IPhysicsEntity } from "../interfaces/game.physics-objects.physics-entity";
import { Body } from "./game.physics-objects.classes.body.class";
import { PolygonCollider } from "./game.physics-objects.classes.rectangle-collider.class";

/** generic physics entity that has a sprite */
export class SpriteEntity  implements IPhysicsEntity {
    /** visual representation of sprite */
    protected _sprite: PIXI.Sprite
    /** rigid body of this entity */
    protected _rb: Body
    /** collider */
    private _collider: PolygonCollider


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
    get body(): Body {return this._rb}

    /** read access of sprite */
    get sprite(): PIXI.Sprite{return this._sprite}

    /** read access of angle */
    get angle(): number{return this._rb.angle}

    /** read access for position */
    get position(): Vector{return this._rb.position}

    /** read access of collider */
    get collider(): ICollider{console.log("getting colider");return this._collider}

    /** generate phyiscs and canvas objects */
    create(): void { 
        let {_key_:k, _position_} = this 
        this._sprite = ASSET_MANAGER.sprite(k, _position_.x, _position_.y)
        this._sprite.anchor.set(0.5)
        this._rb = new Body(_position_)
        GameApplication.GameStage.addChild(this._sprite)

        // hard coded body to get started with
        this._collider = new PolygonCollider(this,_position_, [{x:50,y:50},{x:-50,y:50},{x:50,y:-50},{x:-50,y:-50}])
        PhysicsWorld.getInstance().addEntity(this)
    }

    /**
     * Handle collision between two objects
     * @param body_ - body of other collision
     * @param other_ - Physical entity of body owner
     */
    collide(body_:ICollider, other_: IPhysicsEntity): void {
        //todo handle these in an inheriting class
        this.body.applyAngularAcceleration(0.2)
        this.body.applyLinnearAcceleration({x:getRandomInt(-10,10), y:getRandomInt(-10,10)})
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
        this._collider.update()
        let {position, angle} = this.body       
        this._sprite.position.set(position.x, position.y)
        this._sprite.angle = angle  
    }
    
    /** TODO - remove from physics steps */
    destroy(): void {
        throw new Error("Method not implemented.");
    }
}