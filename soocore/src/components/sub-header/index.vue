<template>
  <div class="flex none sub-title justify-content-center align-items-center" style="padding:2vw;">
    <div @click="$router.go(-1)" class="flex none icon-left-small" style="width:10vw; color:#595959;"></div>
    <div class="flex auto justify-content-center">
      <div style="margin-left:-10vw;">{{title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    title:String,
  },
  data () {
    return {
    
    }
  },
  methods:{
  },
  mounted(){
  
  }
}
</script>
<style scoped>

</style>