import {WeaponType} from '../app_modules/models/weapon-type.model';
const blockType = require('./block-type');
const projectileType = require('./projectile-type');

module.exports = {
    sig226: new WeaponType({
        title: 'Sig 226',
        lengthMultiplier: 0.7,
        shootCooldown: 20,
        projectiles: 1,
        maxAmmo: 13,
        spreadStand: 0.07,
        spreadWalk: 0.07,
        spreadRun: 0.09,
        spreadSprint: 0.12,
        projectile: projectileType['9x19'],
        blockType: blockType.actor_solider_pistol
    }),
    uzi: new WeaponType({
        title: 'UZI',
        lengthMultiplier: 0.65,
        shootCooldown: 2,
        projectiles: 1,
        maxAmmo: 33,
        spreadStand: 0.15,
        spreadWalk: 0.15,
        spreadRun: 0.15,
        spreadSprint: 0.22,
        projectile: projectileType['9x19'],
        blockType: blockType.actor_solider_pistol
    }),
    mp5: new WeaponType({
        title: 'H&K MP-5',
        lengthMultiplier: 0.75,
        shootCooldown: 4,
        projectiles: 1,
        maxAmmo: 30,
        spreadStand: 0.07,
        spreadWalk: 0.07,
        spreadRun: 0.15,
        spreadSprint: 0.2,
        projectile: projectileType['9x19'],
        blockType: blockType.actor_solider_rifle
    }),
    m4: new WeaponType({
        title: 'M4 Carbine',
        shootCooldown: 5,
        projectiles: 1,
        maxAmmo: 30,
        spreadStand: 0.05,
        spreadWalk: 0.1,
        spreadRun: 0.2,
        spreadSprint: 0.4,
        projectile: projectileType['5.56x45'],
        blockType: blockType.actor_solider_rifle
    }),
    ak47: new WeaponType({
        title: 'AK-47',
        shootCooldown: 7,
        projectiles: 1,
        maxAmmo: 30,
        spreadStand: 0.07,
        spreadWalk: 0.12,
        spreadRun: 0.25,
        spreadSprint: 0.45,
        projectile: projectileType['7.62x39'],
        blockType: blockType.actor_solider_rifle
    }),
    shotgun: new WeaponType({
        title: 'Generic Shotgun',
        shootCooldown: 30,
        projectiles: 7,
        maxAmmo: 7,
        spreadStand: 0.2,
        spreadWalk: 0.2,
        spreadRun: 0.3,
        spreadSprint: 0.5,
        projectile: projectileType['g12'],
        blockType: blockType.actor_solider_sniper
    }),
    sniper: new WeaponType({
        title: 'Generic Sniper Rifle',
        lengthMultiplier: 1.8,
        shootCooldown: 100,
        projectiles: 1,
        maxAmmo: 4,
        spreadStand: 0.01,
        spreadWalk: 0.3,
        spreadRun: 0.5,
        spreadSprint: 0.6,
        projectile: projectileType['308lapua'],
        blockType: blockType.actor_solider_sniper
    }),
    gatling: new WeaponType({
        title: 'Gatling',
        shootCooldown: 0,
        projectiles: 1,
        maxAmmo: 500,
        spreadStand: 0.15,
        spreadWalk: 0.25,
        spreadRun: 0.4,
        spreadSprint: 0.9,
        projectile: projectileType['5.56x45'],
        blockType: blockType.actor_solider_rifle
    }),
};
