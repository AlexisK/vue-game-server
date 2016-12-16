import {WeaponType} from '../app_modules/models/weapon-type.model';
const blockType = require('./block-type');
const projectileType = require('./projectile-type');

module.exports = {
    pistol: new WeaponType({
        shootCooldown: 15,
        maxAmmo: 10,
        spreadStand: 5,
        spreadWalk: 10,
        spreadSprint: 20,
        projectile: projectileType.pistol,
        blockType: blockType.actor_solider_pistol
    })
};
