import { ActorType } from '../app_modules/models/actor-type.model';

const blockType = require('./block-type');

module.exports = {
    solider: new ActorType({
        maxHealth: 4,
        walkSpeed: 10,
        runSpeed: 15,
        sprintSpeed: 23,
        blockType: blockType.actor_solider_pistol
    })
};
