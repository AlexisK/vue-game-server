export class ProjectileType {
    damage;
    speed;
    texture;
    life = 40;

    constructor(data) {
        Object.assign(this, data);
    }
}
