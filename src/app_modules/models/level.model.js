import {SessionLogic} from '../game-logic/session.logic';

export class Level {
    map;
    actors;
    logic;

    constructor(map) {
        this.map = map;
        this.actors = [];
        this.logic = new SessionLogic();
    }
    start() {
        this.logic.start();
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

}
