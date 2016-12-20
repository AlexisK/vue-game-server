import Vue from 'vue';
import { ClientLevel } from '../models/client-level.model';
import { Actor } from '../models/actor.model';
import { Weapon } from '../models/weapon.model';
const client      = require('../services/client.connection.service');
const actorTypes  = require('../../instances/actor-type');
const weaponTypes = require('../../instances/weapon-type');

const STAGES = ['connect', 'register', 'play'];

export class ClientController {
    serverKey  = '';
    playerName = '';
    client;
    stages     = STAGES;
    stage      = STAGES[0];
    serverId;
    levelRef   = new ClientLevel();
    players    = {};
    controllableActor;
    savedUserControlls;

    constructor() {
        this.client            = client;
        this.client.controller = this;
    }

    connect() {
        if ( this.serverKey ) {
            this.client.connect(this.serverKey);
        }
    }

    register() {
        if ( this.playerName ) {
            this.client.send({
                action : 'registerPlayer',
                data   : {
                    name : this.playerName
                }
            });
        }
    }

    spawnActor(data) {
        let weapon = new Weapon(weaponTypes[data.weaponKey]);
        Vue.set(this.players[data.id], 'actor', new Actor(actorTypes[data.actorKey], weapon));

        this.levelRef.spawnActor(this.players[data.id].actor, data.x, data.y);

        if ( this.serverId === data.id ) {
            this.controllableActor = this.players[data.id].actor;
        }
    }

    updateUserControlls() {
        let checkString = JSON.stringify(this.controllableActor.controller);
        if ( checkString !== this.savedUserControlls ) {
            this.client.send({
                action : 'updateActorController',
                data   : this.controllableActor.controller.getSerializable()
            });
            this.savedUserControlls = checkString;
        }
    }

    handleTick(data) {
        this.levelRef.updateState(data);

        Object.keys(data.actors).forEach(uid => {
            let playerData = data.actors[uid];
            let player = this.players[uid];

            if ( player && player.actor ) {
                player.actor.x        = playerData.x;
                player.actor.y        = playerData.y;
                player.actor.rotation = playerData.rotation;
                player.actor.health   = playerData.health;
            } else {
                console.log(playerData, this.players);
            }
        });
    }

    messageHandlers = {
        'levelState'         : data => {
            console.log('Current state is:', data);
            this.levelRef.setState(data);
            this.stage = this.stages[1];
        },
        'registerSuccess'    : data => {
            this.serverId = data.id;
            this.stage    = this.stages[2];
        },
        'playerConnected'    : data => {
            this.players[data.id]      = this.players[data.id] || {
                    id : data.id,
                };
            this.players[data.id].name = data.name;
        },
        'playerDisconnected' : data => {
            // remove actor from scene
            delete this.players[data.id];
        },
        'spawnActor'         : data => {
            this.players[data.id] = this.players[data.id] || {id : data.id};
            this.spawnActor(data);
        },
        'tickUpdate'         : data => {
            this.handleTick(data);
        }
    };

    handleServerMessage(req) {
        if ( this.messageHandlers[req.action] ) {
            this.messageHandlers[req.action](req.data, req)
        }
    }

    disconnected() {
        this.stage = this.stages[0];
    }
}
