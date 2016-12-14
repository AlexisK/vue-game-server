import { BlockType } from '../app_modules/models/block-type.model';

const blockGroup = require('./block-group');

module.exports = {

    // Floor
    floor_water : new BlockType({
        blockGroup : blockGroup.floor,
        texture    : 'water'
    }),
    floor_dirt  : new BlockType({
        blockGroup : blockGroup.floor,
        texture    : 'dirt'
    }),
    floor_sand  : new BlockType({
        blockGroup : blockGroup.floor,
        texture    : 'sand'
    }),
    floor_grass : new BlockType({
        blockGroup : blockGroup.floor,
        texture    : 'grass'
    }),
    floor_stone : new BlockType({
        blockGroup : blockGroup.floor,
        texture    : 'stone'
    }),

    // Wall
    wall_wood  : new BlockType({
        blockGroup : blockGroup.wall,
        maxHealth  : 50,
        texture    : 'wall_wood',
    }),
    wall_stone : new BlockType({
        blockGroup : blockGroup.wall,
        maxHealth  : 300,
        texture    : 'wall_stone',
    }),
    wall_brick : new BlockType({
        blockGroup : blockGroup.wall,
        maxHealth  : 300,
        texture    : 'wall_brick',
    }),

    // Actor
    actor_solider : new BlockType({
        blockGroup : blockGroup.actor,
        maxHealth  : 4,
        texture    : 'solider'
    }),

    // Door
    door_wood : new BlockType({
        blockGroup : blockGroup.door,
        maxHealth  : 8,
        texture    : 'door_wood'
    }),

    //Asset
    asset_barrel     : new BlockType({
        blockGroup : blockGroup.asset,
        maxHealth  : 12,
        texture    : 'barrel'
    }),
    asset_bin_closed : new BlockType({
        blockGroup : blockGroup.asset,
        maxHealth  : 3,
        texture    : 'bin_closed'
    }),
    asset_bin_opened : new BlockType({
        blockGroup : blockGroup.asset,
        maxHealth  : 3,
        texture    : 'bin_opened'
    }),
    asset_box_wood   : new BlockType({
        blockGroup : blockGroup.asset,
        maxHealth  : 8,
        texture    : 'box_wood'
    }),
    asset_stone_1    : new BlockType({
        blockGroup : blockGroup.asset,
        maxHealth  : 8,
        texture    : 'asset_stone_1'
    }),

    //Decor
    decor_grass_1 : new BlockType({
        blockGroup : blockGroup.decor,
        texture    : 'grass_1'
    }),
    decor_grass_2 : new BlockType({
        blockGroup : blockGroup.decor,
        texture    : 'grass_2'
    }),
    decor_grass_3 : new BlockType({
        blockGroup : blockGroup.decor,
        texture    : 'grass_3'
    }),
    decor_grass_4 : new BlockType({
        blockGroup : blockGroup.decor,
        texture    : 'grass_4'
    }),
    decor_stone_1 : new BlockType({
        blockGroup : blockGroup.decor,
        texture    : 'stone_1'
    }),
    decor_stone_2 : new BlockType({
        blockGroup : blockGroup.decor,
        texture    : 'stone_2'
    }),
    decor_log_1   : new BlockType({
        blockGroup : blockGroup.decor,
        texture    : 'log_1'
    }),
};
