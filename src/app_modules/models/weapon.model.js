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

    actionFire() {
        if ( this.isReadyToFire ) {
            this.isReadyToFire = false;
            this.cooldown      = this.model.shootCooldown;

            let projectile      = new Projectile(this.model.projectile);
            projectile.x        = this.actor.x + 16;
            projectile.y        = this.actor.y + 16;
            projectile.rotation = this.actor.rotation;
            projectile.onDelete = () => {
                this.actor.level.removeProjectile(projectile);
            };

            this.actor.level.spawnProjectile(projectile);

        }
    }

    tickCooldown() {
        if ( this.cooldown ) {
            this.cooldown -= 1;
        } else {
            this.isReadyToFire = true;
        }
    }
}
