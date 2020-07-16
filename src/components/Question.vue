<template>
  <!-- :title="'倒计时 '+minutes+' : '+second" -->
<div class="question">
  <van-nav-bar
  class="timer"
  :title="'倒计时 '+minutes+' : '+second"
  :left-text="name"
  :right-text="fractions+'分'"
  fixed
  />
  <div class="-body">
    <van-swipe @change="onChange" ref="next" :loop="false">
      <van-swipe-item class="item-padding" v-for="(item,index) in dataList" :key="item.id">
        <div class="tags">
          <van-tag mark type="primary">{{item.anType===1?"单选题":"多选题"}}</van-tag>
        </div>
        <div class="topic-title van-hairline--bottom">
          <span class="numIndex">{{index+1}}.</span>
          {{item.anName}}
        </div>
        <div class="topic-action">
          <van-radio-group :disabled="item.disable" v-model="item.result" v-if="item.anType===1">
            <van-radio class="checked-list" :disabled="item.disable" v-for="(items,index) in item.childList" :name="items.flag" icon-size="0.68rem" :key="items.id" @click="checkedRadio($event,item,items,items.flag)">
              {{items.flag}}
              <template #icon="props">
                <img class="custom-icon" v-if="items.checked == 1" :src="activeIcon" />
                <img class="custom-icon" v-else-if="items.checked == 2" :src="erractiveIcon" />
                <img class="custom-icon" v-else :src="inactiveIcon" />
              </template>
            </van-radio>
          </van-radio-group>

          <van-checkbox-group :disabled="item.disable" v-model="item.result" v-else>
            <van-checkbox class="checked-list" v-for="(items,index) in item.childList" :name="items.flag" icon-size="0.68rem" :key="items.id">
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
              {{items.flag}}
            </van-checkbox>
          </van-checkbox-group>

          <div style="padding:20px;" v-if="item.anType===2">
            <van-button type="info" round size="normal" :disabled="item.result.length>=2?false:true" block v-on:click="clickResult(item,2)">确定</van-button>
          </div>
          <div style="padding:20px;" v-if="item.anType===1">
            <van-button type="info" round size="normal" :disabled="item.result.length === 0 || item.disable" block v-on:click="clickResult(item,1)">确定</van-button>
          </div>
        </div>
      </van-swipe-item>

      <div class="custom-indicator" slot="indicator"></div>
    </van-swipe>



  </div>
  <van-tabbar v-model="active" class="tabbar" active-color="#646566">
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
      <span class="icon-text">{{current+1}}/{{dataList.length}}</span>
    </van-tabbar-item>
  </van-tabbar>

</div>
</template>

