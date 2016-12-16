export class WeaponType {
    isAutomatic = false;
    shootCooldown;
    maxAmmo;
    spreadStand;
    spreadWalk;
    spreadSprint;
    projectile;
    blockType;

    constructor(data) {
        Object.assign(this, data);
    }
}
