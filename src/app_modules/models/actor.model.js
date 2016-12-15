import { ActorController } from './actor-controller.model';

export class Actor {
    health;
    model;
    controller;
    x        = 0;
    y        = 0;
    rotation = 0;

    constructor(model) {
        this.model      = model;
        this.health     = model.maxHealth;
        this.controller = new ActorController();
    }

    facePotentialPosition(x, y) {
        this.controller.facingX = x;
        this.controller.facingY = y;
    }

    facePosition(x, y) {
        this.rotation = Math.atan2(this.y - y, this.x - x);
    }

    faceFromPotential() {
        this.rotation = Math.atan2(this.y - this.controller.facingY, this.x - this.controller.facingX);
    }

    stepForward() {
        let rotation = this.rotation;
        let distance = this.controller.isSprinting && this.model.sprintSpeed || this.model.runSpeed;
        this.x -= distance * Math.cos(rotation);
        this.y -= distance * Math.sin(rotation);
    }

    stepRight() {
        this._stepAny(Math.PI / 2);
    }

    stepLeft() {
        this._stepAny(-Math.PI / 2);
    }

    stepBackwards() {
        this._stepAny(Math.PI);
    }

    _stepAny(angle) {
        let rotation = this.rotation + angle;
        let distance = this.model.walkSpeed;
        this.x -= distance * Math.cos(rotation);
        this.y -= distance * Math.sin(rotation);
    }
}
