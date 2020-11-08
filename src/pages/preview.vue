<template>
  <div class="view-wrapper" :style="{backgroundImage:'url('+bgUrl+')'}">
    <div class="srolle">
      <div class="view">
        <div class="title">竞赛活动排名</div>
        <div class="mtitle">(当前第 {{turn}} 轮)</div>
        <div class="list">
          <table class="table">
            <thead>
              <tr>
                <th class="num">排名</th>
                <th>姓名</th>

                <!-- <th>轮次</th> -->
                <!-- <th>最高分</th>
                <th>最低分</th>
                <th>平均分</th> -->
                <th>总分数</th>
                <th>用时</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in data" :key="item.id">
                <td>
                  <span class="number">{{index+1}}</span>
                </td>
                <td>{{item.urlsname}}</td>

                <!-- <td>{{item.rurns}}</td> -->
                <!-- <td>{{item.maxScore}}</td>
                <td>{{item.minScore}}</td>
                <td>{{item.averageScore}}</td> -->
                <td>{{item.sumScore}}</td>
                <td>{{item.longTime?item.longTime+' 秒':''}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="btn-list">
          <van-row>
            <van-col class="btn-w" span="8"><van-button @click="setList(1)" class="btn" size="large" style="color:#4397c1" type="default">上一轮</van-button></van-col>
            <van-col class="btn-w" span="8"><van-button @click="setList(2)" class="btn" size="large" style="color:#4397c1" type="default">启动</van-button></van-col>
            <van-col class="btn-w" span="8"><van-button @click="setList(3)" class="btn" size="large" style="color:#4397c1" type="default">下一轮</van-button></van-col>
          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      expoid:'',
      data:[],
      turn:1,
      type:0,
      time:null,
      bgUrl:'',
    }
  },
  created(){
    let expoid = this.$route.query.expoid;
    if(expoid){
      this.expoid = expoid
      this.getList()
    }

  },
  mounted(){
    window.clearInterval(this.time);
    this.timer()
  },
  methods:{
    getList(){
      let data = {
        expoId:this.expoid,
        turn:this.$route.query.turn || 1,
        type:this.type
      }
      this.$http.getList(data).then( res => {
        if(res.errcode === 0){
          this.data = res.data
          this.turn = res.numbers
          this.bgUrl = res.abcPic
        }
      })
    },
    setList(flog){
      let data
      if(flog === 1 && parseInt(this.$route.query.turn) === 1) return
      if(flog === 1) {
        data = {
          expoId:this.expoid,
          turn:this.turn === 1 ? 1 : this.turn - 1,
          type:0
        }
      }
      if(flog === 2) {
        data = {
          expoId:this.expoid,
          turn:this.turn,
          type:1
        }
      }
      if(flog === 3) {
        data = {
          expoId:this.expoid,
          turn:this.turn + 1,
          type:2
        }
      }
      this.$http.setList(data).then( res => {
        if(res.errcode === 0){
          if(!this.$route.query.start){
            this.$notify({
              type: 'primary',
              message: '启动成功',
              duration: 3000,
            });
          }
          this.$router.push({
            query:{
              expoid:this.expoid,
              turn:data.turn,
              type:this.type,
              start:'s'
            }
          })
          this.$toast.success('操作成功');
          this.turn = data.turn
        }else {
          this.$notify({
            type: 'danger',
            message: res.errmsg,
            duration:3000
          })
        }
      })
    },
    timer() {
      this.time = window.setInterval(()=> {
        this.getList()
      }, 5000);
    },
  }
}
</script>

<style scoped>
.srolle{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}
.view {
  height: 100vh;
  padding-top: 10px;
  max-width: 1200px;
  margin: 0 auto;
  /* overflow: auto; */
  box-sizing: border-box;
}
.view-wrapper{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #3399CC;
  background-size: cover;
  background-repeat: no-repeat;
}
.title{
  font-size: 36px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  margin-bottom: 10px;
}
.mtitle{
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  text-align: center;
}
.list{
  padding-top: 10px;
}
.table{
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 22px;
  border-collapse: collapse;
}
.table thead th{
  padding: 6px 0;
  background-color:#6fa3d0;
}
.table .num {
  width: 80px;
}
.table th,.table td{
  padding: 2px 20px;
}
.table tbody td{
  border-bottom: 1px solid #ddd;
}
.number{
  display: inline-block;
  width: 40px;
  height: 40px;
  font-size: 24px;
  font-weight: bold;
  font-style: italic;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
}
.btn-list{
  padding: 15px 10px;
}
.btn-w{
  text-align: center;
}
.btn{
  width: 120px;
  font-weight: bold;
  cursor: pointer;
}
</style>
