<template>
  <div class="view-footer">
    <div class="footer-bg">
      <aui-row class="content">
      <aui-col span="6" justify="left">
        <aui-row style="width:100%; text-align: center;padding-top: 7px">
          <aui-col span="8" justify="center">
            <div>
              <img src="static/resource/footer/android.png" style="background:#fff;border:0px solid #fff;width:70px;height:70px;" alt="">
              <p style="font-size:14px;text-align:center;margin-top:10px;">安卓</p>
            </div>
          </aui-col>
          <aui-col span="8" justify="center">
            <div>
              <img src="static/resource/footer/ios.png" style="background:#fff;border:0px solid #fff;width:70px;height:70px;" alt="">
              <p style="font-size:14px;text-align:center;margin-top:10px;">ios</p>
            </div>
          </aui-col>
          <aui-col span="8" justify="center">
            <div>
              <img src="static/resource/footer/wechat.png" style="background:#fff;border:0px solid #fff;width:70px;height:70px;" alt="">
              <p style="font-size:14px;text-align:center;margin-top:10px;">关注微信</p>
            </div>
          </aui-col>
        </aui-row>
        </aui-col>
        <aui-col span="8" offset="1" justify="right">
          <div class="content-div">
            <span>网址：www.xtbank.com</span>
            <span class="content-span">热线：96306</span>
          </div>
        </aui-col>
        <aui-col span="8" offset="1" class="content-col" justify="right">
          <!--<title-clock></title-clock>-->
        </aui-col>
      </aui-row>
    </div>
  </div>
</template>

<script>
import TitleClock from '../components/TitleClock';

export default {
  name: 'view-footer',
  components: {
    TitleClock
  }
};
</script>

<style scoped>
.footer-bg {
  width: 100%;
  position: relative;
  color: #fff;
}
.content {
  position: absolute;
  bottom:10px;
  width:100%;
}
.content-div {
  height:30px;
  margin-top:70px;
}
.content-span {
  margin-left:30px;
}
.content-col {
  padding-right:20px;
  padding-top:43px;
}
</style>
