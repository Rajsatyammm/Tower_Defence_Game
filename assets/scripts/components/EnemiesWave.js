cc.Class({
    extends: cc.Component,

    properties: {
        enemy: {
            default: null,
            type: cc.Prefab
        },
        repeatInterval: 10,
        enemiesCount: 3,
        timeOut: 3
    },

    // onLoad () {},

    init() {

    },

    // update (dt) {},
});
