cc.Class({
    extends: cc.Component,

    properties: {
        reloadTime: 0.5,
        rotationSpeed: 500,
        fire: {
            default: null,
            type: cc.Prefab
        }
    },

    init(coordinates) {
        this.coordinates = coordinates
        this.targets = []
    },

    callTryFire() {
        this.tryFire()
    },

    tryFire() {
        const targetNode = this.getTarget()
        if (targetNode) {
            if (targetNode.active) {
                const targetPosition = {
                    x: targetNode.x,
                    y: targetNode.y
                }
                console.log("targetPosition ", targetPosition);
                this.rotateTo(targetPosition).then(() => {
                    this.createFire(targetPosition)
                })

            }
        }
    },

    createFire(targetPosition) {
        const fireNode = cc.instantiate(this.fire)
        fireNode.setPosition({ x: this.node.x, y: this.node.y })
        fireNode.angle = this.node.angle
        this.node.parent.addChild(fireNode)

        fireNode.getComponent('Fire').init(targetPosition)
    },

    getTarget() {
        return this.targets.find(target => target.active) || null
    },

    getAngle(targetPosition) {
        return Math.atan2(targetPosition.y - this.node.y, targetPosition.x - this.node.x) * 180 / Math.PI
    },

    rotateTo(targetPosition) {
        const angle = this.getAngle(targetPosition);
        console.log("angle ", angle, ", tower Angle ", this.node.angle);
        const currentAngle = (this.node.angle % 360);
        const distance = Math.abs(angle - currentAngle)
        // console.log("distance ", distance);

        return new Promise(resolve => {
            if (distance) {
                const timeToRotate = distance / this.rotationSpeed
                this.node.runAction(cc.sequence(
                    cc.rotateTo(timeToRotate, 360 - angle),
                    cc.callFunc(resolve)
                ))
            } else {
                resolve()
            }
        })
    },

    onCollisionEnter(other, self) {
        if (other.node.name == 'enemy') {
            this.isColliding = true
            this.targets.push(other.node)
            this.schedule(this.callTryFire, this.reloadTime)
        }
    },

    onCollisionExit(other, self) {
        if (other.node.name == 'enemy') {
            this.targets = this.targets.filter(node => node != other.node)
            this.isColliding = false
        }
        if (this.targets.length === 0) {
            this.unschedule(this.callTryFire)
        }
    },

    update(dt) {
    },
});
