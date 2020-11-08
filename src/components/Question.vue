<template>
<div class="question">
  <!-- :title="`题/秒 倒计时 ${timeNum}`"   :right-text="fractions+'分'" -->
  <van-nav-bar
  class="timer"

  :left-text="username"
  :right-text="`第 ${numbers} 轮`"
  fixed
  />
  <div class="-body">
    <van-swipe @change="onChange" ref="next" :loop="false">
      <van-swipe-item class="item-padding" v-for="(item,index) in dataList" :key="item.id">
        <div class="tags">
          <van-tag mark type="primary">{{item.anType===1?"单选题":"多选题"}}</van-tag>
        </div>
        <div class="topic-title van-hairline--bottom">
          <!-- <span class="numIndex">{{index+1}}.</span> -->
          {{item.anName}}
        </div>
        <div class="topic-action" style="position:relative;">
          <van-radio-group :disabled="item.disable || item.ruleId ===0" v-model="item.result" v-if="item.anType===1">
            <van-radio class="checked-list" :disabled="item.disable || item.ruleId ===0" v-for="(items,index) in item.childList" :name="items.flag" icon-size="0.68rem" :key="items.id" @click="checkedRadio($event,item,items,items.flag)">
              {{items.flag}}
              <template #icon="props">
                <img class="custom-icon" v-if="items.checked == 1" :src="activeIcon" />
                <img class="custom-icon" v-else-if="items.checked == 2" :src="erractiveIcon" />
                <img class="custom-icon" v-else :src="inactiveIcon" />
              </template>
            </van-radio>
          </van-radio-group>

          <van-checkbox-group :disabled="item.disable || item.ruleId ===0" v-model="item.result" v-else>
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

          <div class="ok-box" v-if="item.disable">
            <div class="one-box">
              <div class="box-item-width">当前选择：</div>
              <div class="box-item">{{item.result}}</div>
            </div>
            <div class="one-box box-success">
              <div class="box-item-width">正确答案：</div>
              <div class="box-item">{{item.checked}}</div>
            </div>
          </div>

          <div style="padding:20px;" v-if="item.anType===2">
            <van-button type="info" round size="normal" :disabled="item.result.length>=2?false:true || item.ruleId ===0" block v-on:click="clickResult(item,2)">确定</van-button>
          </div>
          <div style="padding:20px;" v-if="item.anType===1">
            <van-button type="info" round size="normal" :disabled="item.result.length === 0 || item.disable || item.ruleId ===0" block v-on:click="clickResult(item,1)">确定</van-button>
          </div>

          <div class="status-img" v-if="item.disable">
            <img class="status-item" v-if="item.select == 1" :src="okImg" />
            <img class="status-item" v-else-if="item.select == 2" :src="errorImg" />
            <img class="status-item" v-else :src="timeoutImg" />
          </div>

        </div>
      </van-swipe-item>
      <div class="custom-indicator" slot="indicator"></div>

    </van-swipe>



  </div>
  <!-- <van-tabbar v-model="active" class="tabbar" active-color="#646566">
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
    <van-tabbar-item  @click="showpopup = !showpopup">
      <van-icon class="icon-custon" name="share" />
      <span class="icon-text">{{current+1}}/{{dataList.length}}</span>
    </van-tabbar-item>
  </van-tabbar> -->

</div>
</template>

