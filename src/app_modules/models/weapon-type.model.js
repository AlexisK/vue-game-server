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

    constructor(data) {
        Object.assign(this, data);
    }
}
