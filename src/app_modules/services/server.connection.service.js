import Peer from 'peerjs';

class ServerConnectionService {
    peer = new Peer(null, { key: peerApiKey });

    constructor() {
        console.log('peer', this.peer);
    }
}

module.exports = new ServerConnectionService();
