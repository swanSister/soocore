
<template>
<div class="flex auto column">
 <sub-header title="상세"/>
  <div class="nano">
    <div class="nano-content">
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
      <div class="flex none content column" style="padding-bottom:1vw;">
        <div class="flex none justify-content-start align-items-center add-title">점수</div>
          <div class="flex none column justify-content-center">
            <div class="flex none progress-bar-bg">
              <div v-if="section.score > 0" class="flex none progress-bar" :style="{
                      width:getProgressWidth(section.goalpoint, section.score)
                }"></div>
            </div>
          </div>
           <div class="flex auto align-items-center" style="margin-top:2vw;">
              <div class="flex auto justify-content-start" style="margin-left:4vw;">
                <div class="flex none score-text">
                  점수
                </div>
              </div>
              <div class="flex auto justify-content-end" style="margin-right:4vw;">
                <div class="flex none score-text" :style="{
                color:'#D8695E', 
                fontWeight:'bold'
                }">
                  {{section.score}}/
                </div>
                <div class="flex none score-text">
                  10000점
                </div>
              </div>
            </div>
            <span @click="isScoreListShow = !isScoreListShow" :class="isScoreListShow ? 'icon-angle-up' : 'icon-angle-down' " style="color:#595959; font-size:6vw;"></span>
            <div v-if="isScoreListShow" style="width:90%; margin-left:5%;">
              <div @click="isAddScorePopupShow=!isAddScorePopupShow" class="flex auto align-items-center justify-content-center column" style="min-height:30vw;" v-if="!scores.length">
                <div class="flex icon-plus" style="font-size:10vw; color:#D8695E;"></div>
              </div>
              <div v-else class="nano" style="margin:0 auto;width:100%;height:50vw; box-shadow: 0 -1px 0 0 rgba(33, 38, 46, 0.3);">
                <div class="nano-content">
                  <div class="flex column">
                    <div class="flex" v-for="(score, index) of scores" :key="'score-history'+index" style="margin-top:2vw;">
                      <div class="flex none justify-content-start score-table-item" style="color:#595959; width:30%; font-size:2vw;">
                        {{$moment(score.timestamp).format('YYYY.MM.DD HH:MM')}}
                      </div>
                      <div class="flex none justify-content-start score-table-item" style="width:50%; text-align:left; padding:0 2vw;">
                        {{score.todo}}
                      </div>
                      <div class="flex none justify-content-start score-table-item" style="color:#D8695E; width:20%;">
                        {{score.score}}점
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </div>
      <div class="flex content column" >
        <div class="flex none justify-content-start align-items-center add-title"> 승인 대기</div>
        <div class="flex" style="text-align:left;">
          <div style="width:90%; margin:0 auto;">
            <div class="flex column">
              <div class="flex align-items-center" v-for="(score, index) of waitScores" :key="'score-history'+index">
                <div class="flex auto" style="padding-bottom:2vw;">
                  <div class="flex auto column">
                    <div class="flex justify-content-start align-items-center score-table-item" style="margin-bottom:1vw; min-height:6vw; max-height:6vw;color:#595959;font-size:2vw;">
                      {{$moment(score.timestamp).format('YYYY.MM.DD HH:MM')}}
                    </div>
                    <div class="flex auto" style="font-size:4vw;">{{score.todo}}</div>
                  </div>
                  <div class="flex column justify-content-start align-items-center score-table-item" style="text-align:left;">
                    <div class="flex auto justify-content-end align-items-center score-table-item" style="margin-bottom:1vw; min-height:6vw; max-height:6vw; color:#D8695E;font-size:4vw;">
                      {{score.score}}점
                    </div>
                    <div class="flex auto justify-content-center align-items-center score-table-item clickable">
                      <template v-if="role==1">
                        <div class="flex none justify-content-center align-items-center icon-button">
                          <div @click="approveScore({id:score.id, sectionId:score.sectionId})" class="flex icon-ok"></div>
                        </div>
                        <div class="flex none justify-content-center align-items-center icon-button" style="margin-left:2vw; background:#595959;">
                          <div @click="deleteScore({id:score.id, sectionId:score.sectionId})" class="flex icon-cancel"></div>
                        </div>
                      </template>
                      <template v-else>
                        <div @click="onTease(score)" class="flex auto red-button align-items-center" style="background:#F2D677; border-radius:2vw; width:20vw; height:8vw; font-size: 5vw;">
                          결재 요청
                        </div>
                      </template>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex content column" >
        <div class="flex none justify-content-start align-items-center add-title"> 달성 보상</div>
        <div class="flex" style="width:90%; margin-left:5%; text-align:left;">
          {{section.goal}}
        </div>
      </div>

       <div class="flex none align-items-center" style="min-height:10vh;">
        <div class="flex none circle-small justify-content-center align-items-center" :style="{background:'#D8695E'}">
          갑
        </div>
        <div class="flex none" style="width:30%;margin-left:4vw;">
          {{section.a_name}}
        </div>
        <div class="flex none" style="position:relative; width:40%; height:auto; border-radius:2vw;">
          <div style="position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); color:#595959; font-size:4vw; opacity:0.5;">서명</div>
          <img :src="section.a_sign" class="flex align-items-center " style=" width:100%; height:100%;"/>
        </div>
      </div>

      <div class="flex none align-items-center" style="min-height:10vh;">
        <div class="flex none circle-small justify-content-center align-items-center" :style="{background:'#F2D677'}">
          을
        </div>
        <div class="flex none" style="width:30%;margin-left:4vw;">
          {{section.b_name}}
        </div>
        <div class="flex none" style="position:relative; width:40%; height:auto; border-radius:2vw;">
          <div style="position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); color:#595959; font-size:4vw; opacity:0.5;">서명</div>
          <img :src="section.b_sign" class="flex align-items-center " style=" width:100%; height:100%;"/>
        </div>
      </div>
   
   </div>
  </div>
  <div @click="isAddScorePopupShow=!isAddScorePopupShow" class="flex none footer justify-content-center align-items-center">
    <div class="flex auto red-button align-items-center" style="width:90%; padding:2vw 0;">
        점수 등록
    </div>
  </div>
  <div v-if="isAddScorePopupShow || isSendMessagePopupShow" class="popup-bg" @click="isAddScorePopupShow=false, isSendMessagePopupShow=false"></div>
  <add-score-popup v-if="isAddScorePopupShow" @confirm="createScore($event)"/>
  <yes-no-popup v-if="isSendMessagePopupShow" @confirm="sendMessage" @cancel="isSendMessagePopupShow=false">
    <div class="flex column auto justify-content-center">
      <div class="flex align-items-center">{{role==1 ? section.b_name : section.a_name}} 님께 메세지를 보내시겠습니까?</div>
      <div class="flex align-items-center" style="margin:4vw 0; color:#595959; font-size:4vw;">{{kakaoMessageDesc}}</div>
    </div>
  </yes-no-popup>
