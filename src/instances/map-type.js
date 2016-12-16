import { MapType } from '../app_modules/models/map-type.model';
const blockType = require('./block-type');

module.exports = {
    default : new MapType({
        width            : 28,
        height           : 24,
        defaultBlockType : blockType.floor_dirt,
        ambient: '#000'
    })
};
