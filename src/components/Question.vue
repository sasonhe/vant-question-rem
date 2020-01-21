<template>
<div class="question">
  <van-nav-bar
  class="timer"
  :title="'倒计时 '+minutes+' : '+second"
  left-text=""
  right-text=""
  @click-left="onClickLeft"
  @click-right="onClickRight"
  fixed
  />
  <div class="-body">
    <van-swipe @change="onChange" ref="next" :loop="false">
      <van-swipe-item class="item-padding" v-for="item in data" :key="item.id">
        <div class="tags">
          <van-tag mark type="primary">{{item.type===0?"单选题":"多选题"}}</van-tag>
        </div>
        <div class="topic-title van-hairline--bottom">{{item.title}}</div>
        <div class="topic-action">
<!-- :disabled="item.disable" -->

          <van-radio-group :disabled="item.disable" v-model="item.result" v-if="item.type===0" @change="onChangeRadio($event,item)">
            <van-radio class="checked-list" v-for="(items,index) in item.answer" :name="items.name" icon-size="0.68rem" :key="items+index">

              <img
                v-if="items.checked == 1"
                class="custom-icon"
                slot="icon"
                slot-scope="props"
                :src="activeIcon"
              >
              <img
                v-else-if="items.checked == 2"
                class="custom-icon"
                slot="icon"
                slot-scope="props"
                :src="erractiveIcon"
              >
              <img
                v-else
                class="custom-icon"
                slot="icon"
                slot-scope="props"
                :src="inactiveIcon"
              >
              {{caseType[index]+'.'+items.name}}
            </van-radio>
          </van-radio-group>

          <van-checkbox-group :disabled="item.disable" v-model="item.result" v-else>
            <van-checkbox class="checked-list" v-for="(items,index) in item.answer" :name="items.name" icon-size="0.68rem" :key="items+index">
              <img
                v-if="items.checked == 1"
                class="custom-icon"
                slot="icon"
                slot-scope="props"
                :src="activeIcon"
              >

              <img
                v-else-if="items.checked == 2"
                class="custom-icon"
                slot="icon"
                slot-scope="props"
                :src="erractiveIcon"
              >

              <img
                v-else
                class="custom-icon"
                slot="icon"
                slot-scope="props"
                :src="props.checked ? activeIcon : inactiveIcon"
              >
              {{caseType[index]+'.'+items.name}}
            </van-checkbox>
          </van-checkbox-group>

          <div style="padding:20px;" v-if="item.type===1">
            <van-button type="info" round size="normal" :disabled="item.result.length>=2?false:true" block v-on:click="clickResult(item)">确定</van-button>
          </div>
        </div>
      </van-swipe-item>

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
        <span class="icon-text">{{error}}</span>
      </span>
      <span>
        <van-icon class="icon-custon" name="passed" color="#07c160" />
        <span class="icon-text">{{right}}</span>
      </span>
    </van-tabbar-item>
    <van-tabbar-item>
      <van-icon class="icon-custon" name="share" />
      <span class="icon-text">{{current+1}}/{{data.length}}</span>
    </van-tabbar-item>
  </van-tabbar>

</div>
</template>

