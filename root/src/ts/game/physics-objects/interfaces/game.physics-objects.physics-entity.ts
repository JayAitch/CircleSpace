/** generic typing for any physics entity */
export interface IPhysicsEntity{
    // update position of sprite with position of phyiscal body
    update():void;
    // create world objects and start responding to updates
    create():void;
    // destroy world and graphical objects, flag for collection
    destroy():void;
    // temporarily stop responding to physics updates
    pause():void;
    // start responding to physics updates after pausing  
    resume():void;
    // entities current rigid body
    body
}