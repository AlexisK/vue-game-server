import { SessionLogic } from '../game-logic/session.logic';
import gameSceneService from '../services/game-scene.service';
import { Block } from "./block.model";

const Vue = require('vue');

export class Level {
    map;
    actors;
    projectiles;
    logic;
    schema;

    constructor(map) {
        this.map    = map;
        this.actors = [];
        this.projectiles = [];
        this.logic  = new SessionLogic();
        this.logic.setLevel(this);

        this._createSchema();
    }


    // Initialization
    _createSchema() {
        this.schema = [];
        this.map.schema.forEach((row, y) => {
            this.schema[y] = [];
            this.map.schema[y].forEach((levelMap, x) => {
                this.schema[y][x] = {};
                Object.keys(levelMap).forEach(level => {
                    this.schema[y][x][level] = new Block(levelMap[level].model);
                });
            });
        })
    }

    start() {
        this.recalculateCollisions();
        this.recalculateHitCollisions();
        this.logic.start();
        console.log(this.collisions);
    }

    stop() {
        this.logic.stop();
    }


    // Registering entities
    registerActor(actor, x, y) {
        actor.x = x;
        actor.y = y;
        actor.level = this;
        this.logic.actors.push(actor);
        this.actors.push(actor);
    }

    spawnProjectile(projectile) {
        projectile.level = this;
        this.logic.projectiles.push(projectile);
        this.projectiles.push(projectile);
    }

    removeProjectile(projectile) {
        this.logic.projectiles.splice(this.logic.projectiles.indexOf(projectile), 1);
        this.projectiles.splice(this.projectiles.indexOf(projectile), 1);
    }


    // Hit logic
    hitWithProjectile(x, y, projectile) {
        let levelMap = this.schema[y][x];
        Object.keys(levelMap).forEach(level => {
            let block = levelMap[level];
            if ( block.model.blockGroup.isDestructible ) {
                block.health -= projectile.model.damage;
                //console.log(block);
                if ( block.health <= 0 ) {
                    Vue.delete(this.schema[y][x], level);
                    this.recalculateCollisions();
                    this.recalculateHitCollisions();
                }
            }
        });
    }


    // Collission detection
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

    static filterProjectilePositionCollision(collisions, x, y) {
        let blockX   = gameSceneService.unitToBlock(x);
        let blockY   = gameSceneService.unitToBlock(y);
        let blockNX  = Math.floor(blockX);
        let blockNY  = Math.floor(blockY);

        if ( collisions[blockNY] && collisions[blockNY][blockNX] ) {
            return [x, y, blockNX, blockNY];
        }

        return [x, y];
    }

    _recalculateCollisions(condition, key) {
        let newCollisions = {};
        for (let y = 0; y < this.map.model.height; y++) {
            newCollisions[y] = newCollisions[y] || {};
            for (let x = 0; x < this.map.model.width; x++) {

                let indexes = Object.keys(this.schema[y][x]);
                for (let i = 0; i < indexes.length; i++) {
                    let ind   = indexes[i];
                    let block = this.schema[y][x][ind];

                    if ( condition(block.model.blockGroup) ) {
                        newCollisions[y][x] = true;
                        break;
                    }
                }

            }
        }
        this[key] = newCollisions;
    }

    recalculateCollisions() {
        this._recalculateCollisions(grp => !grp.isWalkable || grp.isCollide, 'collisions');
    }

    recalculateHitCollisions() {
        this._recalculateCollisions(grp => grp.isDestructible, 'hitCollisions' );
    }

}
