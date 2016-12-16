import {MapObject} from './map-object';

export class Block extends MapObject {
    model = {};
    isDestroyed = false;
    health = 0;

    constructor(blockType) {
        super();
        this.model = blockType;
        this.health = this.model.maxHealth;
    }
}
