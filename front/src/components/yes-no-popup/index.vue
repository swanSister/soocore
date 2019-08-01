<template>
  <div class="flex none yes-no-popup">
    <div class="flex column" style="width:90%; margin:0 auto; padding:4vw 0;">
      <div class="flex none" style="margin-top:4vw;">
        <slot></slot>
      </div>
     
      <div class="flex footer justify-content-center align-items-center">
         <div @click="onCancel" class="flex none white-button align-items-center" style="margin-right:2%; font-size:6vw; margin-top:4vw;width:50%; padding:2vw 0;">
           아니요
        </div>
        <div @click="onConfirm" class="flex none red-button align-items-center" style="margin-left:2%; font-size:6vw; margin-top:4vw;width:50%; padding:2vw 0;">
           예
        </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    message:String,
  },
  data () {
    return {
    }
  },
  methods:{
    onConfirm(){
      this.$emit('confirm')
    },
    onCancel(){
      this.$emit('cancel')
    }
   
  },
  mounted(){
   
  }
}
</script>
<style scoped>
.yes-no-popup{
  position:fixed;
  left:5%;
  top:20%;
  width:90%;
  background:#ffffff;
  box-shadow: 0 0 6px 0 rgba(33, 38, 46, 0.3);
  border-radius:2vw;
  overflow: hidden;
  z-index: 5;
}


</style>