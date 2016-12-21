import { ServerController } from '../../controllers/server.controller';
import Modal from '../modal';
const maps = require('../../../instances/map');

export default {
    name       : 'app-server',
    components : {
        modal : Modal
    },
    data() {
        return {
            controller   : new ServerController(),
            redTeamName  : 'Red team',
            blueTeamName : 'Blue team',
            maxPlayers   : 8,
            maps
        };
    },
    methods    : {
        selectMap(map) {
            this.controller.selectedMap = map;
        },
        checkConfiguration() {
            this.controller.checkConfiguration({
                redTeamName  : this.redTeamName,
                blueTeamName : this.blueTeamName,
                maxPlayers   : this.maxPlayers
            });
        },
        resetLevel() {
            this.controller.resetLevel();
        }
    },
    beforeDestroy() {
        this.controller.destroy();
    }
};
