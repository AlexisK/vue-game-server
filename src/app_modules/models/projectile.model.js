
import {Level} from '../models/level.model';

export class Projectile {
    model;
    x;
    y;
    rotation;
    lifeCooldown;
    level;

    constructor(model) {
        this.lifeCooldown = model.life;
        this.speed = model.speed + Math.random() * model.speedRnd;
        this.model = model;
    }

    move(collisions) {
        if ( this.lifeCooldown ) {
            collisions = collisions || {};

            let rotation = this.rotation;
            let distance = this.speed;

            let coords = Level.filterProjectilePositionCollision(
                collisions,
                this.x - distance * Math.cos(rotation),
                this.y - distance * Math.sin(rotation),
                (hitX, hitY) => {
                    this.level.hitWithProjectile(hitX, hitY, this);
                    this.level.removeProjectile(this);
                }
            );

            this.x = coords[0];
            this.y = coords[1];
            this.lifeCooldown -= 1;
        } else {
            this.level.removeProjectile(this);
        }
    }
}
