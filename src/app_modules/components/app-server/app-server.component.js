import {ServerController} from '../../controllers/server.controller';

export default {
    name : 'app-server',
    data() {
        return {
            controller: new ServerController()
        };
    },
};
