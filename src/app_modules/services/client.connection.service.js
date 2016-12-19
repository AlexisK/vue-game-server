import Peer from 'peerjs';

class ClientConnectionService {
    peer = new Peer(null, { key: peerApiKey });

    constructor() {
        console.log('peer', this.peer);
    }
}

module.exports = new ClientConnectionService();
