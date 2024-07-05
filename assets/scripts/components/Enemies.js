const EnemiesWave = require('EnemiesWave')

cc.Class({
    extends: cc.Component,

    properties: {
        waves: {
            default: [],
            type: [EnemiesWave]
        }
    },

    init(level) {
        this.level = level
        this.waveIndex = 0
        this.items = []
        this.createWave()
    },

    createWave() {
        const wave = this.waves[this.waveIndex++]
        if (!wave) return;

        this.schedule(() => {
            this.createEnemy(wave.enemy)
        }, wave.repeatInterval, wave.enemiesCount - 1, wave.timeOut)
    },

    createEnemy(enemyPrefab) {
        const enemyNode = cc.instantiate(enemyPrefab)
        this.node.addChild(enemyNode)
        const enemyComponent = enemyNode.getComponent('Enemy')
        enemyComponent.init(this.level)
        this.items.push(enemyNode)

        enemyNode.on('killed', () => {
            this.onEnemyRemoved('enemy-killed', enemyComponent)
        }, this)

        enemyNode.once('finished', () => {
            ``
            this.onEnemyRemoved('enemy-finished', enemyComponent)
        }, this)
    },

    onEnemyRemoved(eventName, enemyComponent) {
        this.node.emit(eventName, enemyComponent)
        this.items = this.items.filter(item => item !== enemyComponent)
        console.log('onEnemyRemoved items', this.items)
        if (!this.items.length) {
            this.createWave()
            console.log('creating wave')
        }
    }

    // update (dt) {},
});