<script>
export default {
  data() {
    return {
      awaitTimer:null,
      time:null,
      longTime:null,
      dataList:[],
      fractions:0,
      name:'',
      userId:'',
      turn:'',
      expoId:'',
      uid:'',
      right:0,
      error:0,
      activeIcon: require('@/assets/icon/radiobutton.png'),
      inactiveIcon: require('@/assets/icon/radiooff.png'),
      erractiveIcon: require('@/assets/icon/cuowu-tianchong.png'),
      active:'null',
      radio:1,
      result:[],
      current: 0,
      minutes: '', //分
      seconds: 0, //秒
      caseType:["A","B","C","D","E","F"],
      data:[
        {
          id:2,
          title:'有赞前端团队是由一群年轻、皮实、对技术饱含热情的小伙伴组成的，目前共有 100 多名前端工程师，分布在业务中台、电商、零售、美业、资产、赋能等业务线。C、D',
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
          title:'有赞前端团队是由一群年轻、皮实、对技术饱含热情的小伙伴组成的，目前共有 100 多名前端工程师，分布在业务中台、电商、零售、美业、资产、赋能等业务线。A',
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
          title:'有赞前端团队是由一群年轻、皮实、对技术饱含热情的小伙伴组成的，目前共有 100 多名前端工程师，分布在业务中台、电商、零售、美业、资产、赋能等业务线。B',
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
          title:'有赞前端团队是由一群年轻、皮实、对技术饱含热情的小伙伴组成的，目前共有 100 多名前端工程师，分布在业务中台、电商、零售、美业、资产、赋能等业务线。C',
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
          title:'有赞前端团队是由一群年轻、皮实、对技术饱含热情的小伙伴组成的，目前共有 100 多名前端工程师，分布在业务中台、电商、零售、美业、资产、赋能等业务线。D',
          type:0,
          result:[],
          checked:'单选题 4',
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
          title:'有赞前端团队是由一群年轻、皮实、对技术饱含热情的小伙伴组成的，目前共有 100 多名前端工程师，分布在业务中台、电商、零售、美业、资产、赋能等业务线。A、B、C',
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
  created(){
    let expoId = this.$route.query.expoId;
    let uid = this.$route.query.uid;
    let username = this.$route.query.username;
    if(uid && expoId && username){
      this.uid = uid
      this.expoId = expoId
      this.username = username
      let data = {
        expoId:expoId,
        uid:uid,
        username:username
      }
      this.getInfo(data)
    }
  },
  methods: {
    checkedRadio(e,item,items,flag){
      if(item.disable) return
      item.childList.forEach(el=>{
        el.checked = 0
      })
      items.checked = 1
    },
    // 单选处理
    radioClick(data){
      console.log(data);
      data.disable = true;
      data.childList.forEach(el=>{

        // 给选对的计分
        if(el.checked === 1 && el.flag === data.checked) {
          this.right+=1;
          this.fractions += parseInt(data.fractions)
        }
        // 给选错的项打 X
        if(el.checked === 1 && el.flag !== data.checked) {
          this.error+=1;
          el.checked = 2;
        }
        // 给正确的那一项打勾
        if(el.flag === data.checked) {
          el.checked = 1;
        }

      })
      setTimeout(_=>{
        this.$refs.next.next();
      },500)
      if(this.current === this.dataList.length -1){
        setTimeout(_=>{
          this.$dialog.confirm({
            title: '温馨提示',
            message: '当前已是最后一题，答完请交卷',
            confirmButtonText:'交卷',
            cancelButtonText:'继续答题',

          }).then(() => {
            // on confirm
            this.submit()
          }).catch(() => {
            // on cancel
          });
        },1000)
      }
    },
    // 多选处理
    checkboxClick(data){
      if(this.current === this.dataList.length -1){
        setTimeout(_=>{
          this.$dialog.confirm({
            title: '温馨提示',
            message: '当前已是最后一题，答完请交卷',
            confirmButtonText:'交卷',
            cancelButtonText:'继续答题'
          }).then(() => {
            // on confirm
            this.submit()
          }).catch(() => {
            // on cancel
          });
        },1000)
      }
      if (data.disable) {
        return
      }
      setTimeout(_=>{
        this.$refs.next.next();
      },500)
      data.disable = true;
      let {result,checked,childList,fractions} = data;
      checked.filter((v,i,arr)=>{
        childList.forEach(el=>{
          if (el.flag === v) {
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
        childList.forEach(item=>{
          if (el === item.flag) {
            item.checked = 2;
          }
        })
      })
      let i = 0
      while (childList[i]){
        if (childList[i].checked==2) {
          this.error+=1;
          return
        }
        i++
      }
      this.fractions += parseInt(fractions)
      this.right+=1;
    },
    getInfo(data){
      return this.$http.findSwer(data).then(res => {
        if(res.errcode === 0){
          let data = res.data;
          let userId = res.userId;//选手ID
          let numbers = res.numbers;//轮数
          let expoId = res.expoId;//活动ID
          let name = res.name;//选手姓名
          if(res.data && res.data[0].ruleId){
            let s = res.data[0].ruleId
            //计算分钟
            //算法：将秒数除以60，然后下舍入，既得到分钟数
            let h;
            h  =   Math.floor(s/60);
            //计算秒
            //算法：取得秒%60的余数，既得到秒数
            s  =   s%60;
            this.minutes = h //倒计时
            this.seconds = s
            this.longTime = res.data[0].ruleId //总时长（秒)
          }

          this.userId = userId
          this.numbers = numbers
          this.name = name
          this.expoId = expoId
          data.forEach((item,index,ary) => {
            item.result = []
            item.disable = false;
            let trueAnswer = item.trueAnswer;
            if(item.anType === 1) {
              //单选
              item.checked = ''
              item.childList.forEach(el => {
                el.checked = 0;
                let ans = el.flag;
                if(ans.indexOf(trueAnswer) != -1){
                  item.checked = ans
                }
              })
            }
            if(item.anType === 2) {
              //复选
              item.checked = []
              item.childList.forEach(el => {
                el.checked = 0;
                let ans = el.flag;
                let ary = trueAnswer.split('')
                ary.forEach(v=>{
                  if(ans.indexOf(v) != -1){
                    item.checked.push(ans)
                  }
                })
              })
            }
          })
          this.dataList = data
          window.clearInterval(this.time);
          // 倒计时
          setTimeout(()=>{
            this.$dialog.alert({
              message: '题目已加载，请点击确认开始答题',
            }).then(() => {
              this.timer();
            },2000);
          })
        }else{
          this.$notify({
            type: 'danger',
            message: res.errmsg,
            duration:8000,
          })
          this.awaitFn();
        }
        return res
      })
    },
    awaitFn(){
      this.$dialog.confirm({
        title: '提示',
        message: '活动暂未启动，可点击刷新查看是否开启',
        // overlay:false,
        overlayStyle:{
          // background: 'rgba(0, 0, 0, 0.32)',
          zIndex:1990
        },
        showCancelButton:false,
        confirmButtonText:'刷新',
        beforeClose:(action, done) =>{
        if (action === 'confirm') {
          let data = {
            expoId:this.expoId,
            uid:this.uid,
            username:this.username
          }
          this.getInfo(data).then(res => {
            if(res.errcode === 0){
              done()
            }else{
              done(false)
            }
          }).catch(()=>{
            done(false)
          })
          // setTimeout(done, 1000);
        } else {
          done();
        }
      },
      });
      return
      window.clearInterval(this.awaitTimer)
      this.awaitTimer = setInterval(()=>{
        let data = {
          expoId:this.expoId,
          uid:this.uid,
          username:this.username
        }
        this.$http.findSwer(data).then(res =>  {
          if(res.errcode === 0) {
            window.clearInterval(this.awaitTimer);
            this.wait.clear();
            this.getInfo(data)
          }
        })
      },5000)
    },
    clickResult(data,type){
      if(type === 1) {
        //radio
        this.radioClick(data)
      }
      if(type === 2) {
        //checkbox
        this.checkboxClick(data)
      }
    },

    onChangeRadio(e,item){
      console.log(e);
      console.log(item);
      /*
      item.disable = true;
      if(e == item.checked){
        this.right+=1;
        this.fractions += parseInt(item.fractions)
      }
      item.childList.forEach(el=>{

        if(el.flag == item.checked){
          el.checked = 1;
        }
        if(e == el.flag && e !== item.checked){
          el.checked = 2;
          this.error+=1;
        }
      })
      setTimeout(_=>{
        this.$refs.next.next();
      },500)
      if(this.current === this.dataList.length -1){
        setTimeout(_=>{
          this.$dialog.confirm({
            title: '温馨提示',
            message: '当前已是最后一题，答完请交卷',
            confirmButtonText:'交卷',
            cancelButtonText:'继续答题',

          }).then(() => {
            // on confirm
            this.submit()
          }).catch(() => {
            // on cancel
          });
        },1000)
      }
      */
    },
    submit(){
      let longTime = this.longTime - (this.minutes * 60 + this.seconds)
      let str = ''
      this.dataList.forEach((item, index) => {
        let num = index + 1
        str += `${num}.${item.anName} `
        if(item.anType === 1){
          str += `${item.result}  `
        }
        if(item.anType === 2){
          item.result.forEach((el, i) => {
            str += `${el}  `
          })
        }
      })
      let data = {
        id:this.userId,
        turn:this.numbers,
        name:this.name,
        expoId:this.expoId,
        sumScore:this.fractions,
        longTime:longTime,
        ruleId:str
      }
      this.$http.insertScore(data).then(res => {
        if(res.errcode === 0){
          this.$router.push({
            path:`/success/${this.name}/${this.fractions}/${longTime}`,
            query:{
              uid:this.uid,
              expoId:this.expoId,
              turn:this.numbers,
            }
          })
        }else{
          this.$notify({
            type: 'danger',
            message: res.errmsg,
            duration:8000
          })
        }
      })

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
        this.submit()
      }).catch(() => {
        // on cancel
      });
    },
    // 倒计时
    num(n) {
      // 倒计时
      return n < 10 ? '0' + n : '' + n;
    },
    // 倒计时
    timer() {
      var _this = this;
      _this.time = window.setInterval(function() {
        if (_this.seconds === 0 && _this.minutes !== 0) {
          _this.seconds = 59;
          _this.minutes -= 1;
        } else if (_this.minutes === 0 && _this.seconds === 0) {
          _this.seconds = 0;
          window.clearInterval(_this.time);
        } else {
          _this.seconds -= 1;
        }
      }, 1000);
    },
  },
  mounted() {

  },
  watch: {
    // 倒计时
    second: {
      handler(newVal) {
        if (this.minutes === 0 && this.seconds === 2) {
          this.$toast({
            message:'时间到，提交结束答题',
            duration:3000,
            position:'top',
          });
        }
        if (this.minutes === 0 && this.seconds === 0) {
          this.submit()
        }
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
.timer{
  max-width: 1024px;
  left: auto;
}
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
.tabbar{
  max-width: 1024px;
  left: auto;
}
.numIndex{
  display: inline-block;

}
</style>
