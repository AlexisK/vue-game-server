import { Projectile } from './projectile.model';

export class Weapon {
    ammo;
    model;
    isReadyToFire = true;
    cooldown      = 0;
    actor;

    constructor(model) {
        this.model = model;
        this.ammo  = model.maxAmmo;
    }

    getProjectileRotation() {
        let spread = this.actor.controller.isRunning && (this.actor.controller.isSprinting && this.model.spreadSprint || this.model.spreadRun) ||
            this.actor.controller.isMoving && this.model.spreadWalk || this.model.spreadStand;

        return this.actor.rotation - (spread / 2) + (Math.random() * spread);
    }

    actionFire() {
        if ( this.isReadyToFire ) {
            this.isReadyToFire = false;
            this.cooldown      = this.model.shootCooldown;

            for (let i = 0; i < this.model.projectiles; i++) {
                this.spawnProjectile();
            }

        }
    }

    spawnProjectile() {
        let projectile      = new Projectile(this.model.projectile);
        projectile.x        = this.actor.x + 16;
        projectile.y        = this.actor.y + 16;
        projectile.rotation = this.getProjectileRotation();

        this.actor.level.spawnProjectile(projectile);
    }

    tickCooldown() {
        if ( this.cooldown ) {
            this.cooldown -= 1;
        } else {
            this.isReadyToFire = true;
        }
    }
}
