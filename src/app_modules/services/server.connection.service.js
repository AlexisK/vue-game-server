import Peer from 'peerjs';

class ConnectionRef {
    id;
    connection;
    name;
    player;

    constructor(conn, id) {
        this.connection = conn;
        this.id = id;
    }

    send(data) {
        this.connection.send(data);
    }
}

class ServerConnectionService {
    _nextIndex = 0;
    peer        = new Peer(null, {key : peerApiKey});
    connections = {};

    getIndex() {
        return this._nextIndex += 1;
    }

    constructor() {
        this.peer.on('connection', conn => {
            let ind = this.getIndex();
            this.connections[ind] = new ConnectionRef(conn, ind);

            conn.on('data', data => this.handleClientMessage(this.connections[ind], data));
        });
    }

    messageHandlers = {};
    handleClientMessage(connRef, req) {
        console.log(connRef, req);
        if ( req.action && this.messageHandlers[req.action] ) {
            this.messageHandlers[req.action](connRef, req.data, req);
        }
    }

}

module.exports = new ServerConnectionService();
