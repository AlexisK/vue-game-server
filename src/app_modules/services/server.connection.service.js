import Vue from 'vue';
import Peer from 'peerjs';

class ConnectionRef {
    connectedAt;
    registeredAt;
    id;
    controller;
    connection;
    name;
    actor;

    constructor(conn, id) {
        this.connection = conn;
        this.id = id;
        this.connectedAt = Date.now();
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

            conn.on('open', () => {

                let ind = this.getIndex();
                Vue.set(this.connections, ind, new ConnectionRef(conn, ind));

                conn.on('data', data => this.handleClientMessage(this.connections[ind], data));
                conn.on('close', data => {
                    if ( this.controller ) {
                        this.controller.deletePlayer(ind);
                    } else {
                        delete this.connections[ind];
                    }
                });
            });

        });
    }

    handleClientMessage(connRef, req) {
        console.log(connRef, req);
        if ( this.controller && req.action ) {
            this.controller.handleClientMessage(connRef, req);
        }
    }

    send(data) {
        Object.keys(this.connections).forEach(id => {
            this.connections[id].send(data);
        });
    }
}

module.exports = new ServerConnectionService();
