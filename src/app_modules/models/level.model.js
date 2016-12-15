export class Level {
    map;
    actors;

    constructor(map) {
        this.map = map;
        this.actors = [];
    }

    registerActor(actor, x, y) {
        actor.x = x;
        actor.y = y;
        this.actors.push(actor);
    }
}
