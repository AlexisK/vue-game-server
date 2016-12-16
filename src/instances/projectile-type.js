import {ProjectileType} from '../app_modules/models/projectile-type.model';

module.exports = {
    pistol: new ProjectileType({
        damage: 3,
        speed: 17,
        speedRnd: 1
    }),
    rifle: new ProjectileType({
        damage: 2,
        speed: 19,
        speedRnd: 3
    }),
    sniper: new ProjectileType({
        damage: 8,
        speed: 31,
        speedRnd: 0,
        life: 200
    })
};
