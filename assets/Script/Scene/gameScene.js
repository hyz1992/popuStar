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
        var girdPanel = this.node.getChildByName("girdPanel")
        girdPanel.setScale(cc.director.getVisibleSize().width/girdPanel.getContentSize().width)
        cc.log(cc.director.getVisibleSize())
        cc.log(girdPanel.getContentSize())
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

        var place = cc.moveBy(0.0,0,500)
        var move = cc.moveBy(1,0,-500)
        node_rank.runAction(cc.sequence(place,move))
        text_targetScore.runAction(cc.sequence(place.clone(),move.clone(),cc.callFunc(this.nextLevel,this,this)))
        text_CurrentScore.runAction(cc.sequence(place.clone(),move.clone()))

        var sq = cc.sequence(cc.hide(),cc.moveBy(0,500,0),cc.show(),cc.delayTime(5),cc.moveBy(0.5,-500,0))
        shop.runAction(sq)
        toolPanel.runAction(sq.clone())
    },

    nextLevel:function(node,that)
    {
        var text_nextRound = cc.find("Canvas/text_nextRound")
        var text_nextTargetScore = cc.find("Canvas/text_nextTargetScore")

        var text_targetScore = cc.find("Canvas/text_targetScore")
        text_targetScore.runAction(cc.sequence(cc.delayTime(0.25),cc.blink(2,8)))

        text_nextRound.active = true

        var place = cc.moveBy(0.0,500,0)
        var move = cc.moveBy(0.5,-500,0)
        var callfunc = cc.callFunc(function(node){
            node.active = false
            node.runAction(cc.moveBy(500,0))
        })
        text_nextRound.runAction(cc.sequence(place,move,cc.delayTime(0.5),cc.callFunc(function(){
            text_nextTargetScore.active = true
            text_nextTargetScore.runAction(cc.sequence(place.clone(),move.clone(),cc.delayTime(1),cc.callFunc(function(){
                text_nextRound.runAction(cc.sequence(move.clone(),callfunc.clone()))
                text_nextTargetScore.runAction(cc.sequence(move.clone(),callfunc.clone(),cc.callFunc(function(){
                    cc.log("ssssssssss")
                    that.Martix.init()
                })))
            })))
        })))
    },

    gameOver:function(){
        
    },
});
