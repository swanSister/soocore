<template>
  <div class="flex column none signiture-popup">
    <div ref="canvasContent" 
     class="flex auto canvas-content">
      <canvas 
      @mousemove="onMouseMove" @mousedown="onMouseDown" @mouseup="onMouseUp" @mouseleave="onMouseUp" 
      @touchstart="onMouseDown" @touchmove="onMouseMove" @touchend="onMouseUp"
      ref="canvas">

      </canvas>
    </div>
    <div @click="$emit('confirm', $refs.canvas.toDataURL())" class="flex none footer justify-content-center align-items-center">
       <div class="flex none red-button align-items-center" style="margin:4vw;width:60%; padding:2vw 0;">
          확인
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      canvasWidth:0,
      canvasHeight:0,
      beforeX:null,
      beforeY:null,
      lastTimeStamp:null,
      timeThreshold:10,
      isMouseDown:false,
      ctx:null,
      canvasRect:null,
    }
  },
  methods:{
    resetCanvas(){
      this.$refs.canvas.setAttribute('width',this.canvasWidth)
      this.$refs.canvas.setAttribute('height',this.canvasHeight)
      this.ctx.clearRect(0,0,this.canvasWidth, this.canvasHeight)
    },
    onMouseDown(e){
      let target = e.target
      this.lastTimeStamp = e.timeStamp
      this.isMouseDown = true
      this.beforeX = (e.clientX || e.touches[0].clientX) - this.canvasRect.x
      this.beforeY = (e.clientY || e.touches[0].clientY) - this.canvasRect.y
    },
    onMouseMove(e){
      if(this.isMouseDown){
        let x = (e.clientX || e.touches[0].clientX) - this.canvasRect.x
        let y = (e.clientY || e.touches[0].clientY) - this.canvasRect.y
        if(this.beforeX && this.beforeY ){
          if(!this.lastTimeStamp || (e.timeStamp - this.lastTimeStamp) > this.timeThreshold){
            this.ctx.moveTo(this.beforeX, this.beforeY);
            this.ctx.lineTo(x, y);
            this.ctx.lineWidth=2
            this.ctx.stroke()
          }
        }
        this.beforeX = x
        this.beforeY = y
      }
   
    },
    onMouseUp(e){
      let that = this
      setTimeout(function(){
        that.isMouseDown = false
        that.lastTimeStamp = 0
      },50)
    }
  },
  mounted(){
    this.canvasWidth = this.$refs.canvasContent.getBoundingClientRect().width
    this.canvasHeight = this.$refs.canvasContent.getBoundingClientRect().height
    this.canvasRect = this.$refs.canvas.getBoundingClientRect()
    this.ctx = this.$refs.canvas.getContext("2d")
    this.resetCanvas()
  }
}
</script>
<style scoped>
.signiture-popup{
  position:fixed;
  left:5%;
  top:20%;
  width:90%;
  height:40%;
  background:#ffffff;
  box-shadow: 0 0 6px 0 rgba(33, 38, 46, 0.3);
  border-radius:2vw;
  overflow: hidden;
}
.canvas-content{
  border:0.5vw solid rgba(33, 38, 46, 0.3);
  border-radius:2vw;
  margin:4vw 4vw 0 4vw;
}
</style>