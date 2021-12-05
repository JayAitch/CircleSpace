import { System } from "detect-collisions";
import { IPhysicsEntity } from "../physics-objects/interfaces/game.physics-objects.physics-entity";



/** physical world of the game */
export class PhysicsWorld{
    /** instance of matter engine to perform steps with */
    private _system: System
    /** list of all phyical entities */
    private _entities:IPhysicsEntity[] = []
    /** reference to the only instance of this */
    private static _instance: PhysicsWorld = new PhysicsWorld()

    /** obscure constructor externally */
    private constructor(){
        this._system = new System()
    }

    /**
     * Get the instance of the physical world
     * @returns instance of the physical world
     */
    public static getInstance():PhysicsWorld{return this._instance}

    // readonly access to collision system
    public get system(): System{return this._system}
    

    // add entity to the physical world
    public addEntity(phyEnt_: IPhysicsEntity){ 
        this._entities.push(phyEnt_) 
        this._system.insert(phyEnt_.body.collider)
    }

    createPolygon(pos, points, angle){
        return this._system.createPolygon(pos, points, angle)
    }

    // update all objects with there physical representation
    public update()
    {
        this._system.update()
       
        this._entities.map((obj)=>{
            obj.update()
        })
    }

}

