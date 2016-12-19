import { Map } from '../app_modules/models/map.model';
const mapType = require('./map-type');

module.exports = {
    default : new Map(mapType.dirt).setSave('default').init()
};
