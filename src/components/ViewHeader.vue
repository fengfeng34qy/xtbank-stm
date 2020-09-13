<template>
  <div class="view-header">
    <aui-row class="content">
      <aui-col span="8" justify="left" class="logo">
        <div class="header-logo"></div>
      </aui-col>
      <aui-col span="12" class="content-col" justify="right">
          <title-clock></title-clock>
        </aui-col>
      <aui-col span="4" class="time" justify="left">
        <title-timer v-show="(this.title!='清钞')&&(this.title!='加钞')" class="clock" :remain-second="globalTimer.remainingSeconds"></title-timer>
      </aui-col>
    </aui-row>
  </div>
</template>

<script>
import TitleTimer from '../components/TitleTimer';
import TitleClock from '../components/TitleClock';

export default {
  name: 'view-header',
  data() {
    return {
      globalTimer: this.$globalTimer
    };
  },
  props: ['title'],
  components: {
    TitleTimer,
    TitleClock
  }
};
</script>

<style scoped>
.view-header {
  width: 100%;
  height: 120px;
  border-bottom: 5px solid #108EE9;
}
.content {
  height:120px;
  /*padding:0 20px;*/
}
.logo{
  padding-left: 20px;
  border-bottom: 5px solid #6EB92C;
}
.clock{
  /*padding-right: 20px;*/
}
.time{
  padding-top:30px;
}
.content-col {
  padding-right:85px;
  padding-top:30px;
  color: #353535;
  font-size: 24px;
  background: url(../../static/resource/header/icon_time.png) no-repeat;
      background-position: 97% 47px;
}
</style>
