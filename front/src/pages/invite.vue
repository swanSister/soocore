
<template>
<div class="flex auto column">
 <sub-header title="초대장"/>
  <div class="nano">
    <div class="nano-content">
      <div class="flex none content column">
        <div class="flex none justify-content-start align-items-center add-title"> {{$store.state.me.name}}의 역할</div>
        <div class="flex none content column">
            <div class="flex none justify-content-start align-items-center add-title">계약자</div>
            <div class="flex auto">
              <div class="flex auto justify-content-center">
                <div class="flex none circle justify-content-center align-items-center" :style="{
                  background:'#D8695E'
                }">갑</div>
                <div class="flex align-items-center">{{section.a_name}}</div>
              </div>
              <div class="flex auto justify-content-center">
                <div class="flex none justify-content-center align-items-center circle" :style="{
                  background:'#F2D677'
                }">을</div>
                <div class="flex align-items-center">{{section.b_name}}</div>
              </div>
            </div>
          </div>
      </div>
      <div class="flex column none content" style="position: relative;">
        <div class="flex none justify-content-start align-items-center add-title"> 목표 점수</div>
        <div ref="scoreSelectorBg"
        class="flex justify-content-start score-selector-bg">
          <div class="score-selector" :style="{
            left:getScoreLeft(100000, section.goalpoint)
          }">
          </div>
          <div class="flex align-items-center justify-content-center score-selector-text" style="font-size:3vw; left:3%;">5,000</div>
          <div class="flex align-items-center justify-content-center score-selector-text goal-score">{{section.goalpoint}} 점</div>
          <div class="flex align-items-center justify-content-center score-selector-text" style="font-size:3vw; left:96%;">100,000</div>
        </div>
      </div>
      <div class="flex content column" >
        <div class="flex none justify-content-start align-items-center add-title"> 달성 보상</div>
        <div class="flex column auto" style="width:90%; margin-left:5%;">
           <div class="flex justify-content-start" style="color:#595959; margin:1vw 0; padding:0 2vw; font-size:3vw; width:100%;">
            을이 목표 점수 달성 시, 갑은 을에게 아래의 보상을 지급한다.
          </div>
          <div style="width:100%; height:30%;">
            {{section.goal}}
          </div>
        </div>
      </div>
      <div class="flex none align-items-center" style="min-height:10vh;">
        <div class="flex none circle-small justify-content-center align-items-center" :style="{
            background:'#D8695E'
          }">
            갑
        </div>
        <div class="flex none" style="width:30%;margin-left:4vw;">
          {{section.a_name}}
        </div>
        <div @click="role==1 ? isSigniturePopupShow=!isSigniturePopupShow : ''" class="flex none" style="position:relative; width:40%; height:auto; border-radius:2vw;">
          <div style="position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); color:#595959; font-size:4vw; opacity:0.5;">서명</div>
          <img v-if="role==2 || (role==1 && signitureData)" :src="role==1 ? signitureData : section.a_sign" class="flex align-items-center " style=" width:100%; height:100%;"/>
        </div>
      </div>

      <div class="flex none align-items-center" style="min-height:10vh;">
        <div class="flex none circle-small justify-content-center align-items-center" :style="{
            background:'#F2D677'
          }">
          을
        </div>
        <div class="flex none" style="width:30%;margin-left:4vw;">
          {{section.b_name}}
        </div>
        <div @click="role==2 ? isSigniturePopupShow=!isSigniturePopupShow : ''" class="flex none" style="position:relative; width:40%; height:auto; border-radius:2vw;">
          <div style="position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); color:#595959; font-size:4vw; opacity:0.5;">서명</div>
          <img v-if="role==1 || (role==2 && signitureData)" :src="role==2 ? signitureData : section.b_sign" class="flex align-items-center " style=" width:100%; height:100%;"/>
        </div>
      </div>

        <div v-if="signitureData" @click="acceptSection" class="flex none footer justify-content-center align-items-center">
          <div class="flex auto red-button align-items-center" style="margin:4vw;width:90%; padding:2vw 0;">
              수락 하기
          </div>
        </div>
   </div>
  </div>
  <div v-if="isSigniturePopupShow" class="popup-bg" @click="isSigniturePopupShow=false"></div>
  <signiture-popup v-if="isSigniturePopupShow" @confirm="onConfirmSignitur" class="sign-popup" />
