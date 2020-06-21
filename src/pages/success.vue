<template>
<div class="home">
  <div class="top van-hairline--bottom">
    <div class="user">
      <img class="img" :src="img" alt="">
    </div>
    <div class="name">
      {{(name)}}
    </div>
  </div>
  <div class="body">

    <div class="tips">
      数据提交成功! 用时：{{time}}秒
    </div>
    <div class="btn-warpper">
      <div class="btn">{{(fractions)}}分</div>
    </div>
    <div class="next">
      <van-button size="large" color="#759b67"  type="primary" @click="next()">下一轮</van-button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props:{
    name:{
      type:String,
      default:'---'
    },
    fractions:{
      type:String,
      default:'0'
    },
    time:{
      type:String,
      default:'0'
    }
  },
  data(){
    return{
      img:require('@/assets/user.png'),
      expoId:null,
      turn:null,
      uid:null
    }
  },
  created(){
    let expoId = this.$route.query.expoId;
    let turn = this.$route.query.turn;
    let uid = this.$route.query.uid;
    if(expoId && turn){
      this.turn = turn;
      this.expoId = expoId;
      this.uid = uid;
    }
  },
  methods:{
    next(){
      let data = {
        expoId:this.expoId,
        uid:this.uid,
        username:this.name,
        turn:parseInt(this.turn) + 1
      }
      this.$http.findNext(data).then(res => {
        if(res.errcode === 0){
          this.$router.push({
            path:'/toquestion',
            query:{
              expoId:res.expoId,
              uid:res.userId,
              username:res.name
            }
          })
        }else{
          this.$notify({
            type: 'danger',
            message: res.errmsg,
            duration:5000
          })
        }
      })
    },
    /**
     * 将秒转换为 分:秒
     * s int 秒数
    */
    s_to_hs(s){
        //计算分钟
        //算法：将秒数除以60，然后下舍入，既得到分钟数
        var h;
        h  =   Math.floor(s/60);
        //计算秒
        //算法：取得秒%60的余数，既得到秒数
        s  =   s%60;
        //将变量转换为字符串
        h    +=    '';
        s    +=    '';
        //如果只有一位数，前面增加一个0
        h  =   (h.length==1)?'0'+h:h;
        s  =   (s.length==1)?'0'+s:s;
        return h+':'+s;
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
  padding-top: 20px;
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
.btn-warpper{
  margin-top: 20px;
  margin-bottom: 20px;
}
.btn{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #759b67;
  font-size: 18px;
  line-height: 100px;
  text-align: center;
  font-weight: bold;
  color: #fff;
  margin: 0 auto;
  cursor: pointer;
}
.tips{
  font-size: 18px;
  color: #9e9e9e;
  text-align: center;
  padding: 20px 15px;
}
.next{
  width: 320px;
  margin:0 auto;
  padding: 6px 0;
}
</style>
