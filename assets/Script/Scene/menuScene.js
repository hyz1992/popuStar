cc.Class({
    extends: cc.Component,

    properties: {
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
        console.log("menuScene,onLoad")
        this.node.on('touchstart', this.onClick_2,this)
    },

    // called every frame
    update: function (dt) {

    },

    onClick_1: function () {
        console.log("sssssssss")
        cc.director.loadScene('gameScene');
    },
    onClick_2: function (event) {
        console.log(event.touch._point)
        console.log("背景被按下")
    },
    onClick_3: function () {
        
    },
});
