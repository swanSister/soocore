<template>
  <div>
    <div class="x-flex">
      <div class="flex none column justifh-content-center content"> 
        <div class="flex">
          <div class="flex auto justify-content-center align-items-center">
            <div class="flex none circle justify-content-center align-items-center">갑</div>
            <div>김민수</div>
          </div>
          <div class="flex auto justify-content-center align-items-center">
            <div class="flex none circle justify-content-center align-items-center">을</div>
            <div>정유정</div>
          </div>
        </div>

        <div class="flex auto justify-content-center">
          <div class="flex none progress-bar-bg">
            <div class="flex none progress-bar"></div>
          </div>
        </div>

        <div class="flex auto justify-content-center">
          <div class="flex none button" style="margin:1vh 0; padding:0.6vh 2vh; font-size:1.5vh;">
            상세보기
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mian',
  data () {
    return {
      
    }
  }
}
</script>

<style scoped>
.content{
  border-radius:1vh;
  margin:1vh;
  padding:2vh;
  box-shadow: 0 0 12px 0 rgba(33, 38, 46, 0.3);
  background-color: #ffffff;
}
.circle{
background:#D8695E;
width:4vh;
height:4vh;
border-radius: 2vh;
color:#ffffff;
margin-right:1vh;
}
.progress-bar-bg{
  height:2vh;
  background:#D9D9D9;
  border-radius: 1vh;
  width:60vw;
  margin-top:2vh;
  margin-bottom:1vh;
}
.progress-bar{
  height:100%;
  width:60%;
  background:#F2D677;
  border-radius: 1vh;
  border: 2px dotted #D8695E;
}

</style>
