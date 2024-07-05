const LevelMap = require('LevelMap')

cc.Class({
    extends: cc.Component,

    properties: {
        velocity: 150,
        rotationSpeed: 250,
        health: 2,

    },

    init(level) {
        this.levelMap = level.map
    },

    onLoad() {
    },

    start() {
        this.targets = this.levelMap.tiledMap.getObjectGroup('path').getObjects()
        this.targetIndex = 1
        this.node.setPosition(this.getCurrentTargetPosition())
        this.targetIndex++;
        this.move()
    },

    update(dt) {

    },

    takeDamage(damage) {
        this.health -= damage
        if (this.health <= 0) {
            this.node.stopAllActions()
            this.node.emit('killed')
            this.node.destroy()
        }
        console.log('updated health :: ', this.health)
    },

    move() {
        const targetPosition = this.getCurrentTargetPosition()
        if (!targetPosition) {
            this.node.emit('finished')
            this.node.destroy()
        } else {
            this.rotateTo(targetPosition)
            this.moveTo(targetPosition).then(() => {
                this.targetIndex++;
                this.move()
            })
        }
    },

    getAngle(targetPosition) {
        return Math.atan2(targetPosition.y - this.node.y, targetPosition.x - this.node.x) * 180 / Math.PI
    },

    rotateTo(targetPosition) {
        // calculate the angle for rotaion of enemy
        const angle = this.getAngle(targetPosition)
        //             time = distance / speed
        const distance = Math.abs(angle - this.node.angel)

        const timeToRotate = distance / this.rotationSpeed
        // rotate the enemy to the specific angle
        this.node.runAction(cc.rotateTo(timeToRotate, angle))

    },

    moveTo(targetPosition) {
        const xDistance = Math.abs(this.node.x - targetPosition.x)
        const yDistance = Math.abs(this.node.y - targetPosition.y)
        const distance = Math.max(xDistance, yDistance)
        const time = distance / this.velocity

        return new Promise((res, rej) => {
            let moveToAction = cc.moveTo(time, targetPosition)
            const sequence = cc.sequence(
                moveToAction,
                cc.callFunc(res)
            )
            this.node.runAction(sequence)
        })
    },

    getCurrentTarget() {
        return this.targets.find(target => parseInt(target.name) === this.targetIndex)
    },

    getCurrentTargetPosition() {
        const currentTarget = this.getCurrentTarget()
        if (!currentTarget) {
            return false
        }
        const tileCoordinates = this.levelMap.getTilesCoordinateByPosition(cc.v2(currentTarget.x, currentTarget.y))
        const position = this.levelMap.roadsLayer.getPositionAt(tileCoordinates.x, tileCoordinates.y)
        return cc.v2(position.x + this.levelMap.tileWidth / 2, position.y + this.levelMap.tileHeight / 2)
    }
});
