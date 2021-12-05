import { ICollider, Polygon, Vector } from "detect-collisions";
import { GameApplication } from "../../managers/managers.game-manager.class";
import { PhysicsWorld } from "../../singletons/singletons.physics-world.class";
import { IPhysicsEntity } from "../interfaces/game.physics-objects.physics-entity";
import { Body } from "./game.physics-objects.classes.body.class";

//TODO abstact shared collision for seperate sapes
export class PolygonCollider extends Polygon{
    // position of collider
    private pos: Vector
    // owning physical entity
    private _owner: IPhysicsEntity
    // angle of the body
    private angle: number

    public static debugMode: boolean = true
    private debugGraphic: PIXI.Graphics

    constructor(owner:IPhysicsEntity, position: Vector, points: Vector[]){
        super(position, points)
        this._owner = owner
    }

    public get owner(): IPhysicsEntity{return this._owner}

    // debug draw where i am calulating the collider
    public debugDraw(){
        let cont = GameApplication.GameStage
        let {minX,minY,maxX,maxY} = this
        // remove old graphic
        this.debugGraphic  && this.debugGraphic.clear()
        // Create a new Graphics object and add it to the scene
        let graph = new PIXI.Graphics()

        this.debugGraphic = graph
        cont.addChild(graph)

        let{x,y} = this.pos
        // Move it to the beginning of the line
        graph.position.set(this.pos.x,this.pos.y);

        graph.angle = this.angle
        // Draw graph at reletive coordinates
        graph.lineStyle(2, 0xff0000)
        .moveTo(minX - x, minY -y)
        .lineTo(maxX -x , maxY -y)
        .lineTo(minX -x, maxY -y)
        .lineTo(maxX -x, minY -y)
        .lineTo(minX - x, minY -y)
        .lineTo(minX -x, maxY -y)
        .lineTo(maxX -x, minY -y)
        .lineTo(maxX -x, maxY -y)
    }

    // update this position and angle based on the physical entity
    update(){
        PolygonCollider.debugMode && this.debugDraw()
        let{position, angle} = this._owner      
        this.pos.x = position.x
        this.pos.y = position.y
        this.angle = angle
        const system = PhysicsWorld.getInstance().system
        const potentials: ICollider[] = system.getPotentials(this)

        potentials.some((body) => {
            if(system.checkCollision(this, body)){
                this._owner.collide(body, (<PolygonCollider>body).owner)
            }
            return true
        });
    }

} 