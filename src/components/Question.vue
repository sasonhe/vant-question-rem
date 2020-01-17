<template>
<div class="question">
  <van-nav-bar
  class="timer"
  :title="'倒计时 '+minutes+' : '+second"
  left-text=""
  right-text=""
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
  fixed
  />
  <div class="-body">
    <van-swipe @change="onChange">
      <van-swipe-item class="item-padding">
        <div class="tags">
          <van-tag mark type="primary">单选题</van-tag>
        </div>
        <div class="topic-title van-hairline--bottom">
          在变(配)电站、发电厂、电力线路等场所的( )工作，应同时遵守《国家电网公司电力安全工作规程》的变电、配电、线路等相应部分。
        </div>
        <div class="topic-action">
          <van-radio-group v-model="radio">
            <van-radio class="checked-list" name="1" icon-size="24px">A.单选框 1</van-radio>
            <van-radio class="checked-list" name="2" icon-size="24px">B.单选框 2</van-radio>
            <van-radio class="checked-list" name="3" icon-size="24px">C.单选框 3</van-radio>
            <van-radio class="checked-list" name="4" icon-size="24px">D.单选框 4</van-radio>
          </van-radio-group>
        </div>
      </van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>

      <div class="custom-indicator" slot="indicator"></div>
    </van-swipe>



  </div>
  <van-tabbar v-model="active" active-color="#646566">
    <van-tabbar-item @click="onClickRight()">
      <van-icon class="icon-custon" name="notes-o" color="#07c160" />
      <span class="icon-text">交卷</span>
    </van-tabbar-item>
    <van-tabbar-item>
      <span class="num-text">
        <van-icon class="icon-custon" name="close" color="red" />
        <span class="icon-text">0</span>
      </span>
      <span>
        <van-icon class="icon-custon" name="passed" color="#07c160" />
        <span class="icon-text">0</span>
      </span>
    </van-tabbar-item>
    <van-tabbar-item>
      <van-icon class="icon-custon" name="share" />
      <span class="icon-text">{{current+1}}/100</span>
    </van-tabbar-item>
  </van-tabbar>

</div>
</template>

<script>
export default {
  data() {
    return {
      active:'null',
      radio:1,
      current: 0,
      minutes: 60, //分
      seconds: 0, //秒
    }
  } ,
  methods: {
    onChange(index) {
      this.current = index;
    },
    onClickLeft(){
      this.$dialog.confirm({
        title: '温馨提示',
        message: '操作未完成！是否继续？',
        confirmButtonText:'返回首页',
        confirmButtonColor:'red',
        cancelButtonText:'继续操作'
      }).then(() => {
        // on confirm
        this.$router.push('/')
      }).catch(() => {
        // on cancel
      });
    },
    onClickRight(){
      this.$dialog.confirm({
        title: '温馨提示',
        message: '您确定要提交吗？',
        confirmButtonText:'提交',
        cancelButtonText:'取消'
      }).then(() => {
        // on confirm

      }).catch(() => {
        // on cancel
      });
    },
    // 倒计时
    num(n) {
      // 倒计时结束重新刷新页面
      if (this.minutes === 0 && this.seconds === 2) {
        this.$message.warning('支付倒计时结束!即将刷新页面!');
      }
      if (this.minutes === 0 && this.seconds === 0) {
        window.location.reload();
      }
      return n < 10 ? '0' + n : '' + n;
    },
    // 倒计时
    timer() {
      var _this = this;
      var time = window.setInterval(function() {
        if (_this.seconds === 0 && _this.minutes !== 0) {
          _this.seconds = 59;
          _this.minutes -= 1;
        } else if (_this.minutes === 0 && _this.seconds === 0) {
          _this.seconds = 0;
          window.clearInterval(time);
        } else {
          _this.seconds -= 1;
        }
      }, 1000);
    },
  },
  mounted() {
    // 倒计时
    this.timer();
  },
  watch: {
    // 倒计时
    second: {
      handler(newVal) {
        this.num(newVal);
      },
    },
    // 倒计时
    minute: {
      handler(newVal) {
        this.num(newVal);
      },
    },
  },
  computed: {
    // 倒计时
    second: function() {
      return this.num(this.seconds);
    },
    minute: function() {
      return this.num(this.minutes);
    },
  },
}



</script>

<style scoped>
.timer .van-nav-bar__title{
  font-size: 14px;
  font-weight: 400;
  color: #1989fa;
}
.icon-custon{
  min-width: 1em;
  font-size: 16px;
  line-height: 42px;
  vertical-align: top;
}
.icon-text{
  display: inline-block;
  line-height: 42px;
  vertical-align: top;
}
.num-text{
  display: inline-block;
  margin-right: 10px;
}
.body{
  font-size: 14px;
  height:100%;
  height: 100vh;
  padding-top: 48px;
  padding-bottom: 48px;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing:border-box;
}
.tags{
  font-size: 0;
  padding: 4px 0;
}
.checked-list{
  padding: 8px 0;
  font-size: 18px;
}
.topic-title{
  padding: 10px 0;
  font-size: 18px;
  margin-bottom: 15px;
}
.van-swipe{
  font-size: 14px;
  height:100%;
  height: 100vh;
  padding-top: 48px;
  padding-bottom: 48px;
  box-sizing:border-box;
}
.item-padding{
  padding: 0 15px;
  box-sizing: border-box;
}
</style>
