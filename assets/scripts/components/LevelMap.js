cc.Class({
    extends: cc.Component,

    properties: {

    },

    init() {
        this.tiledMap = this.getComponent(cc.TiledMap)
        this.roadsLayer = this.tiledMap.getLayer('roads')
        this.towersLayer = this.tiledMap.getLayer('towers')

        // calculating the tile size
        this.tileSize = this.tiledMap.getTileSize()
        this.tileWidth = this.tileSize.width
        this.tileHeight = this.tileSize.height

        // calculating the map size
        this.mapSize = this.tiledMap.getMapSize()
        this.mapWidth = this.mapSize.width
        this.mapHeight = this.mapSize.height
    },

    start() {

    },

    // update (dt) {},

    getTilesCoordinateByPosition(position) {
        return {
            x: Math.floor(position.x / this.tileWidth),
            y: this.mapHeight - Math.floor(position.y / this.tileHeight) - 1,
        }
    }
});
