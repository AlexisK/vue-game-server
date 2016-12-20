import { ClientController } from '../../controllers/client.controller';

import ClientGameField from './client-gamefield';

const doOnActor = function (ref) {
    return new Promise(resolve => {
        let actor = ref.controller.controllableActor;
        if ( actor ) {
            setTimeout(() => ref.controller.updateUserControlls(), 1);
            resolve(actor);
        }
    });
};

export default {
    name       : 'app-client',
    components : {
        clientgamefield : ClientGameField
    },
    data() {
        return {
            controller : new ClientController()
        };
    },
    methods    : {
        handlePointer(x, y) {
            doOnActor(this).then(actor => actor.facePotentialPosition(x, y));
        },
        handleWDown() {
            doOnActor(this).then(actor => actor.controller.isMovingForward = true);
        },
        handleWUp() {
            doOnActor(this).then(actor => actor.controller.isMovingForward = false);
        },
        handleDDown() {
            doOnActor(this).then(actor => actor.controller.isMovingRight = true);
        },
        handleDUp() {
            doOnActor(this).then(actor => actor.controller.isMovingRight = false);
        },
        handleADown() {
            doOnActor(this).then(actor => actor.controller.isMovingLeft = true);
        },
        handleAUp() {
            doOnActor(this).then(actor => actor.controller.isMovingLeft = false);
        },
        handleSDown() {
            doOnActor(this).then(actor => actor.controller.isMovingBackwards = true);
        },
        handleSUp() {
            doOnActor(this).then(actor => actor.controller.isMovingBackwards = false);
        },
        handleShiftDown() {
            doOnActor(this).then(actor => actor.controller.isSprinting = true);
        },
        handleShiftUp() {
            doOnActor(this).then(actor => actor.controller.isSprinting = false);
        },

        handleActionFireStart() {
            doOnActor(this).then(actor => actor.controller.isFiring = true);
        },
        handleActionFireStop() {
            doOnActor(this).then(actor => actor.controller.isFiring = false);
        }
    },
};
