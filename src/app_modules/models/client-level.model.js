const Vue = require('vue');

export class ClientLevel {
    schema;
    actors;
    projectiles;
    ambient = '#000';

    constructor() {
        this.schema      = {};
        this.actors      = [];
        this.projectiles = [];
    }

    setState(data) {
        this.schema      = data.schema;
        this.projectiles = data.projectiles;
    }
    updateState(data) {
        this.projectiles = data.projectiles;
        Object.keys(data.blockUpdates).forEach(y => {
            Object.keys(data.blockUpdates[y]).forEach(x => {
                Object.keys(data.blockUpdates[y][x]).forEach(level => {
                    let hp = data.blockUpdates[y][x][level];

                    if ( hp ) {
                        this.schema[y][x][level].health = hp;
                    } else {
                        Vue.delete(this.schema[y][x], level);
                    }
                });
            });
        });
    }

    spawnActor(actor, x, y) {
        actor.x     = x;
        actor.y     = y;
        actor.level = this;
        this.actors.push(actor);
    }
}
