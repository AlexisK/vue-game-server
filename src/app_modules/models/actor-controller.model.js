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

    getSerializable() {
        return {
            isMovingForward   : this.isMovingForward,
            isMovingLeft      : this.isMovingLeft,
            isMovingRight     : this.isMovingRight,
            isMovingBackwards : this.isMovingBackwards,
            isFiring          : this.isFiring,
            isSprinting       : this.isSprinting,
            facingX           : this.facingX,
            facingY           : this.facingY
        }
    }

    setSerializable(data) {
        Object.assign(this, data)
    }
}