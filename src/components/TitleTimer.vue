<template>
  <div class="title-timer">
    <div class="num"><span style="color:#E74A41">{{remainSecond}}</span></div>
    <div class="div"><span>秒</span><span>倒计时</span></div>
  </div>
</template>

<script>
export default {
  name: 'title-timer',
  props: {
    remainSecond: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style scoped>
  .num span:nth-child(1){
    font-size:60px;
  }
  .div span:nth-child(1){
    font-size:24px;
    display: block;
  }
  .div span:nth-child(2){
    font-size:24px;
  }
  .div{
    display: inline-block;
    color: #353535;
  }
  .num{
    display: inline-block
  }
</style>