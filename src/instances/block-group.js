import { BlockGroup } from '../app_modules/models/block-group.model';

module.exports = {
    water : new BlockGroup({
        isWalkable     : false,
        isCollide      : false,
        isDestructible : false,
        level          : 1,
    }),
    floor : new BlockGroup({
        isWalkable     : true,
        isCollide      : false,
        isDestructible : false,
        level          : 1,
    }),
    wall  : new BlockGroup({
        isWalkable     : false,
        isCollide      : true,
        isDestructible : true,
        level          : 4,
    }),
    roof  : new BlockGroup({
        isWalkable     : true,
        isCollide      : false,
        isDestructible : false,
        level          : 5,
    }),
    actor : new BlockGroup({
        isWalkable     : false,
        isCollide      : true,
        isDestructible : true,
        level          : 3,
    }),
    door  : new BlockGroup({
        isWalkable     : false,
        isCollide      : false,
        isDestructible : true,
        level          : 4,
    }),
    asset : new BlockGroup({
        isWalkable     : false,
        isCollide      : true,
        isDestructible : true,
        level          : 4,
    }),
    decor : new BlockGroup({
        isWalkable     : true,
        isCollide      : false,
        isDestructible : false,
        level          : 2,
    }),
};
