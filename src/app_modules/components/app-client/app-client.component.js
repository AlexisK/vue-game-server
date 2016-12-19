import {ClientController} from '../../controllers/client.controller';

export default {
    name : 'app-client',
    data() {
        return {
            controller: new ClientController()
        };
    },
    methods: {

    }
};
