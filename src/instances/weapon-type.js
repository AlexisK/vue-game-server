import {WeaponType} from '../app_modules/models/weapon-type.model';
const blockType = require('./block-type');
const projectileType = require('./projectile-type');

module.exports = {
    pistol: new WeaponType({
        shootCooldown: 25,
        projectiles: 1,
        maxAmmo: 10,
        spreadStand: 0.07,
        spreadWalk: 0.07,
        spreadRun: 0.09,
        spreadSprint: 0.12,
        projectile: projectileType.pistol,
        blockType: blockType.actor_solider_pistol
    }),
    rifle: new WeaponType({
        shootCooldown: 5,
        projectiles: 1,
        maxAmmo: 30,
        spreadStand: 0.05,
        spreadWalk: 0.1,
        spreadRun: 0.2,
        spreadSprint: 0.4,
        projectile: projectileType.rifle,
        blockType: blockType.actor_solider_rifle
    }),
    shotgun: new WeaponType({
        shootCooldown: 30,
        projectiles: 7,
        maxAmmo: 7,
        spreadStand: 0.2,
        spreadWalk: 0.2,
        spreadRun: 0.3,
        spreadSprint: 0.5,
        projectile: projectileType.shotgun,
        blockType: blockType.actor_solider_sniper
    }),
    sniper: new WeaponType({
        shootCooldown: 100,
        projectiles: 1,
        maxAmmo: 4,
        spreadStand: 0.01,
        spreadWalk: 0.3,
        spreadRun: 0.5,
        spreadSprint: 0.6,
        projectile: projectileType.sniper,
        blockType: blockType.actor_solider_sniper
    })
};
