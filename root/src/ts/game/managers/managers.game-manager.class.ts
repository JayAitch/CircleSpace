import { PreloadManager } from "./managers.preload.class"
import * as PIXI from 'pixi.js'
import { PhysicsWorld } from "../singletons/singletons.physics-world.class"
import { SpriteEntity } from "../physics-objects/classes/game.physics-objects.classes.sprite-entity.class"
import { KeyboardController } from "../singletons/singletons.controller.class"
import { Body } from "matter-js"
import { Player } from "../player/game.player.class"

/** main game manager */
export class GameApplication extends PIXI.Application{
    private static _gameStage: PIXI.Container
    private PhsWorld: PhysicsWorld = PhysicsWorld.getInstance()
    private testPlayer: Player
    private controller: KeyboardController = KeyboardController.getInstance()
    /**
     * Create a new application of this game
     * @param options_ - PIXI app options
     */
    constructor(options_:any){
        super(options_)
        GameApplication._gameStage = this.stage
        // add canvas to the page
        document.body.appendChild(this.view)
        const loader = new PreloadManager()
        // trigger loading and create the game
        loader.load(()=>{
            this.createUIObjects()
            this.createGameObjects()
        }) 
        // add visual updates from physics world  
        this.ticker.add(()=>this.controller.update()) 
        this.ticker.add(()=>this.PhsWorld.update())
        this.PhsWorld.run()
    }

    /** get the game stage */
    public static get GameStage():PIXI.Container {return GameApplication._gameStage}

    /** create any UI objects */
    createUIObjects(){
    }

    /** generate any game objects required */
    createGameObjects(){
        // create a dummy player to test physics
        this.testPlayer = new Player(100, 100)
    }

}