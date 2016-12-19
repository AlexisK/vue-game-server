export class WeaponType {
    isAutomatic = false;
    shootCooldown;
    maxAmmo;
    spreadStand;
    spreadWalk;
    spreadRun;
    spreadSprint;
    projectile;
    blockType;
    projectiles;

    constructor(data) {
        Object.assign(this, data);
    }
}
