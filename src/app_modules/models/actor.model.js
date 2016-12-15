export class Actor {
    health;
    model;
    x = 0;
    y = 0;
    rotation = 0;

    constructor(model) {
        this.model = model;
        this.health = model.maxHealth;
    }
}
