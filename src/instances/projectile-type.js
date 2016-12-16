import {ProjectileType} from '../app_modules/models/projectile-type.model';

module.exports = {
    pistol: new ProjectileType({
        damage: 1,
        speed: 10
    })
};
