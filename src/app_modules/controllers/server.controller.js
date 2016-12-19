import Vue from 'vue';
const server = require('../services/server.connection.service');

export class ServerController {
    publicKey;
    server;

    constructor() {
        this.server = server;
        this.server.controller = this;
        this.publicKey = server.peer.id;
    }

    messageHandlers = {
        'getState': connRef => {
            connRef.send({
                action: 'state',
                data: true
            });
        },
        'registerPlayer': (connRef, data, req) => {
            Vue.set(connRef, 'name', data.name);
            Vue.set(connRef, 'registeredAt', Date.now());

            connRef.send({
                action: 'registerSuccess',
                data: {
                    id: connRef.id
                }
            });

            this.server.send({
                action: 'playerConnected',
                data: {
                    id: connRef.id
                }
            });
        }
    };
    handleClientMessage(connRef, req) {
        if ( this.messageHandlers[req.action] ) {
            this.messageHandlers[req.action](connRef, req.data, req)
        }
    }

    deletePlayer(id) {
        this.server.send({
            action: 'playerDisconnected',
            data: {
                id
            }
        });

        Vue.delete(this.server.connections, id);
    }
}
