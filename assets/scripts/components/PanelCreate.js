cc.Class({
    extends: cc.Component,

    properties: {
        buttonOne: {
            default: null,
            type: cc.Node
        },
        buttonTwo: {
            default: null,
            type: cc.Node
        }
    },

    init(map) {
        this.map = map
        this.coordinates = { x: 0, y: 0 }

        this.buttonOne.on(cc.Node.EventType.TOUCH_END, this.onTowerSelect, this)
        this.buttonTwo.on(cc.Node.EventType.TOUCH_END, this.onTowerSelect, this)
    },

    // update (dt) {},

    show(coordinates) {
        this.coordinates = coordinates
        const position = this.map.towersLayer.getPositionAt(coordinates)
        const pos = { x: position.x + this.map.tileWidth / 2, y: position.y + this.map.tileHeight / 2 }
        this.node.setPosition(pos)
        this.node.active = true
    },

    hide() {
        this.node.active = false
    },

    onTowerSelect(e) {
        this.node.emit('tower-selected', {
            towerKey: e.target.name,
            towerCoordinate: this.coordinates
        })
    }


});
