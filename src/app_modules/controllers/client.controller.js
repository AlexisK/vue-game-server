const client = require('../services/client.connection.service');

export class ClientController {
    serverKey = '';
    client;

    constructor() {
        this.client = client;
    }

    connect() {
        if ( this.serverKey ) {
            this.client.connect(this.serverKey);
        }
    }
}
