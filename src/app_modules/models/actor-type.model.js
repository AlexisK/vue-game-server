export class ActorType {
    maxHealth;
    walkSpeed;
    runSpeed;
    sprintSpeed;
    blockType;

    constructor(data) {
        Object.assign(this, data);
    }
}
