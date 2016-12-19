import Vue from 'vue';
import { Level } from '../models/level.model';
import { Actor } from '../models/actor.model';
import { Weapon } from '../models/weapon.model';
import { GameController } from './game.controller';
const server = require('../services/server.connection.service');
const maps   = require('../../instances/map');
const actorTypes   = require('../../instances/actor-type');
const weaponTypes   = require('../../instances/weapon-type');

const STAGES = ['configure', 'serve'];

export class ServerController {
    publicKey;
    server;
    stages      = STAGES;
    stage       = STAGES[0];
    selectedMap = '';
    mapRef;
    levelRef;

    constructor() {
        this.server            = server;
        this.server.controller = this;
        this.publicKey         = server.peer.id;
        this.game              = new GameController();
    }

    destroy() {
        if ( this.levelRef ) {
            this.levelRef.logic.stop();
        }
    }

    checkConfiguration() {
        console.log(this.selectedMap, maps);
        if ( this.selectedMap && maps[this.selectedMap] ) {
            this.initLevel();
        }
    }

    initLevel() {
        this.mapRef = maps[this.selectedMap];
        this.mapRef.setSave(this.selectedMap);
        this.mapRef.init();

        this.levelRef = new Level(this.mapRef);
        this.levelRef.start();

        this.stage = this.stages[1];
    }


    messageHandlers = {
        'getLevelState'       : connRef => {
            let state = this.levelRef.getState();

            let actors = {};
            Object.keys(this.server.connections).forEach(id => {
                let connRef = this.server.connections[id];
                if ( connRef.actor ) {
                    actor[id] = connRef.actor.getSerializable();
                }
            });

            state = {...state, actors};

            connRef.send({
                action : 'levelState',
                data   : state
            });
        },
        'registerPlayer' : (connRef, data, req) => {
            Vue.set(connRef, 'name', data.name);
            Vue.set(connRef, 'registeredAt', Date.now());

            let weapon = new Weapon(weaponTypes.shotgun);
            Vue.set(connRef, 'actor', new Actor(actorTypes.solider, weapon));

            connRef.send({
                action : 'registerSuccess',
                data   : {
                    id : connRef.id
                }
            });

            this.server.send({
                action : 'playerConnected',
                data   : {
                    id   : connRef.id,
                    name : connRef.name
                }
            });

            this.levelRef.registerActor(connRef.actor, 300, 300);
        }
    };

    handleClientMessage(connRef, req) {
        if ( this.messageHandlers[req.action] ) {
            this.messageHandlers[req.action](connRef, req.data, req)
        }
    }

    deletePlayer(id) {
        this.server.send({
            action : 'playerDisconnected',
            data   : {
                id
            }
        });

        Vue.delete(this.server.connections, id);
    }
}
