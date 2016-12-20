import Vue from 'vue';
import { Level } from '../models/level.model';
import { Actor } from '../models/actor.model';
import { Weapon } from '../models/weapon.model';
import { GameController } from './game.controller';
const server      = require('../services/server.connection.service');
const maps        = require('../../instances/map');
const actorTypes  = require('../../instances/actor-type');
const weaponTypes = require('../../instances/weapon-type');

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
            this.levelRef.logic.doOnTick = [];
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
        this.levelRef.logic.doOnTick.push(this.handleTick.bind(this));
        this.levelRef.start();

        this.stage = this.stages[1];
    }

    spawnActor(connRef) {
        let weaponKey = 'shotgun';
        let actorKey  = 'solider';
        let x         = 300;
        let y         = 300;

        let weapon = new Weapon(weaponTypes[weaponKey]);
        Vue.set(connRef, 'actor', new Actor(actorTypes[actorKey], weapon));

        this.levelRef.spawnActor(connRef.actor, x, y);

        this.server.send({
            action : 'spawnActor',
            data   : {
                id : connRef.id,
                x, y,
                weaponKey, actorKey
            }
        });
    }

    _formatGameState(state) {
        let actors = {};
        Object.keys(this.server.connections).forEach(id => {
            let connRef = this.server.connections[id];
            if ( connRef.actor ) {
                actors[id] = connRef.actor.getSerializable();
            }
        });

        return {...state, actors};
    }

    formatGameState() {
        return this._formatGameState(this.levelRef.getState());
    }
    formatGameUpdate() {
        return this._formatGameState(this.levelRef.getUpdate());
    }

    handleTick() {
        this.server.send({
            action : 'tickUpdate',
            data   : this.formatGameUpdate()
        });
    }


    messageHandlers = {
        'getLevelState'         : connRef => {
            connRef.send({
                action : 'levelState',
                data   : this.formatGameState()
            });
        },
        'registerPlayer'        : (connRef, data, req) => {
            Vue.set(connRef, 'name', data.name);
            Vue.set(connRef, 'registeredAt', Date.now());

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

            this.spawnActor(connRef);
        },
        'updateActorController' : (connRef, data) => {
            connRef.updateControls(data);
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
