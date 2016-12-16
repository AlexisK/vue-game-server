
import {Level} from '../models/level.model';

export class Projectile {
    model;
    x;
    y;
    rotation;
    lifeCooldown;
    onDelete;

    constructor(model) {
        this.lifeCooldown = model.life;
        this.model = model;
    }

    move(collisions) {
        if ( this.lifeCooldown ) {
            collisions = collisions || {};

            let rotation = this.rotation;
            let distance = this.model.speed;

            let coords = Level.filterProjectilePositionCollision(
                collisions,
                this.x - distance * Math.cos(rotation),
                this.y - distance * Math.sin(rotation),
                (hitX, hitY) => {
                    this.onDelete();
                }
            );

            this.x = coords[0];
            this.y = coords[1];
            this.lifeCooldown -= 1;
        } else {
            this.onDelete();
        }
    }
}
