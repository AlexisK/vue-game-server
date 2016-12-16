import { Level } from '../models/level.model';

const speedStep = 31;

export class Projectile {
    model;
    x;
    y;
    rotation;
    lifeCooldown;
    level;

    constructor(model) {
        this.lifeCooldown = model.life;
        this.speed        = model.speed + Math.random() * model.speedRnd;
        this.model        = model;
        if ( this.speed <= 30 ) {
            this.move = this.moveSimple;
        } else {
            this.move = this.moveComplicated;
        }
    }

    moveSimple(collisions, distance) {
        if ( this.lifeCooldown ) {
            collisions = collisions || {};
            distance   = distance || this.speed;

            let rotation = this.rotation;

            let coords = Level.filterProjectilePositionCollision(
                collisions,
                this.x - distance * Math.cos(rotation),
                this.y - distance * Math.sin(rotation)
            );

            this.x = coords[0];
            this.y = coords[1];

            if ( coords[2] ) {
                this.level.hitWithProjectile(coords[2], coords[3], this);
                this.level.removeProjectile(this);
                return true;
            }

            this.lifeCooldown -= 1;
            return false;
        }

        this.level.removeProjectile(this);
        return false;
    }

    moveComplicated(collisions) {
        let speed = this.speed;
        for ( ; speed > speedStep; speed -= speedStep) {
            if ( this.moveSimple(collisions, speedStep) ) {
                return;
            }
        }
        this.moveSimple(collisions, speed);
    }
}
