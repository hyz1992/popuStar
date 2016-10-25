cc.Class({
    extends: cc.Component,

    properties: {
        starType:1,  //1,蓝；2，绿；3，紫；4，红；5，黄
        frameBlue: {
          default: null,
          type: cc.SpriteFrame,
        },
        frameGreen: {
          default: null,
          type: cc.SpriteFrame,
        },
        frameRed: {
          default: null,
          type: cc.SpriteFrame,
        },
        frameYellow: {
          default: null,
          type: cc.SpriteFrame,
        },
        framePurple: {
          default: null,
          type: cc.SpriteFrame,
        },

        blueURL:{
            default:"",
            url:cc.Texture2D
        },
        greenURL:{
            default:"",
            url:cc.Texture2D
        },
        redURL:{
            default:"",
            url:cc.Texture2D
        },
        yellowURL:{
            default:"",
            url:cc.Texture2D
        },
        purpleURL:{
            default:"",
            url:cc.Texture2D
        },

        size:{
            default:new cc.Vec2(52,52),
        },
        padding:2,
        index:{
            default:new cc.Vec2(0,0),
        },
        isFalling:false,    
    },
    reuse:function(){

    },
    onLoad:function(){
    },

    setIndex:function(i,j){
        var pos = new cc.Vec2(this.size.x/2+(this.size.x+this.padding)*i,this.size.y/2+(this.size.y+this.padding)*j)
        this.node.setPosition(pos)
        this.index.x = i
        this.index.y = j
    },
    getIndex:function(){
        return this.index
    },
    getMoveDistance:function(){
        return this.moveDistance
    },
    setType:function(type){
        this.starType = type
        var frames = [this.frameBlue,this.frameGreen,this.frameRed,this.frameYellow,this.framePurple]
        this.getComponent(cc.Sprite).spriteFrame = frames[type]
    },
    getType:function(){
        return this.starType
    },
    getStarColor:function(){
        var colors = [new cc.Color(44,228,255),new cc.Color(139,234,55),new cc.Color(255,83,83),new cc.Color(255,230,49),new cc.Color(219,111,255)]
        var ret = colors[this.starType]
        return ret
    },
    moveToIndex:function(i,j){
        var delayX = 0.1
        var delayY = 0.3
        if (j - this.index.y>=0){
            delayY = 0
            if (i-this.index.x>=0){
                delayX = 0
                return
            }
        }
        var self = this
        var offX = (this.size.x+this.padding)*(i - this.index.x)
        var offY = (this.size.y+this.padding)*(j - this.index.y)

        var ani = cc.moveBy(0.3, cc.p(offX, offY)).easing(cc.easeCubicActionOut())
        var callback =  cc.callFunc(function(){
            // console.log("xxx")
        },this)
        var sq = cc.sequence(ani,callback)
        this.node.runAction(sq)
        this.index.y = j
        this.index.x = i
        // var label = this.node.getChildByName("xxxLabel")
        // label.getComponent("cc.Label").string = "i:"+this.index.x+"\nj:"+this.index.y
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
