const server = require('../services/server.connection.service');

export class ServerController {
    publicKey;
    server;

    constructor() {
        this.server = server;
        this.publicKey = server.peer.id;
    }
}
