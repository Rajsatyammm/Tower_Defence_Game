const LevelMap = require('LevelMap')

cc.Class({
    extends: cc.Component,

    properties: {
        map: {
            default: null,
            type: LevelMap,
        }
    },

    onLoad() {
        this.init()
        this.setEvents()
    },

    start() {

    },

    // update (dt) {},

    init() {
        this.map.init()
    },

    setEvents() {
        this.map.node.on(cc.Node.EventType.TOUCH_START, this.handleMapTouch, this)
    },

    handleMapTouch(e) {
        const location = e.getLocation()
        const position = {
            x: location.x * 2,
            y: location.y * 2
        }
        const coordinate = this.map.getTilesCoordinateByPosition(position)
        const tileId = this.map.towersLayer.getTileGIDAt(coordinate)

        if (tileId) {
            console.log('special tile')
        }
    }
});
