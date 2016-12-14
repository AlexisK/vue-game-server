import { MapType } from '../app_modules/models/map-type.model';
const blockType = require('./block-type');

module.exports = {
    default : new MapType({
        width            : 20,
        height           : 20,
        defaultBlockType : blockType.floor_dirt,
    })
};
