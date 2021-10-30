import Matter = require("matter-js");
import { IPhysicsEntity } from "../physics-objects/interfaces/game.physics-objects.physics-entity";


const Engine          = Matter.Engine
const Render          = Matter.Render
const World           = Matter.World
const Body            = Matter.Body
const Mouse           = Matter.Mouse
const MouseConstraint = Matter.MouseConstraint
const Runner          = Matter.Runner

export const Bodies   = Matter.Bodies

/** physical world of the game */
export class PhysicsWorld{
    /** instance of matter engine to perform steps with */
    private _engine
    /** list of all phyical entities */
    private _entities:IPhysicsEntity[] = []
    /** reference to the only instance of this */
    private static _instance: PhysicsWorld = new PhysicsWorld()

    /** obscure constructor externally */
    private constructor(){
        this._engine = Engine.create()
    }

    /**
     * Get the instance of the physical world
     * @returns instance of the physical world
     */
    public static getInstance():PhysicsWorld{return this._instance}
    
    /** run the simulation */
    public run(){Matter.Runner.run(this._engine)} 

    // add entity to the physical world
    public addEntity(phyEnt_: IPhysicsEntity){ 
        this._entities.push(phyEnt_) 
        World.addBody(this._engine.world, phyEnt_.body)
    }

    // update all objects with there physical representation
    public update(){
        this._entities.map((obj)=>{
            obj.update()
        })
    }
    
}