<script>
export default {
  data() {
    return {
      right:0,
      error:0,
      activeIcon: require('@/assets/icon/radiobutton.png'),
      inactiveIcon: require('@/assets/icon/radiooff.png'),
      erractiveIcon: require('@/assets/icon/cuowu-tianchong.png'),
      active:'null',
      radio:1,
      result:[],
      current: 0,
      minutes: 60, //分
      seconds: 0, //秒
      caseType:["A","B","C","D","E","F"],
      data:[
        {
          id:2,
          title:'有赞前端团队是由一群年轻、皮实、对技术饱含热情的小伙伴组成的，目前共有 100 多名前端工程师，分布在业务中台、电商、零售、美业、资产、赋能等业务线。2',
          type:1,
          result:[],
          checked:["多选题3","多选题4"],
          disable:false,
          answer:[
            {
              name:'多选题1',
              checked:0
            },
            {
              name:'多选题2',
              checked:0
            },
            {
              name:'多选题3',
              checked:0
            },
            {
              name:'多选题4',
              checked:0
            }
          ]
        },
        {
          id:0,
          title:'有赞前端团队是由一群年轻、皮实、对技术饱含热情的小伙伴组成的，目前共有 100 多名前端工程师，分布在业务中台、电商、零售、美业、资产、赋能等业务线。0',
          type:0,
          result:[],
          checked:'单选题 1',
          disable:false,
          answer:[
            {
              name:'单选题 1',
              checked:0
            },
            {
              name:'单选题 2',
              checked:0
            },
            {
              name:'单选题 3',
              checked:0
            },
            {
              name:'单选题 4',
              checked:0
            }
          ]
        },
        {
          id:1,
          title:'有赞前端团队是由一群年轻、皮实、对技术饱含热情的小伙伴组成的，目前共有 100 多名前端工程师，分布在业务中台、电商、零售、美业、资产、赋能等业务线。1',
          type:0,
          result:[],
          checked:'单选题 2',
          disable:false,
          answer:[
            {
              name:'单选题 1',
              checked:0
            },
            {
              name:'单选题 2',
              checked:0
            },
            {
              name:'单选题 3',
              checked:0
            },
            {
              name:'单选题 4',
              checked:0
            }
          ]
        },
        {
          id:6,
          title:'有赞前端团队是由一群年轻、皮实、对技术饱含热情的小伙伴组成的，目前共有 100 多名前端工程师，分布在业务中台、电商、零售、美业、资产、赋能等业务线。1',
          type:0,
          result:[],
          checked:'单选题 6',
          disable:false,
          answer:[
            {
              name:'单选题 1',
              checked:0
            },
            {
              name:'单选题 2',
              checked:0
            },
            {
              name:'单选题 6',
              checked:0
            },
            {
              name:'单选题 4',
              checked:0
            }
          ]
        },
        {
          id:3,
          title:'有赞前端团队是由一群年轻、皮实、对技术饱含热情的小伙伴组成的，目前共有 100 多名前端工程师，分布在业务中台、电商、零售、美业、资产、赋能等业务线。3',
          type:0,
          result:[],
          disable:false,
          answer:[
            {
              name:'单选题 1',
              checked:0
            },
            {
              name:'单选题 2',
              checked:0
            },
            {
              name:'单选题 3',
              checked:0
            },
            {
              name:'单选题 4',
              checked:0
            }
          ]
        },
        {
          id:4,
          title:'有赞前端团队是由一群年轻、皮实、对技术饱含热情的小伙伴组成的，目前共有 100 多名前端工程师，分布在业务中台、电商、零售、美业、资产、赋能等业务线。4',
          type:1,
          result:[],
          checked:["多选题1","多选题3","多选题2"],
          disable:false,
          answer:[
            {
              name:'多选题1',
              checked:0
            },
            {
              name:'多选题2',
              checked:0
            },
            {
              name:'多选题3',
              checked:0
            },
            {
              name:'多选题4',
              checked:0
            }
          ]
        }
      ]
    }
  },
  methods: {
    clickResult(data){
      if (data.disable) {
        return
      }
      setTimeout(_=>{
        this.$refs.next.next();
      },500)
      data.disable = true;
      let {result,checked,answer} = data;

      checked.filter((v,i,arr)=>{
        answer.forEach(el=>{
          if (el.name === v) {
            el.checked = 1;
          }
        })
      })
      let newArr = result.concat(checked);
      checked.filter((v,i,arr)=>{
        newArr.filter((el,index,ags)=>{
          if (v === el) {
            newArr.splice(index,1,'item')
          }
        })
      })
      newArr.forEach(el=>{
        answer.forEach(item=>{
          if (el === item.name) {
            item.checked = 2;
          }
        })
      })
      let i = 0
      while (answer[i]){
        if (answer[i].checked==2) {
          this.error+=1;
          return
        }
        i++
      }
      this.right+=1;
    },

    onChangeRadio(e,item){

      item.disable = true;
      if(e == item.checked){
        this.right+=1;
      }
      item.answer.forEach(el=>{

        if(el.name == item.checked){
          el.checked = 1;
        }
        if(e == el.name && e !== item.checked){
          el.checked = 2;
          this.error+=1;
        }
      })
      setTimeout(_=>{
        this.$refs.next.next();
      },500)
    },
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
        console.log(this.data);
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
  font-size: 20px;
  line-height: 42px;
  vertical-align: top;
}
.icon-text{
  display: inline-block;
  line-height: 42px;
  vertical-align: top;
  font-size: 16px;
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
  margin: 15px 0;
  font-size: 18px;
}
.topic-title{
  padding: 10px 0;
  font-size: 16px;
  margin-bottom: 15px;
  text-align: justify;
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
  overflow: auto;
}
/deep/ .van-radio__label,/deep/ .van-checkbox__label{
  display: inline-block;
    height: .68rem;
    line-height: .68rem;
    font-size: 16px;
}
/deep/ .van-radio__icon--disabled .van-icon {
    background-color: transparent;
    border-color: #c8c9cc;
}
/deep/ .van-radio__label--disabled {
    color: #323233;
}
.custom-icon{
  height: 0.68rem;
}
/deep/ .van-checkbox__label--disabled {
    color: #323233;
}
</style>
