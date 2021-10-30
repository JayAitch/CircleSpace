import { Container } from "pixi.js";
import { GAME_CONFIG } from "../../../config/game-config.constant";
import { GameApplication } from "../../managers/managers.game-manager.class";
import { Player } from "../../player/game.player.class";

// camera that follows the player
export class FollowCamera{
    constructor(private _player_:Player, private _container_:Container){
    }

    update(){
        this.cameraMove()
    }

    // move the camera position to the players one
    cameraMove(){
        let {x,y} = this._player_.position
        GameApplication.GameStage.x = -x   + GAME_CONFIG.display.app.width/ 2
        GameApplication.GameStage.y = -y   + GAME_CONFIG.display.app.height /2
    }
}