const client = require('../services/client.connection.service');

const STAGES = ['connect', 'register', 'play'];

export class ClientController {
    serverKey = '';
    playerName = '';
    client;
    stages    = STAGES;
    stage     = STAGES[0];
    serverId;

    constructor() {
        this.client            = client;
        this.client.controller = this;
    }

    connect() {
        if ( this.serverKey ) {
            this.client.connect(this.serverKey);
        }
    }

    register() {
        if ( this.playerName ) {
            this.client.send({
                action: 'registerPlayer',
                data: {
                    name: this.playerName
                }
            });
        }
    }

    messageHandlers = {
        'levelState' : data => {
            console.log('Current state is:', data);
            this.stage = this.stages[1];
        },
        'registerSuccess': data => {
            this.serverId = data.id;
            this.stage = this.stages[2];
        }
    };

    handleServerMessage(req) {
        if ( this.messageHandlers[req.action] ) {
            this.messageHandlers[req.action](req.data, req)
        }
    }

    disconnected() {
        this.stage = this.stages[0];
    }
}
