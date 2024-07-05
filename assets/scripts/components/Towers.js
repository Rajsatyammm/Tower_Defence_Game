const levelMap = require('LevelMap')

cc.Class({
    extends: cc.Component,

    properties: {
        towersPrefab: {
            default: [],
            type: [cc.Prefab]
        },
        level: {
            default: null,
            type: levelMap
        }
    },

    init(map) {
        this.map = map
        this.towersList = []
    },

    createTower(key, coordinates) {
        // select the type of tower the user want to create
        const selectedTower = this.towersPrefab.find(prefab => prefab.name === key)
        // instantiate the tower node with the selected tower
        const towerNode = cc.instantiate(selectedTower)
        // add the towerNode to the Towers layer
        this.node.addChild(towerNode)
        // getting the tower component
        const towerComponent = towerNode.getComponent('Tower')
        towerComponent.init(coordinates)
        // add the newly created tower node to the towers  List
        this.towersList.push(towerComponent)
        const position = this.map.towersLayer.getPositionAt(coordinates)
        towerNode.setPosition({ x: position.x + this.map.tileWidth / 2, y: position.y + this.map.tileHeight / 2 })
        // console.log("towerComponent ==> ", towerComponent)
        // console.log('towersList ==> ', this.towersList)
    },

    getByCoordinates(position) {
        return this.towersList
            .find(towerComponent => {
                const coordinates = this.level.getTilesCoordinateByPosition({ x: towerComponent.node.x, y: towerComponent.node.y })
                return coordinates.x === position.x && coordinates.y === position.y
            })
    },

    destroyTower(key, coordinates) {
        const towerToDestroy = this.towersList.find(tower => tower.coordinates === coordinates && tower.towerKey === key)
        this.towersList.destroy(tower => tower == towerToDestroy)
    },

    update(dt) {

    },
});
