import {ProjectileType} from '../app_modules/models/projectile-type.model';

module.exports = {
    dummy: new ProjectileType({
        damage: 1,
        speed: 1,
        speedRnd: 1,
        length: 10
    }),
    pistol: new ProjectileType({
        damage: 5,
        speed: 45,
        speedRnd: 1,
        length: 20
    }),
    rifle: new ProjectileType({
        damage: 4,
        speed: 60,
        speedRnd: 3,
        length: 40
    }),
    shotgun: new ProjectileType({
        damage: 1,
        speed: 45,
        speedRnd: 3,
        length: 20,
        life: 40
    }),
    sniper: new ProjectileType({
        damage: 16,
        speed: 120,
        speedRnd: 0,
        length: 80
    })
};
