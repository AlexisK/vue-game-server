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

    /**
     * ----------------------------- !!! R E A D !!! -----------------------------
     * @param collisions
     * @param x
     * @param y
     * @param angle
     * @returns {*[]}
     *
     * before you start optimisations note 2 things:
     * 1. This is shitty-to-read algorithm of checking boxes collissions
     * 2. This shitty-to-read algorithm has O(1) complexity, so if you thinking to rewrite it JUST FUCK OFF!
     */
    static filterPositionCollision(collisions, x, y, angle) {
        let blockX   = gameSceneService.unitToBlock(x);
        let blockY   = gameSceneService.unitToBlock(y);
        let blockNX  = Math.floor(blockX);
        let blockNY  = Math.floor(blockY);
        let blockCX  = Math.ceil(blockX);
        let blockCY  = Math.ceil(blockY);

        if ( collisions[blockNY] && collisions[blockNY][blockNX] ) {
            //console.log('collission top-left!');
            let diffX = blockCX - blockX;
            let diffY = blockCY - blockY;

            if ( diffX < diffY ) {
                if (!collisions[blockNY][blockCX]) {
                    x = gameSceneService.blockToUnit(blockCX);
                } else if (!collisions[blockCY][blockNX]) {
                    y = gameSceneService.blockToUnit(blockCY);
                } else {
                    x = gameSceneService.blockToUnit(blockCX);
                    y = gameSceneService.blockToUnit(blockCY);
                }
            } else {
                if (!collisions[blockCY][blockNX]) {
                    y = gameSceneService.blockToUnit(blockCY);
                } else if (!collisions[blockNY][blockCX]) {
                    x = gameSceneService.blockToUnit(blockCX);
                } else {
                    y = gameSceneService.blockToUnit(blockCY);
                    x = gameSceneService.blockToUnit(blockCX);
                }
            }

        }
        if ( collisions[blockNY] && collisions[blockNY][blockCX] ) {
            //console.log('collission top-right!');
            let diffX = blockX - blockNX;
            let diffY = blockCY - blockY;

            if ( diffX < diffY ) {
                if (!collisions[blockNY][blockNX]) {
                    x = gameSceneService.blockToUnit(blockNX);
                } else if (!collisions[blockCY][blockCX]) {
                    y = gameSceneService.blockToUnit(blockCY);
                } else {
                    x = gameSceneService.blockToUnit(blockNX);
                    y = gameSceneService.blockToUnit(blockCY);
                }
            } else {
                if (!collisions[blockCY][blockCX]) {
                    y = gameSceneService.blockToUnit(blockCY);
                } else if (!collisions[blockNY][blockCX]) {
                    x = gameSceneService.blockToUnit(blockNX);
                } else {
                    y = gameSceneService.blockToUnit(blockCY);
                    x = gameSceneService.blockToUnit(blockNX);
                }
            }

        }
        if ( collisions[blockCY] && collisions[blockCY][blockNX] ) {
            //console.log('collission bottom left!');
            let diffX = blockCX - blockX;
            let diffY = blockY - blockNY;

            if ( diffX < diffY ) {
                if (!collisions[blockCY][blockCX]) {
                    x = gameSceneService.blockToUnit(blockCX);
                } else if (!collisions[blockNY][blockNX]) {
                    y = gameSceneService.blockToUnit(blockNY);
                } else {
                    x = gameSceneService.blockToUnit(blockCX);
                    y = gameSceneService.blockToUnit(blockNY);
                }
            } else {
                if (!collisions[blockNY][blockNX]) {
                    y = gameSceneService.blockToUnit(blockNY);
                } else if (!collisions[blockCY][blockCX]) {
                    x = gameSceneService.blockToUnit(blockCX);
                } else {
                    y = gameSceneService.blockToUnit(blockNY);
                    x = gameSceneService.blockToUnit(blockCX);
                }
            }

        }
        if ( collisions[blockCY] && collisions[blockCY][blockCX] ) {
            //console.log('collission bottom right!');
            let diffX = blockX - blockNX;
            let diffY = blockY - blockNY;

            if ( diffX < diffY ) {
                if (!collisions[blockCY][blockNX]) {
                    x = gameSceneService.blockToUnit(blockNX);
                } else if (!collisions[blockNY][blockCX]) {
                    y = gameSceneService.blockToUnit(blockNY);
                } else {
                    x = gameSceneService.blockToUnit(blockNX);
                    y = gameSceneService.blockToUnit(blockNY);
                }
            } else {
                if (!collisions[blockNY][blockCX]) {
                    y = gameSceneService.blockToUnit(blockNY);
                } else if (!collisions[blockCY][blockNX]) {
                    x = gameSceneService.blockToUnit(blockNX);
                } else {
                    y = gameSceneService.blockToUnit(blockNY);
                    x = gameSceneService.blockToUnit(blockNX);
                }
            }

        }

        //console.log(
        //    blockX,
        //    blockY,
        //    blockNX,
        //    blockNY
        //);
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
