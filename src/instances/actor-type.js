import { ActorType } from '../app_modules/models/actor-type.model';

const blockType = require('./block-type');

module.exports = {
    solider: new ActorType({
        maxHealth: 4,
        walkSpeed: 1.5,
        runSpeed: 2.5,
        sprintSpeed: 3.5
    }),
    sniper: new ActorType({
        maxHealth: 3,
        walkSpeed: 1.0,
        runSpeed: 2.0,
        sprintSpeed: 3.5
    })
};
