import Peer from 'peerjs';

class ConnectionService {
    peer = new Peer(null, { key: peerApiKey });

    constructor() {
        console.log('peer', this.peer);
    }
}

module.exports = new ConnectionService();
