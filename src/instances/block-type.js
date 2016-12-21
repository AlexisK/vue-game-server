import { BlockType } from '../app_modules/models/block-type.model';

const blockGroup = require('./block-group');

module.exports = {

    // Marker
    marker_team_start_red: new BlockType({
        blockGroup : blockGroup.marker,
        texture    : 'team_start_red'
    }),
    marker_team_start_blue: new BlockType({
        blockGroup : blockGroup.marker,
        texture    : 'team_start_blue'
    }),

    // Floor
    floor_water : new BlockType({
        blockGroup : blockGroup.water,
        texture    : 'water'
    }),
    floor_water_2 : new BlockType({
        blockGroup : blockGroup.water,
        texture    : 'water_2'
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
    floor_wood : new BlockType({
        blockGroup : blockGroup.floor,
        texture    : 'wood'
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
    wall_glass : new BlockType({
        blockGroup : blockGroup.wall,
        maxHealth  : 3,
        texture    : 'wall_glass',
    }),

    // Roof
    roof_metal : new BlockType({
        blockGroup : blockGroup.roof,
        texture    : 'roof_metal',
    }),

    // Actor
    actor_solider_pistol : new BlockType({
        blockGroup : blockGroup.actor,
        maxHealth  : 4,
        texture    : 'actor_solider_pistol'
    }),
    actor_solider_rifle : new BlockType({
        blockGroup : blockGroup.actor,
        maxHealth  : 4,
        texture    : 'actor_solider_rifle'
    }),
    actor_solider_sniper : new BlockType({
        blockGroup : blockGroup.actor,
        maxHealth  : 4,
        texture    : 'actor_solider_sniper'
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
        maxHealth  : 5,
        texture    : 'bin_closed'
    }),
    asset_bin_opened : new BlockType({
        blockGroup : blockGroup.asset,
        maxHealth  : 5,
        texture    : 'bin_opened'
    }),
    asset_box_wood   : new BlockType({
        blockGroup : blockGroup.asset,
        maxHealth  : 14,
        texture    : 'box_wood'
    }),
    asset_box_wood_2   : new BlockType({
        blockGroup : blockGroup.asset,
        maxHealth  : 14,
        texture    : 'box_wood_2'
    }),
    asset_stone_1    : new BlockType({
        blockGroup : blockGroup.asset,
        maxHealth  : 26,
        texture    : 'asset_stone_1'
    }),

    //Decor
    decor_grave : new BlockType({
        blockGroup : blockGroup.decor,
        texture    : 'grave_1'
    }),
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
    decor_grass_5 : new BlockType({
        blockGroup : blockGroup.decor,
        texture    : 'grass_5'
    }),
    decor_grass_6 : new BlockType({
        blockGroup : blockGroup.decor,
        texture    : 'grass_6'
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
