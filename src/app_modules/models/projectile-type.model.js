export class ProjectileType {
    damage;
    speed;
    texture;
    length;
    life = 20;

    constructor(data) {
        Object.assign(this, data);
    }
}
