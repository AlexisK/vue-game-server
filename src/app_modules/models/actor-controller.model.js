export class ActorController {
    isMovingForward;
    isMovingLeft;
    isMovingRight;
    isMovingBackwards;
    isFiring;
    isSprinting;
    facingX;
    facingY;

    get isMoving() {
        return this.isMovingForward || this.isMovingLeft || this.isMovingRight || this.isMovingBackwards;
    }
    get isRunning() {
        return this.isMovingForward;
    }
}