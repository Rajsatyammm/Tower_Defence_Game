const LevelMap = require('LevelMap')
const PanelCreate = require('PanelCreate')
const Towers = require('Towers')
const Enemies = require('Enemies')

cc.Class({
    extends: cc.Component,

    properties: {
        map: {
            default: null,
            type: LevelMap,
        },
        panelCreate: {
            default: null,
            type: PanelCreate
        },
        towers: {
            default: null,
            type: Towers
        },
        enemies: {
            default: null,
            type: Enemies
        },
    },

    onLoad() {
        this.init()
        this.setEvents()
    },

    start() {

    },

    update(dt) {
    },


    init() {
        cc.director.getCollisionManager().enabled = true
        this.map.init()
        this.towers.init(this.map)
        this.panelCreate.init(this.map)
        this.enemies.init(this)
    },

    setEvents() {
        this.map.node.on(cc.Node.EventType.TOUCH_END, this.handleMapTouch, this)
        this.panelCreate.node.on("tower-selected", this.onTowerCreate, this)
    },

    onTowerCreate(e) {
        this.towers.createTower(e.towerKey, e.towerCoordinate)
        this.panelCreate.hide()

    },

    handleMapTouch(e) {
        this.panelCreate.hide()
        const location = e.getLocation()
        const position = {
            x: location.x * 2,
            y: location.y * 2
        }
        const coordinates = this.map.getTilesCoordinateByPosition(position)
        const tileId = this.map.towersLayer.getTileGIDAt(coordinates)
        if (tileId) {
            const isTowerAlreadyExist = this.towers.getByCoordinates(coordinates);
            if (!isTowerAlreadyExist) {
                this.panelCreate.show(coordinates)
            } else {
                console.log('already exists')
            }
        }
    }
});
