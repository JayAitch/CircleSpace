import { ICollider, Polygon, Vector} from "detect-collisions";
import { GameApplication } from "../../managers/managers.game-manager.class";
import * as SAT from "sat";
import { PhysicsWorld } from "../../singletons/singletons.physics-world.class";
import { PolygonCollider } from "./game.physics-objects.classes.rectangle-collider.class";

// TODO move collider out of body into entity
/** physics body */
export class Body {
    /** collider */
    private _collider: PolygonCollider
    /** current position in world */
    private _position:Vector
    /** linear velocity */
    private _lVelocity:Vector = {x:0,y:0}
    /** angular velocity */
    private _aVelocity: number = 0
    /** linnear acceleration */
    private _lAcceleration: Vector = {x:0,y:0}
    /** angular accelerattion */
    private _aAcceleration: number = 0
    /** current angle of body */
    private _angle:number = 0
    /** angular velocity cap */
    private _aCap: number = 5

    /**
     * construct body at given location
     * @param position_ - vector of initial positon
     */
    constructor(position_:Vector){
        this._position = position_
        // hard coded body to get started with
        this._collider = new PolygonCollider(this,position_, [{x:50,y:50},{x:-50,y:50},{x:50,y:-50},{x:-50,y:-50}])
    }

    // readonly get bodies current position
    get position():Vector{return this._position}

    // readonly get bodies collider
    get collider():PolygonCollider{return this._collider}

    // readonly access to bodies current angle
    get angle():number{return this._angle}

    // apply acceleration and velocity every tick
    public update(){
        this.applyDesceleration()
        let {x, y} = this._lAcceleration
        
        if(Math.abs(x) > 0 || Math.abs(y) > 0){
            let {x:vX, y: vY}   = this._lVelocity
            let newVelocity = {x: vX + x, y:vY + y}
            
            let {x: cX, y: cY}  = this.position
            this._position = {x: newVelocity.x + cX, y: newVelocity.y + cY}
            this._lVelocity = newVelocity
        }
        if(this._aAcceleration){ 

            this._aVelocity += this._aAcceleration
            if(Math.abs(this._aVelocity) > this._aCap){
                this._aVelocity = Math.sign(this._aVelocity) * this._aCap
            }

            this._angle += this._aVelocity
        }
        this._collider.update()
    }


    // descellerate linear and angular velocities, reduce speed
    private applyDesceleration(){
        let {x,y} = this._lAcceleration
        let {x:vX, y:vY} = this._lVelocity
        this._lAcceleration = {x: 0.95 * x, y: 0.95 * y}
        this._lVelocity = {x: 0.95 * vX, y: 0.95 * vY}
        this._aAcceleration = this._aAcceleration * 0.5
        this._aVelocity = this._aVelocity * 0.5
    }

    /**
     * Apply linear acceleration to the body
     * @param accel_ - magnitude of acceleration to apply
     */
    public applyLinnearAcceleration(accel_: Vector){ 
        let {x: aX, y: aY}  = this._lAcceleration
        let {x: vX, y: vY} = accel_
        this._lAcceleration = {x:aX + vX, y: aY + vY}
    }
    /**
     * Apply angular acceleration
     * @param amount_ - amount of acceleration to apply
     */
    public applyAngularAcceleration(amount_:number){
        this._aAcceleration += amount_
    }
}



