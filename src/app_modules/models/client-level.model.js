const Vue = require('vue');

export class ClientLevel {
    schema;
    actors;
    projectiles;
    ambient = '#000';
    width;
    height;

    constructor() {
        this.schema      = {};
        this.actors      = [];
        this.projectiles = [];
    }

    setState(data) {
        this.schema      = data.schema;
        this.width       = data.mapWidth;
        this.height      = data.mapHeight;
        this.projectiles = data.projectiles;
    }

    fetchProjectiles(projectiles) {
        let i = 0;
        for ( ; i < projectiles.length; i++) {
            if ( !this.projectiles[i] ) {
                this.projectiles.push(projectiles[i]);
            } else {
                Object.assign(this.projectiles[i], projectiles[i]);
            }
        }
        if ( i < this.projectiles.length ) {
            this.projectiles.splice(i);
        }
    }

    updateState(data) {
        this.fetchProjectiles(data.projectiles);

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

    removeActor(actor) {
        let ind = this.actors.indexOf(actor);
        if ( ind >= 0 ) {
            this.actors.splice(ind, 1);
        }
    }
}