</div>
</template>

<script>
function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var _ia = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
        _ia[i] = byteString.charCodeAt(i);
    }
    var dataView = new DataView(arrayBuffer);
    var blob = new Blob([dataView], { type: mimeString });
    return blob;
}
import SigniturePopup from '@/components/signiture-popup'
export default {
  name: 'add',
  components:{
    SigniturePopup,
  },
  data () {
    return {
      role : 0,
      section:{},
      signitureData:'',
      isSigniturePopupShow:false,
    }
  },
  methods:{
      onConfirmSignitur(data){
        this.signitureData = data
        this.isSigniturePopupShow = false
      },
      async acceptSection(){
        this.$eventBus.$emit("showLoading")
        let res = await this.$api.acceptSections(this.section)
        console.log(res)
        let pre = this.role == 1 ? '_a' : '_b'
        let fileName = this.section.id+pre
        var blob = dataURItoBlob(this.signitureData)
        let res2 = await this.$api.signUpload(blob,fileName)
        this.$eventBus.$emit("hideLoading")
        this.$router.push('main')
        this.$eventBus.$emit("showToast",{
          type:false,
          title:'성공',
          content:'계약이 생성되었습니다.'
        })
      },
      async getInvitedSection(){
        this.$eventBus.$emit("showLoading")
        let res = await this.$api.getInvitedSection({id:this.$route.query.id})
        this.section = res.data.data[0]
        if(this.section.isCreate){
          this.$eventBus.$emit("showToast",{
            type:false,
            title:'실패',
            content:'이미 수락된 요청입니다.'
          })
          this.$router.push('main')
        }
        this.role = this.section.a_id ? 2 : 1 
        if(this.role ==1 ) this.section.a_name = this.$store.state.me.name
        else this.section.b_name = this.$store.state.me.name
        this.$eventBus.$emit("hideLoading")
      },
      getScoreLeft(goal,score){
      let per  = parseInt(score*100/goal)
      per = per > 100 ? 100 : per
      return per+'%'
      }
    }, 
    mounted(){
      console.log(this.$route.query.id)
      this.getInvitedSection()
    },
    destroyed(){
  
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
  width:92%;
  margin-top:4vw;
  margin-left:4%;
  padding-bottom:4vw;
  box-shadow: 0 0 6px 0 rgba(33, 38, 46, 0.3);
  border-radius:2vw;
  overflow: hidden;
}
.circle{
  width:20vw;
  height:20vw;
  font-size:10vw;
  border-radius: 4vw;
  color:#ffffff;
  margin-right:2vw;
}
.circle-small{
  width:10vw;
  height:10vw;
  font-size:5vw;
  border-radius: 2vw;
  color:#ffffff;
  margin-left:4vw;
}
.circle:after{
  opacity:.7;
}
.score-selector-bg{
  width:90%;
  margin-left:5%;
  height:10vw;
  background:#D9D9D9;
  border-radius: 4vw;
  position: relative;
  margin-bottom: 12vw;
  box-shadow: 1px 1px 6px 0 rgba(33, 38, 46, 0.4);
}
.score-selector{
  position: absolute;
  border:solid 1.2vw #D8695E;
  transform: translate(-50%,0);
  left:50%;
  top:-20%;
  width:10%;
  height:140%;
  background:#F2D677;
  border-radius: 4vw;
  cursor: pointer;
  box-shadow: 1px 1px 3px 0 rgba(33, 38, 46, 0.4);
  opacity:0.6;
}
.score-selector:after{
  cursor:auto;
}
.score-selector-text{
  position: absolute;
  width:40vw;
  top:15vw;
  left:50%;
  height:6vw;
  transform: translate(-50%,0);
  color:#595959;
}
.add-title{
  box-shadow: 1px 1px 1px 0 rgba(33, 38, 46, 0.3);
  font-size: 6vw;
  padding-bottom: 2vw;
  padding:2vw;
  margin-bottom: 4vw;
  
}
.goal-score{
  color:#D8695E;
  font-size:6vw;
  font-weight: bold;
}
</style>