</div>

</template>

<script>

import AddScorePopup from '@/components/add-score-popup'
import YesNoPopup from '@/components/yes-no-popup'
export default {
  name: 'add',
  components:{
    AddScorePopup,
    YesNoPopup,
  },
  data () {
    return {
      role:0,
      isScoreListShow:true,
      isAddScorePopupShow:false,
      section:{},
      scores:[],
      waitScores:[],
      isSendMessagePopupShow:false,
      kakaoMessageTitle:'',
      kakaoMessageDesc:'',
    }
  },
  methods:{
    getProgressWidth(goal,score){
      let per  = parseInt(score*100/goal)
      per = per > 100 ? 100 : per
      return per+'%'
    },
    onTease(data){
      this.kakaoMessageDesc = `"${data.todo}" ${data.score}점 결재 요청합니다. `
      this.isSendMessagePopupShow = true
    },
    async createScore(data){
      let obj = Object.assign({},data)
      obj.sectionId = this.$route.query.id
      obj.isAccept = this.role==1 ? true : false
      console.log(data)
      let res = await this.$api.createScore(obj)
      console.log("####create score", res)
      this.isAddScorePopupShow=false
      this.isSendMessagePopupShow = true
      if(this.role==1) {
        this.kakaoMessageDesc = `"${data.todo}" ${data.score}점 승인합니다. `
      }
      else if(this.role==2){
        this.kakaoMessageDesc = `"${data.todo}" ${data.score}점 결재 요청합니다. `
      }
      this.loadData()
    },
    async getSectionDetail(){
      let res = await this.$api.getSectionDetail({id: this.$route.query.id})
      this.section = res.data.data
      this.role = this.section.a_id == this.$store.state.me.id ? 1 : 2
    },
    async getScore(){
      let res = await this.$api.getScore({sectionId: this.$route.query.id})
      this.scores = res.data.data
    },
    async getWaitScore(){
      let res = await this.$api.getWaitScore({sectionId: this.$route.query.id})
      this.waitScores = res.data.data
    },
    async approveScore(data){
      let res = await this.$api.approveScore(data)
      console.log("###approve res,",res)
      this.loadData()
      this.kakaoMessageDesc = `"${data.todo}" ${data.score}점 승인합니다. `
      this.isSendMessagePopupShow = true
      
    },
    async deleteScore(data){
      let res = await this.$api.deleteScore(data)
      this.loadData()
      this.kakaoMessageDesc = `"${data.todo}" ${data.score}점 거절합니다. `
      this.isSendMessagePopupShow = true
    },
    async loadData(){
      this.getSectionDetail()
      this.getScore()
      this.getWaitScore()
    },
    async sendMessage(){
      this.isSendMessagePopupShow = false
      let res = await this.$api.getKakaoFrinds()
      console.log(res.data)
      if(res.data.code == -402){
        window.open(res.data.uri)
      }else if(res.data.code == -401){
        let res = await this.$api.refreshKakaoToken()
        console.log("#######refreshKakaoToken Res", res)
        if(! res.data.kakaoToken || !res.data.kakaoTokenRefresh){
          this.$store.commit('me', '')
          this.$store.commit('kakaoToken', '')
          this.$store.commit('kakaoTokenRefresh', '')
          this.$store.commit('accessToken', '')
          this.$router.push({ name: 'login'})
        }else{
          this.$store.commit('kakaoToken', res.data.kakaoToken)
          this.$store.commit('kakaoTokenRefresh', res.data.kakaoTokenRefresh)
        }
      }
      let targetId = ''
      if(this.role==1) targetId = this.section.b_id
      else if(this.role==2) targetId = this.section.a_id
      let found = res.data.elements.find(i=> i.id==targetId)
      if(found && found.uuid){
        let res2 = await this.$api.sendKakaoMessage({
          receiver_ids:[found.uuid],
          template_object:{
            object_type: "text",
            text:this.kakaoMessageDesc,
            link: {
              web_url: "http://soocore.com",
              mobile_web_url: "http://soocore.com",
            },
            button_title:"확인"
        }
        })
        console.log(res2)
      }
    },
  },
  mounted(){
      $(".nano").nanoScroller()
      this.loadData()
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
  cursor: pointer;
  width:15vw;
  height:15vw;
  font-size:6vw;
  border-radius: 3vw;
  color:#ffffff;
  margin-right:2vw;
}
.circle-small{
  cursor: pointer;
  width:10vw;
  height:10vw;
  font-size:5vw;
  border-radius: 2vw;
  color:#ffffff;
  margin-left:4vw;
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
.progress-bar-bg{
  height:6vw;
  background:#D9D9D9;
  border-radius: 2vw;
  margin:2vw;
}
.progress-bar{
  height:100%;
  width:70%;
  background:#F2D677;
  border-radius: 2vw;
  border: 2px dotted #D8695E;
}
.score-text{
  font-size:4vw;
  height:4vw;
  line-height: 4vw;
  margin-bottom:1vw;
  color:#595959;
}
.score-table-header{
  color:#595959;
  padding:0 2vw;
  
}
.score-table-item{
  font-size:4vw;
  padding:0 1vw;
}
</style>