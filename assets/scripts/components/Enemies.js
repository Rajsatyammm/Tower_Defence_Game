const EnemiesWave = require('EnemiesWave')

cc.Class({
    extends: cc.Component,

    properties: {
        waves: {
            default: [],
            type: [EnemiesWave]
        }
    },

    // onLoad () {},

    init(level) {
        this.level = level
        this.items = []
        this.createWave()
    },

    createWave() {
        this.waves.forEach(wave => this.schedule(() => {
            this.createEnemy(wave.enemy)
        }, wave.repeatInterval, wave.enemiesCount - 1, wave.timeOut))
    },

    createEnemy(enemyPrefab) {
        const enemyNode = cc.instantiate(enemyPrefab)
        this.node.addChild(enemyNode)
        const enemyComponent = enemyNode.getComponent('Enemy')
        enemyComponent.init(this.level)
        this.items.push(enemyNode)
    }

    // update (dt) {},
});