<script>
export default {
  data() {
    return {
      stimer:null,
      dlogs:null,
      waits:null,
      numbers:0,
      showpopup:false,
      secondTime:0,
      actived:null,
      awaitTimer:null,
      time:null,
      longTime:null,
      dataList:[],
      fractions:0,
      name:'',
      username:'',
      userId:'',
      turn:'',
      expoId:'',
      uid:'',
      right:0,
      error:0,
      activeIcon: require('@/assets/icon/radiobutton.png'),
      inactiveIcon: require('@/assets/icon/radiooff.png'),
      erractiveIcon: require('@/assets/icon/cuowu-tianchong.png'),
      okImg: require('@/assets/statusimg/ok.png'),
      errorImg: require('@/assets/statusimg/error.png'),
      timeoutImg: require('@/assets/statusimg/timeout.png'),
      active:'null',
      radio:1,
      result:[],
      current: 0,
      minutes: '', //分
      seconds: 0, //秒
      caseType:["A","B","C","D","E","F"]
    }
  },
  mounted(){
    Array.prototype.diff = function(a) {
      return this.filter(function(i) {return a.indexOf(i) < 0;});
    };

  },
  async created(){
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
      await this.getInfo(data)
      this.startNext()

    }
  },
  destroyed(){
    if(this.stimernext){
      window.clearInterval(this.stimernext);
    }
    if(this.stimer){
      window.clearInterval(this.stimer);
    }
  },
  methods: {
    // 多选判断
    getResult(checked,isTrue) {
       let result = false;
       let cLen = checked.length;
       let iLen = isTrue.length;
       try {
         if(cLen === iLen){
          checked.forEach((item,index) => {
            if(isTrue.includes(item)) {
             result = true
            }else {
             result = false
             throw new Error("ending");
            }
          })
          // return result
         }
       } catch (e) {
         result = false
       }
       return result
     },
    // 数组差值
    subSet(arr1, arr2) {
      var len = arr1.length;
      var arr = [];

      while (len--) {
        if (arr2.indexOf(arr1[len]) < 0) {
            arr.push(arr1[len]);
        }
      }
      return arr;
    },
    checkedRadio(e,item,items,flag){
      if(item.disable) return
      item.childList.forEach(el=>{
        el.checked = 0
      })
      items.checked = 1
    },
    // 单选处理
    radioClick(data){

      this.$dialog.confirm({
        title: '温馨提示',
        message: '确定要提交答案吗？',
        confirmButtonText:'提交',
        cancelButtonText:'继续答题',

      }).then(() => {
        //调用保存接口
        // data.disable = true;
        data.childList.forEach(el=>{

          // 给选对的计分
          if(el.checked === 1 && el.flag === data.checked) {
            this.right+=1;
            // this.fractions += parseInt(data.fractions)
            this.fractions = parseInt(data.fractions)
            data.select = 1
          }

          /*
          // 给选错的项打 X
          if(el.checked === 1 && el.flag !== data.checked) {
            this.error+=1;
            el.checked = 2;
            data.select = 2
          }
          // 给正确的那一项打勾
          if(el.flag === data.checked) {
            el.checked = 1;
          }
           */


        })
        this.submit().then(res => {
          if(res){
            data.disable = true;
            data.childList.forEach(el=>{

              // 给选错的项打 X
              if(el.checked === 1 && el.flag !== data.checked) {
                this.error+=1;
                el.checked = 2;
                data.select = 2
              }
              // 给正确的那一项打勾
              if(el.flag === data.checked) {
                el.checked = 1;
              }


            })
          }
          /*
          this.waits = this.$toast.loading({
            message: '下一轮，等待中...',
            forbidClick: true,
            // overlay:true,
            duration:0,
            className:'waits',
            loadingType: 'spinner',
          });
           */
        })

      }).catch(() => {
        // on cancel
      });
      return
      setTimeout(_=>{
        this.$refs.next.next();
      },500)

    },
    // 多选处理
    checkboxClick(data){
      /*
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
       */
      if (data.disable) {
        return
      }
      setTimeout(_=>{
        this.$refs.next.next();
      },500)

      let {result,checked,childList,fractions} = data;
      let isTrue = this.getResult(checked,result)
      let errorAry = this.subSet(result,checked) //获取差值
      //对的加分记录
      if(isTrue) {
        // this.fractions += parseInt(fractions)
        this.fractions = parseInt(fractions)
        this.right+=1;
        data.select = 1 //标记该条数据选对
      }else{
        this.error+=1;
        data.select = 2 //标记该条数据选错
      }

      /*
      //给所有正确答案打勾
      checked.filter((v,i,arr) =>{
        childList.forEach(el =>{
          if (el.flag === v) {
            el.checked = 1;
          }
        })
      })
      //给选错的打X
      errorAry.forEach((v,i) =>{
        childList.forEach((el,index) =>{
          if(v === el.flag) {
            el.checked = 2;
          }
        })
      })
       */


      this.submit().then(res => {
        if(res){
          data.disable = true;
          //给所有正确答案打勾
          checked.filter((v,i,arr) =>{
            childList.forEach(el =>{
              if (el.flag === v) {
                el.checked = 1;
              }
            })
          })
          //给选错的打X
          errorAry.forEach((v,i) =>{
            childList.forEach((el,index) =>{
              if(v === el.flag) {
                el.checked = 2;
              }
            })
          })
        }
        /*
        this.waits = this.$toast.loading({
          message: '下一轮，等待中...',
          forbidClick: true,
          // overlay:true,
          duration:0,
          className:'waits',
          loadingType: 'spinner',
        });
         */
      })
    },
    // 监听下一轮
    nexts(){
      this.$http.nexts({expoId:this.expoId,numbers:this.numbers+1}).then(res =>{
        if(res.errcode === 0) {
          let data = {
            expoId:this.expoId,
            uid:this.uid,
            username:this.username
          }
          this.getInfo(data)

          /*
          if(this.waits){
            this.waits.clear()
          }
          if(this.stimernext){
            window.clearInterval(this.stimernext);
          }

          this.$dialog.alert({
            message: '下一轮已开启，请点击确定加载题目',
          }).then(() => {
            let data = {
              expoId:this.expoId,
              uid:this.uid,
              username:this.username
            }
            this.getInfo(data)
          });
           */

        }else if(res.errcode === -1){
          if(res.errmsg === '最后一个道题目'){
            if(this.stimernext){
              window.clearInterval(this.stimernext);
            }
            /*
            if(this.waits){
              this.waits.clear()

            }
            try {
              if(this.dialogs){
                this.dialogs.close()
              }
            } catch (e) {

            }
            this.$dialog.alert({
              message: '题目加载结束',
            }).then(() => {
              if(this.stimernext){
                window.clearInterval(this.stimernext);
              }
            });
             */


          }
        }
      })
    },
    getInfo(data){
      let waits = this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration:0,
      });
      return this.$http.findSwer(data).then(res => {
        try {
          if(this.dlogs){
            this.dlogs.close()
          }
        } catch (e) {

        }
        waits.clear()
        if(res.errcode === 0){
          let data = res.data;
          let userId = res.userId;//选手ID
          let numbers = res.numbers;//轮数
          let expoId = res.expoId;//活动ID
          // let name = res.name;//选手姓名


          this.userId = userId
          this.numbers = numbers
          // this.name = name
          this.expoId = expoId
          data.forEach((item,index,ary) => {
            item.result = []
            item.select = 3
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
          // 计时
          this.secondTime = 0;
          this.startTime()
          // 倒计时
          /*
          setTimeout(()=>{
            this.dialogs = this.$dialog.alert({
              message: '题目已加载，请点击确认开始答题',
            }).then(() => {
              this.startNext()
            });
          },500)
           */
        }else{
          this.$notify({
            type: 'danger',
            message: res.errmsg,
            duration:8000,
          })
          this.numbers = 0
          // this.awaitFn();
        }
        return res
      }).catch(err => {
        waits.clear()
      })
    },
    /*
    startTime(){
      this.stimer = window.setInterval(()=>{
        if(this.dataList[this.current].ruleId && !this.dataList[this.current].disable){
          this.dataList[this.current].ruleId --;
          this.secondTime+=1
          this.actived = this.dataList[this.current].ruleId
        }
        if(this.dataList[this.current].ruleId === 0){
          this.dataList[this.current].disable = true
          this.$refs.next.next();
        }
        if(this.dataList.length === this.current){

          window.clearInterval(this.stimer);
        }
      },1000)
    },
     */
     startTime(){
       if(this.stimer){
         window.clearInterval(this.stimer);
       }
       this.stimer = window.setInterval(()=>{
         this.secondTime+=1
       },1000)
     },
    startNext(){
      if(this.stimernext){
        window.clearInterval(this.stimernext);
      }
      this.stimernext = window.setInterval(()=>{
        this.nexts()
      },10000)
    },
    awaitFn(){
      this.dlogs = this.$dialog.confirm({
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
              try {
                if(this.dlogs){
                  this.dlogs.close()
                }
              } catch (e) {

              }
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
    },
    submit(){
      let str = ''
      this.dataList.forEach((item, index) => {
        let num = index + 1
        str += `${num}. `
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
        name:this.username,
        expoId:this.expoId,
        sumScore:this.fractions,
        longTime:this.secondTime,
        ruleId:str
      }
      let waits = this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration:0,
      });
      return this.$http.insertScore(data).then(res => {
        if(this.stimer){
          window.clearInterval(this.stimer);
        }
        this.fractions = 0
        waits.clear()
        if(res.errcode === 0){
          this.$toast({
            message:'提交成功',
            duration:3000,
            position:'top',
          });
          return true
          // this.$router.push({
          //   path:`/success/${this.username}/${this.fractions}/${this.secondTime}`,
          //   query:{
          //     uid:this.uid,
          //     expoId:this.expoId,
          //     turn:this.numbers,
          //   }
          // })
        }else{
          this.$notify({
            type: 'danger',
            message: '当前题目已停止作答或已提交',//res.errmsg,
            duration:8000
          })
          return false
        }
      }).catch(err => {
        this.fractions = 0
        waits.clear()
        this.$toast({
          message:'提交失败，请重试',
          duration:3000,
        });
      })

    },
    onChange(index) {
      if(this.stimer && this.actived === this.dataList[this.current].ruleId){
        window.clearInterval(this.stimer);
      }

      this.dataList[this.current].ruleId = this.timeNum
      this.current = index;
      if(this.dataList[this.current].ruleId !== 0){
        // window.clearInterval(this.stimer);
        // this.startTime()
      }

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
    minute: function() {
      return this.num(this.minutes);
    },
    timeNum(){
      if(this.dataList.length > 0){
        return this.dataList[this.current].ruleId
      }else{
        return 0
      }
    },
  },
}



</script>

<style scoped>
.one-box{
  display: flex;
  font-size: 12px;
  padding: 4px 0;
}
.box-success{
  color: #07c160;
}
.box-item-width{
  width: 60px;
}
.box-item {
  flex: 1;
}
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
.status-img{
  position: absolute;
  top: -30px;
  right: 0;
}
.status-item{
  width: 80px;
  transform: rotate(30deg);
}
.nameList{
  padding: 60px 10px 10px;
}
.span{
  text-align: center;
  margin-bottom: 10px;
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
</style>
