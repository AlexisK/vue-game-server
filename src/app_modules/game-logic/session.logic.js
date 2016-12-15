
const TICKMS = 20;

export class SessionLogic {
    _tickInterval;
    _level;
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

    setLevel(level) {
        this._level = level;
    }

    tickMaybe() {
        if ( !this.isProcessingTick ) {
            this.tick();
        }
    }

    tick() {
        this.isProcessingTick = true;
        // logic
        this.actors.forEach(this.tickActor.bind(this));

        this.isProcessingTick = false;
    }

    tickActor(actor) {
        if ( actor.controller.isMovingForward ) {
            actor.stepForward(this._level.collisions);
        }
        if ( actor.controller.isMovingRight ) {
            actor.stepRight(this._level.collisions);
        }
        if ( actor.controller.isMovingLeft ) {
            actor.stepLeft(this._level.collisions);
        }
        if ( actor.controller.isMovingBackwards ) {
            actor.stepBackwards(this._level.collisions);
        }
        actor.faceFromPotential();
    }
}
