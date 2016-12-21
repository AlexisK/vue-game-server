import {ServerController} from '../../controllers/server.controller';
const maps = require('../../../instances/map');

export default {
    name : 'app-server',
    data() {
        return {
            controller: new ServerController(),
            maps
        };
    },
    methods: {
        selectMap(map) {
            this.controller.selectedMap = map;
        },
        checkConfiguration() {
            this.controller.checkConfiguration();
        },
        resetLevel() {
            this.controller.resetLevel();
        }
    },
    beforeDestroy() {
        this.controller.destroy();
    }
};
