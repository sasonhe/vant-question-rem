<template>
  <div class="view-wrapper">
    <div class="view">
      <div class="title">竞赛活动排名</div>
      <!-- <div class="mtitle">第 1 轮</div> -->
      <div class="list">
        <table class="table">
          <thead>
            <tr>
              <th class="num">排名</th>
              <th>姓名</th>
              <th>轮次</th>
              <!-- <th>最高分</th>
              <th>最低分</th>
              <th>平均分</th> -->
              <th>总分数</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in data" :key="item.id">
              <td>
                <span class="number">{{index+1}}</span>
              </td>
              <td>{{item.urlsname}}</td>
              <td>{{item.rurns}}</td>
              <!-- <td>{{item.maxScore}}</td>
              <td>{{item.minScore}}</td>
              <td>{{item.averageScore}}</td> -->
              <td>{{item.sumScore}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      expoid:'',
      data:[]
    }
  },
  created(){
    let expoid = this.$route.query.expoid;
    if(expoid){
      this.expoid = expoid
      this.getList()
    }

  },
  methods:{
    getList(){
      let data = {
        expoId:this.expoid
      }
      this.$http.getList(data).then( res => {
        if(res.errcode === 0){
          this.data = res.data
        }
      })
    }
  }
}
</script>

<style scoped>
.view {
  height: 100vh;
  padding-top: 10px;
  max-width: 1200px;
  margin: 0 auto;
  overflow: auto;
  box-sizing: border-box;
}
.view-wrapper{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #3399CC;
}
.title{
  font-size: 36px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  margin-bottom: 10px;
}
.mtitle{
  font-size: 30px;
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
</style>
