import Peer from 'peerjs';

class ClientConnectionService {
    peer = new Peer(null, { key: peerApiKey });

    constructor() {
    }

    connect(key) {
        this.connection = this.peer.connect(key);
        this.connection.on('open', () => {
            this.connection.on('data', data => {
                this.handleServerMessage(data);
            });
            this.connection.send({
                action: 'getState'
            });
        })
    }

    handleServerMessage(req) {
        console.log(req);
    }
}

module.exports = new ClientConnectionService();
