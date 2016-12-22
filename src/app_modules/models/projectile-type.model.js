export class ProjectileType {
    damage;
    speed;
    texture;
    length;
    life = 120;

    constructor(data) {
        Object.assign(this, data);
    }
}
