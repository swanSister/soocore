
<template>
<div class="flex auto column">
  <div class="sub-title">추가</div>
  <div class="flex none content" >
    <div class="flex auto justify-content-center align-items-center"> 나의 역할</div>
    <div class="flex" style="width:70%;">
      <div class="flex auto justify-content-center">
        <div class="flex none circle justify-content-center align-items-center" :style="{
          background:role == 1 ? '#D8695E' : '#D9D9D9'
        }" @click="role=1">갑</div>
      </div>
      <div class="flex auto justify-content-center">
        <div class="flex none justify-content-center align-items-center circle" :style="{
          background:role == 2 ? '#F2D677' : '#D9D9D9'
        }" @click="role=2">을</div>
      </div>
    </div>
  </div>
  <div class="flex column none content" style="position: relative;">
    <div class="flex auto justify-content-center align-items-center"> 목표 점수</div>
    <div class="flex justify-content-start score-selector-bg">
      <div class="score-selector">
      </div>
      <div class="flex align-items-center justify-content-center score-selector-text" style="font-size:3vw; left:0;">1000</div>
      <div class="flex align-items-center justify-content-center score-selector-text">50000</div>
      <div class="flex align-items-center justify-content-center score-selector-text" style="font-size:3vw; left:100%;">100000</div>
    </div>
  </div>

   <div class="flex none content" >
    <div class="flex auto justify-content-center align-items-center"> 달성 보상</div>
    <div class="flex" style="width:70%;"><textarea type="text" rows="4" cols="30"/></div>
  </div>
</div>

</template>

<script>
export default {
  name: 'add',
  data () {
    return {
      role:1, //1:갑, 2:을
     
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
  margin: 4vw 4vw 0vw 4vw;
  padding:2vw;
  box-shadow: 0 0 6px 0 rgba(33, 38, 46, 0.3);
  border-radius:2vw;
}
.circle{
  cursor: pointer;
  width:16vw;
  height:16vw;
  font-size:8vw;
  border-radius: 4vw;
  color:#ffffff;
  margin-right:2vw;
}
.score-selector-bg{
  width:80%;
  margin-right:10%;
  height:6vw;
  background:#D9D9D9;
  border-radius: 2vw;
  position: relative;
  margin-bottom: 6vw;
}
.score-selector{
  position: absolute;
  border:solid 0.8vw #D8695E;
  transform: translate(-50%,0);
  left:50%;
  top:0;
  width:5%;
  height:100%;
  background:#F2D677;
  border-radius: 2vw;
  cursor: pointer;
}
.score-selector:hover{
  background:#D8695E;
  opacity:.7;
}
.score-selector-text{
  position: absolute;
  width:40vw;
  top:7vw;
  left:50%;
  height:6vw;
  transform: translate(-50%,0);
  color:#595959;
}
textarea{
	border-radius: 2vw;
	outline: none;
	padding: 2vw;
	font-size: 4vw;
	color: #595959;
  border: solid 0.8vw #D9D9D9;
  font-weight: bold;
}
input:focus, textarea:focus{
	border: solid 0.8vw #D8695E;	
}
textarea{
	resize: none; 
	overflow: auto;
}
</style>