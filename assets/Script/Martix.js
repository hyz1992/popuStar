const Star = require("Star")

const ROW_NUM = 10 //行数
const COL_NUM = 10 //列数

var Martix = cc.Class({
    
    ctor:function(gameScene){
        this.starPrefab = gameScene.starPrefab
        this.bobmPrefab = gameScene.bobmPrefab
        this.parentNode = gameScene.node.getChildByName("girdPanel")
        this.audioMng = gameScene.getComponent('AudioMng')

        this.starPool = new cc.NodePool();
        this.Stars = new Array(ROW_NUM)
        var i,j
        for(i=0;i<ROW_NUM;i++)
        {
            this.Stars[i] = new Array(COL_NUM)
        }
        this.init()
        this.gameScene = gameScene
        this.parentNode.on('touchstart',this.onStarClick,this)
        this.oldTime = new Date().getTime()
    },
    init:function()
    {
        
        var i,j
        for (i=0;i<ROW_NUM;i++)
        {
            for(j=0;j<COL_NUM;j++)
            {
                // console.log(this.padding)

                var star;
                if (this.starPool.size() > 0) {
                    star = this.starPool.get(this); // this will be passed to Star's reuse method
                } else {
                    star = cc.instantiate(this.starPrefab);
                }

                // var node = new cc.Node()
                // node.setName("xxxLabel")
                // var label = node.addComponent(cc.Label)
                // label.fontSize = 20
                // label.lineHeight = 22
                // node.setColor(cc.color(0,0,0,255))
                // label.string = ("i:"+i+"\nj:"+j)
                // star.addChild(node)
                // node.active = false

                star.getComponent(Star).setIndex(i,j)
                star.getComponent(Star).setType(Math.floor(cc.random0To1()*5))
                this.parentNode.addChild(star)
                this.Stars[i][j] = star

                var offY = 1000+Math.floor(cc.random0To1()*100)
                var pos = star.getPosition()
                star.setPosition(pos.x,pos.y+offY)
                var ani = cc.moveBy(1.0+0.04*j, cc.p(0, -offY)).easing(cc.easeCubicActionOut())
                var delay = cc.delayTime(0.05*j)
                var sq = cc.sequence(delay,ani)
                star.runAction(sq)

                
            }
        }
        
    },
    //递归查找相同花色的节点
    findPopuStars:function(row,col,arr){
        // console.log(row,col)
        var target = this.Stars[row][col].getComponent(Star)
        arr[arr.length] = target.node
        var i,newI,newJ,star
        var offset = [{x:0,y:1},{x:1,y:0},{x:0,y:-1},{x:-1,y:0}]
        for(i=0;i<4;i++)
        {
            newI = row+offset[i].x
            newJ = col+offset[i].y
            if(newI<0 || newI>=ROW_NUM || newJ<0 || newJ>=COL_NUM || this.Stars[newI][newJ]==null)
                continue
            star = this.Stars[newI][newJ].getComponent(Star)
            if(star.getType()==target.getType() && arr.indexOf(star.node)==-1)
            {
                this.findPopuStars(newI,newJ,arr)
            }
            
        }
    },
    onStarClick:function(event){
        // console.log("Martix onTouchDown")
        var row,col
        var pos = event.getLocation()
        pos = this.parentNode.convertToNodeSpace(pos)
        // console.log(pos)

        var size = this.parentNode.getContentSize()
        row = Math.floor(pos.x/(size.width/ROW_NUM))
        col = Math.floor(pos.y/(size.height/COL_NUM))
        // console.log(row,col)
        // return


        var self = this
        var i,j,star
        var curTime = new Date().getTime()

        console.log("xxxxx  ",curTime-this.oldTime)
        if (new Date().getTime()-this.oldTime<300)
        {
            // console.log("not---------还在掉")
            return
        }
        this.oldTime = curTime
        var arr = new Array()
        self.findPopuStars(row,col,arr)
        if (arr.length<2){
            return
        }
        //找到相同花色之后，爆炸，并下落
        for(i=0,star;star=arr[i++];){
            var index = star.getComponent(Star).getIndex()
            self.bombStar(star)
            self.starPool.put(star);
            self.Stars[index.x][index.y] = null
            
            this.gameScene.scheduleOnce(function(){
                self.audioMng.play_2()
            },i*(0.4/arr.length))
        }
        self.fallStars()
        //是不是游戏结束
        if (self.judgeDead())
        {
            console.log("挂了")
        }
    },
    //节点爆炸，播放粒子特效
    bombStar:function(star){
        var pos = star.getPosition()
        var particle = cc.instantiate(this.bobmPrefab)
        particle.setPosition(pos)
        var color = star.getComponent(Star).getStarColor()
        var xx = particle.getComponent(cc.ParticleSystem)
        xx.startColor = color
        xx.endColor = color
        this.parentNode.addChild(particle)
        
    },

    //节点遇到缝隙下坠
    fallStars:function(){
        var i,j,star
        var numY = 0 //每一列中，从下往上，空节点的数量
        var numX = 0 //从左往右，完全空列的数量
        for (i=0;i<ROW_NUM;i++){
            numY = 0
            for(j=0;j<COL_NUM;j++){
                star = this.Stars[i][j]
                if (star===null){
                    numY++;
                }
                else{
                    // star.setMoveDistance(numY)
                    star.getComponent(Star).moveToIndex(i-numX,j-numY)
                    this.Stars[i][j] = null
                    this.Stars[i-numX][j-numY] = star
                }
            }
            if (numY>=COL_NUM){
                // console.log("整列空,i="+i)
                numX++
            }
        }
        for (i=0;i<ROW_NUM;i++){
            for(j=0;j<COL_NUM;j++){
                // star = this.Stars[i][j]
            }
        }
    },
    //判断是不是无子可消了
    judgeDead:function()
    {
        var i,j
        var isDead = true
        for (i=0;i<ROW_NUM;i++)
        {
            for(j=1;j<COL_NUM;j++)
            {
                if (this.Stars[i][j]&&this.Stars[i][j-1]&&this.Stars[i][j].getComponent(Star).getType()==this.Stars[i][j-1].getComponent(Star).getType())
                {
                    return false
                }
            }
        }

        for (j=0;j<COL_NUM;j++)
        {
            for(i=1;i<ROW_NUM;i++)
            {
                if (this.Stars[i][j]&&this.Stars[i-1][j]&&this.Stars[i][j].getComponent(Star).getType()==this.Stars[i-1][j].getComponent(Star).getType())
                {
                    return false
                }
            }
        }
        return true
    },

});

module.exports = Martix