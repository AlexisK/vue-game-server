import { ActorType } from '../app_modules/models/actor-type.model';

const blockType = require('./block-type');

module.exports = {
    solider: new ActorType({
        maxHealth: 4,
        walkSpeed: 2,
        runSpeed: 3,
        sprintSpeed: 5,
        blockType: blockType.actor_solider_pistol
    })
};
