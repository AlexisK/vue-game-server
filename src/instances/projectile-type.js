import {ProjectileType} from '../app_modules/models/projectile-type.model';

module.exports = {
    pistol: new ProjectileType({
        damage: 3,
        speed: 23,
        speedRnd: 1,
        length: 18
    }),
    rifle: new ProjectileType({
        damage: 2,
        speed: 30,
        speedRnd: 3,
        length: 26
    }),
    sniper: new ProjectileType({
        damage: 8,
        speed: 90,
        speedRnd: 0,
        length: 80,
        life: 200
    })
};
