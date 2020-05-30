<template>
<div class="home">
  <div class="top van-hairline--bottom">
    <div class="user">
      <img class="img" :src="img" alt="">
    </div>
    <div class="name">
      某某某
    </div>
  </div>
  <div class="body">
    <van-cell-group>
      <van-cell title="答题类型" value="单选/多选" />
      <van-cell title="答题规则" value="100题，45分钟" />
      <van-cell title="排名规则" value="按分排序" />
      <van-cell title="出题规则" value="随机分配" />
    </van-cell-group>
    <div class="tips">
      温馨提示：答题后不能修改答案，答完一题自动进入下一题，答题时间结束自动提交
    </div>
    <div class="btn-warpper">
      <div class="btn" @click="enter">开始答题</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data(){
    return{
      img:require('@/assets/user.png'),
    }
  },
  methods:{
    enter(){
      this.$router.push({
        path:'/toquestion'
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
  font-size: 14px;
  color: #9e9e9e;
  padding: 20px 15px;
}
</style>
