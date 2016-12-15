import { ActorController } from './actor-controller.model';

import {Level} from '../models/level.model';

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

    stepForward(c) {
        this._stepAny(c, 0, this.controller.isSprinting && this.model.sprintSpeed || this.model.runSpeed);
    }

    stepRight(c) {
        this._stepAny(c, Math.PI / 2);
    }

    stepLeft(c) {
        this._stepAny(c, -Math.PI / 2);
    }

    stepBackwards(c) {
        this._stepAny(c, Math.PI);
    }

    _stepAny(collisions, angle, speed) {
        speed = speed || this.model.walkSpeed;
        collisions = collisions || {};

        let rotation = this.rotation + angle;
        let distance = speed;

        let coords = Level.filterPositionCollision(
            collisions,
            this.x - distance * Math.cos(rotation),
            this.y - distance * Math.sin(rotation),
            rotation
        );

        this.x = coords[0];
        this.y = coords[1];
    }
}
