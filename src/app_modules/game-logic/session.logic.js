
const TICKMS = 20;

export class SessionLogic {
    _tickInterval;
    isRunning = false;
    isProcessingTick = false;
    tickTimePeriod = TICKMS;
    actors = [];

    constructor() {

    }

    start() {
        this.stop();
        this._tickInterval = setInterval(this.tickMaybe.bind(this), this.tickTimePeriod);
    }

    stop() {
        clearInterval(this._tickInterval);
    }

    tickMaybe() {
        if ( !this.isProcessingTick ) {
            this.tick();
        }
    }

    tick() {
        this.isProcessingTick = true;
        // logic
        this.actors.forEach(this.tickActor);

        this.isProcessingTick = false;
    }

    tickActor(actor) {
        if ( actor.controller.isMovingForward ) {
            actor.stepForward();
        }
        if ( actor.controller.isMovingRight ) {
            actor.stepRight();
        }
        if ( actor.controller.isMovingLeft ) {
            actor.stepLeft();
        }
        if ( actor.controller.isMovingBackwards ) {
            actor.stepBackwards();
        }
        actor.faceFromPotential();
    }
}
