import { SessionLogic } from '../game-logic/session.logic';
import gameSceneService from '../services/game-scene.service';

export class Level {
    map;
    actors;
    logic;
    //collisions;

    constructor(map) {
        this.map    = map;
        this.actors = [];
        this.logic  = new SessionLogic();
        this.logic.setLevel(this);
        //this.collisions = {};
    }

    start() {
        this.recalculateCollisions();
        this.logic.start();
        console.log(this.collisions);
    }

    stop() {
        this.logic.stop();
    }

    registerActor(actor, x, y) {
        actor.x = x;
        actor.y = y;
        this.logic.actors.push(actor);
        this.actors.push(actor);
    }

    static filterPositionCollision(collisions, x, y, angle) {
        let blockX   = gameSceneService.unitToBlock(x);
        let blockY   = gameSceneService.unitToBlock(y);
        let blockNX  = Math.floor(blockX);
        let blockNY  = Math.floor(blockY);
        let blockNY2  = blockNY+1;

        if ( collisions[blockNY] ) {
            if ( collisions[blockNY][blockNX] || collisions[blockNY][blockNX+1] ) {
                console.log('collission!');
            }
        }
        if ( collisions[blockNY2] ) {
            if ( collisions[blockNY2][blockNX] || collisions[blockNY2][blockNX+1] ) {
                console.log('collission!');
            }
        }

        console.log(
            blockX,
            blockY,
            Math.tan(angle)
        );
        return [x, y];
    }

    recalculateCollisions() {
        let newCollisions = {};
        for (let y = 0; y < this.map.model.height; y++) {
            newCollisions[y] = newCollisions[y] || {};
            for (let x = 0; x < this.map.model.width; x++) {

                let indexes = Object.keys(this.map.schema[y][x]);
                for (let i = 0; i < indexes.length; i++) {
                    let ind   = indexes[i];
                    let block = this.map.schema[y][x][ind];

                    if ( !block.model.blockGroup.isWalkable || block.model.blockGroup.isCollide ) {
                        newCollisions[y][x] = true;
                        break;
                    }
                }

            }
        }
        this.collisions = newCollisions;
    }

}
