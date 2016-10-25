var Martix = require("Martix")
cc.Class({
    extends: cc.Component,

    properties: {
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        bobmPrefab: {
            default: null,
            type: cc.Prefab
        },
        
        
    },

    // use this for initialization
    onLoad: function () {
        console.log("onLoad")    
        
        this.Martix = new Martix(this)

        var listener = {
        event: cc.EventListener.KEYBOARD,
        onKeyPressed: function (keyCode, event) {
            cc.log('keyDown: ' + keyCode);
            if (keyCode==cc.KEY.back)
            {

            }
        },
        onKeyReleased: function (keyCode, event) {
            cc.log('keyUp: ' + keyCode);
        }
    }
    // 绑定键盘事件
    cc.eventManager.addListener(listener, this.node);
        
    },

    start: function () {
        console.log("start")
        this.gameStart()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    onClick_1: function () {
        cc.director.loadScene('menuScene');
    },

    gameStart:function()
    {
        var node_rank = cc.find("Canvas/node_rank")
        var text_targetScore = cc.find("Canvas/text_targetScore")
        var shop = cc.find("Canvas/shop")
        var node_level = cc.find("Canvas/node_level")
        var text_CurrentScore = cc.find("Canvas/text_CurrentScore")
        var toolPanel = cc.find("Canvas/toolPanel")

    },

    nextLevel:function()
    {

    },
});
