<template>
<div class="home">
  <div class="top">
    <van-radio-group v-model="radio">
  <van-radio name="1">
    单选框 1
    <img
      slot="icon"
      slot-scope="props"
      :src="props.checked ? activeIcon : inactiveIcon"
    >
  </van-radio>
  <van-radio name="2">
    单选框 2
    <img
      slot="icon"
      slot-scope="props"
      :src="props.checked ? activeIcon : inactiveIcon"
    >
  </van-radio>
</van-radio-group>
  </div>
  <div class="body">

  </div>
</div>
</template>

<script>
export default {
  data(){
    return{
      radio:"1",
      activeIcon: 'https://img.yzcdn.cn/vant/user-active.png',
    inactiveIcon: 'https://img.yzcdn.cn/vant/user-inactive.png'
    }
  }
}
</script>

<style scoped>
</style>
