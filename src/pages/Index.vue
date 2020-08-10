<template>
<div class="home">
  <div class="top van-hairline--bottom">
    <div class="user">
      <img class="img" :src="img" alt="">
    </div>
  </div>
  <div class="body">
    <div class="tips">
      <div>温馨提示：</div>
      <div>选择本人姓名后开始答题</div>
      <div>答题后不能修改答案，答完一题自动进入下一题</div>
    </div>
    <div class="nameList">
      <van-row gutter="10">
        <van-col span="6" class="span" v-for="item in nameList" :key="item.id">
          <div class="btn" @click="clickName(item)">
            {{item.username}}
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data(){
    return{
      img:require('@/assets/user.png'),
      name:'',//姓名
      subjectSum:0,//总题目
      subjectTime:0,//时长
      subjectOrder:null,//出题规则
      numbers:0,
      uid:'',
      nameList:[]
    }
  },
  created(){
    let uid = this.$route.query.uid;
    if(uid){
      this.uid = uid
      let data = {
        expoId:uid
      }
      this.getInfo(data)
    }

  },
  methods:{
    clickName(item){
      this.$router.push({
        path:'/toquestion',
        query:{
          expoId:item.expoId,
          uid:item.id,
          username:item.username
        }
      })
    },
    getInfo(data){
      let ts = this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      this.$http.getQuestionList(data).then(res => {
        ts.clear();
        if(res.errcode === 0){
          this.nameList = res.data;
        }else{
          this.$notify({
            type: 'danger',
            message: res.errmsg,
            duration:0
          })
        }
      }).catch(()=>{
        ts.clear();
      })
    }
  }
}
</script>

<style scoped>
.top{
  height: 180px;
  background: linear-gradient(217deg, rgb(142, 128, 59), rgba(255,0,0,0) 70.71%),
  linear-gradient(127deg, rgba(27, 105, 27, 0.8), rgba(0,255,0,0) 70.71%),
  linear-gradient(336deg, rgba(129, 129, 199, 0.8), rgba(0,0,255,0) 70.71%);
}
.user{
  width:100px;
  height: 100px;
  margin: 0 auto;
  padding-top: 40px;
}
.user .img{
  width: 100%;
  max-width: 100%;
}
.name{
  font-size: 18px;
  color: #fff;
  text-align: center;
  padding-top: 15px;
}
.btn{
  padding: 10px 2px;
  /* width: 82px; */
  background: #759b67;
  font-size: 14px;
  color: #fff;
  margin: 0 auto;
  cursor: pointer;
}
.tips{
  font-size: 14px;
  color: #9e9e9e;
  padding: 20px 10px 5px 10px;
}
.tips div{
  line-height: 20px;
}
.nameList{
  padding: 20px 10px
}
.span{
  text-align: center;
  margin-bottom: 10px;
}
</style>
