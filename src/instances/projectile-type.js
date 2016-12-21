import {ProjectileType} from '../app_modules/models/projectile-type.model';

module.exports = {
    pistol: new ProjectileType({
        damage: 5,
        speed: 26,
        speedRnd: 1,
        length: 18
    }),
    rifle: new ProjectileType({
        damage: 4,
        speed: 30,
        speedRnd: 3,
        length: 26
    }),
    shotgun: new ProjectileType({
        damage: 1,
        speed: 25,
        speedRnd: 3,
        length: 13,
        life: 13
    }),
    sniper: new ProjectileType({
        damage: 16,
        speed: 90,
        speedRnd: 0,
        length: 80,
        life: 200
    })
};
