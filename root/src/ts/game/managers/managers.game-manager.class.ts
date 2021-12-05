import { PreloadManager } from "./managers.preload.class"
import * as PIXI from 'pixi.js'
import { PhysicsWorld } from "../singletons/singletons.physics-world.class"
import { SpriteEntity } from "../physics-objects/classes/game.physics-objects.classes.sprite-entity.class"
import { KeyboardController } from "../singletons/singletons.controller.class"
import { Player } from "../player/game.player.class"
import { getRandomInt } from "../../functions/functions.get-random-int.function"
import { FollowCamera } from "../camera/classes/game.camera.classes.follow-camera.class"


/** main game manager */
export class GameApplication extends PIXI.Application{
    private static _gameStage: PIXI.Container
    private PhsWorld: PhysicsWorld = PhysicsWorld.getInstance()
    private testPlayer: Player
    private controller: KeyboardController = KeyboardController.getInstance()
    private camera: FollowCamera

    /**
     * Create a new application of this game
     * @param options_ - PIXI app options
     */
    constructor(options_:any){
        super(options_)
        let container = new PIXI.Container()
        GameApplication._gameStage = container
        this.stage.addChild(container)
        
        // add canvas to the page
        document.body.appendChild(this.view)
        const loader = new PreloadManager()
        // trigger loading and create the game
        loader.load(()=>{
            this.createUIObjects()
            this.createGameObjects()
            this.createMap()
            this.camera = new FollowCamera(this.testPlayer, container)
            // add visual updates from physics world  
            this.ticker.add(()=>this.controller.update()) 
            this.ticker.add(()=>this.PhsWorld.update())   
            this.ticker.add(()=>this.camera.update()) 
        }) 
    }

    /** get the game stage */
    public static get GameStage():PIXI.Container {return GameApplication._gameStage}

    /** create any UI objects */
    createUIObjects(){
    }

    /** generate any game objects required */
    createGameObjects(){
        // create a dummy player to test physics
        this.testPlayer = new Player({x:100, y:100})
    }

    // dummy map creation so i can tell im moving
    createMap(){
        const maxX = 500
        const maxY = 500
        const maxScale = 0.4
        const minScale = 0.1
        const amount = 2000
        for(let i = 0; amount > i; i++){
            const x = getRandomInt(-maxX, maxX)
            const y = getRandomInt(-maxY, maxY)
            const scale = getRandomInt(minScale, maxScale)


            let commet = new SpriteEntity("rock", {x:x,y:y})
            commet.sprite.scale.set(scale)
        }
    }



}