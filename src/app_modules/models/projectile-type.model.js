export class ProjectileType {
    damage;
    speed;
    texture;
    life = 50;

    constructor(data) {
        Object.assign(this, data);
    }
}
