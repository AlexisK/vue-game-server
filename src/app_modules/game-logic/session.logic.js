
const TICKMS = 20;

export class SessionLogic {
    _tickInterval;
    _level;
    isRunning = false;
    isProcessingTick = false;
    tickTimePeriod = TICKMS;
    actors = [];
    projectiles = [];

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
        this.projectiles.forEach(this.tickProjectile.bind(this));
        this.actors.forEach(this.tickActor.bind(this));

        this.isProcessingTick = false;
    }

    tickProjectile(projectile) {
        projectile.move(this._level.collisions);
    }

    tickActor(actor) {
        actor.tickCooldowns();
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
        if ( actor.controller.isFiring ) {
            actor.actionFire(this._level.collisions);
        }
    }
}
