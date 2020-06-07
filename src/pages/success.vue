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
      数据提交成功
    </div>
    <div class="btn-warpper">
      <div class="btn">{{(fractions)}}分</div>
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
    }
  },
  data(){
    return{
      img:require('@/assets/user.png'),
    }
  },
  created(){

  },
  methods:{

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
</style>
