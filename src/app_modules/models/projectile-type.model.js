export class ProjectileType {
    damage;
    speed;
    texture;
    length;
    life = 40;

    constructor(data) {
        Object.assign(this, data);
    }
}
