<template>
  <div class="StepPageNavigator">
    <view-header></view-header>
    <div><button @click="mainBackBtn">返回</button></div>
    <!-- 动画 -->
    <transition name='page' mode="out-in" @after-enter='onNavigated'>
      <keep-alive>
        <component ref="currentPage" :is="currentPage" :dm="vmData" :session="session" v-on:pageChange="zdy($event)">
        <!-- 组件在 vm.currentview 变化时改变！ -->
        </component>
      </keep-alive>
    </transition>
    <view-footer class="footer"></view-footer>
  </div>
</template>

<script>

import { Dialog } from "aui-ss";
import {
  MessageDialog,
  MessageDialogButton,
  MessageDialogIcon
} from "../components/dialog";
// import utils from '@/utils/util';
import TileMenuData from "../../static/tile-menu-data.json";
import BasicActivity from "../mixins/basic-activity";
import ViewHeader from '../components/ViewHeader';
import ViewFooter from '../components/ViewFooter';
// import { SessionHelper } from 'Session';
var _awpUiPageManagerVue = require('awp-ui-page-manager-vue');

/* eslint-disable */
export default {
  name: 'StepPageNavigator',
  mixins: [BasicActivity],
  data() {
    return {
      currentPage: undefined,
      session: {data: 'session'},
      vmData: TileMenuData,
      page: null
    };
  },
  // created () {},
  activated() {
    console.log('activated');
  },
  methods: {
    async onInitialize() {
      // let result = await SessionHelper.getSessionDataAsync();
      // console.log(result);
      // this.session = result;
    },
    onNavigated() {
      console.log('onNavigated');
      let currentPage = this.$refs.currentPage;
      currentPage && currentPage.onNavigated && currentPage.onNavigated();
    },
    async openPage() {
      let tradeEnName = this.$route.params.tradeEnName;
      // let tradeCode = this.$route.params.tradeCode;
      let str = this.$store.state.nextTradeConfig.tadPath;
      let start = str.lastIndexOf('/') + 1;
      let end = str.lastIndexOf('.');
      let tradeCode = str.substring(start, end);
      let path = `@/modules/${tradeEnName}/${tradeCode}.vue`;
      console.log('path', path)
      // let a = await this.$http.get('@/modules/remittance/remittance.tad');
      // console.log(a);
      this.page = _awpUiPageManagerVue.PageManager.getPage(path);
      this.currentPage = this.page;
      // this.session = await SessionHelper.getSessionDataAsync();
    },
    onTimeout() {
      this.$router.replace('/');
    },
    async mainBackBtn() {
      let box = await Dialog.showAwait(MessageDialog, {
        dialogBoxContentArgs: {
          iconType: MessageDialogIcon.Success,
          timeoutSeconds: 10,
          // timerType: "independent",
          message: "确认退出？",
          btnType: MessageDialogButton.OKCanael,
          async onTimeout() {
            console.log('timeout');
          }
        }
      });
      if(box == 'ok'){
        this.$router.replace('/trade-menu');
      }
      
    },
    zdy(msg) {
      console.log(this.$refs);
      console.log(msg);
      this.currentPage = msg;
    }
  },
  components: {
    ViewHeader,
    ViewFooter
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.StepPageNavigator{
  height: 100%;
  overflow: hidden;
  position: relative;
}
.tip{
  margin: 10px;
}
.page-enter-active {
  animation-delay: 0.5s;
  animation-duration: 0.8s;
  animation-fill-mode: both;
  animation-name: fadeInUp;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.page-leave-active {
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: fadeOutUp;
}

@keyframes fadeOutUp {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
}
</style>
