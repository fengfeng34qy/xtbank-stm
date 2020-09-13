<template>
  <div class="TradeMenu">
    <view-header></view-header>
    <!-- <keep-alive>
      <component ref="currentPage" :is="currentView" :dm="vmData" :session="session" keep-alive>
      </component>
    </keep-alive> -->
    <div class="aui-tile-menu">
      <aui-tile-menu :tile-menu-data="tileMenuData" :tile-menu-config="tileMenuConfig" @itemClicked="onTrade"></aui-tile-menu>
    </div>
    <view-footer class="footer"></view-footer>
    <div class="menu_exit_btn" @click="exit">退出</div>
  </div>
</template>

<script>

import TradeMenuList from './TradeMenuList';
import TileMenuData from "../../static/tile-menu-data.json";
import TileMenuConfig from "../../static/tile-menu-config.json";
import BasicActivity from "../mixins/basic-activity";
import ViewHeader from "../components/ViewHeader";
import ViewFooter from '../components/ViewFooter';

/* eslint-disable */
export default {
  name: 'TradeMenu',
  mixins: [BasicActivity],
  data() {
    return {
      tileMenuData: null,
      tileMenuConfig: null,
      currentView: TradeMenuList,
      session: {data: 'session'},
      vmData: TileMenuData
    };
  },
  created () {
    // window.location.reload();
    this.tileMenuData = TileMenuData;
    this.tileMenuConfig = TileMenuConfig;
  },
  methods: {
    onInitialize() {
        // this.session = {};
        this.$globalTimer.setTimeout(60);
        this.$globalTimer.start();
    },
    onTimeout() {
      this.$router.replace('/');
    },
    onTrade(item) {
      console.log(item);
      if (item.navigationMode === 'step') {
        this.setTradeConfig(item);
        this.navigateToTrade(item);
      }
    },
    setTradeConfig(nextTradeConfig) {
      this.$store.commit('changeNextTradeConfig', nextTradeConfig);
    },
    navigateToTrade(tradeItem) {
      console.log('当前交易—', tradeItem.tradeName);
      if (tradeItem && tradeItem.tradeEnName && tradeItem.tadPath) {
        this.$router.replace(`/step-page-navigator/${tradeItem.tradeEnName}/${tradeItem.code}`);
      }
    },
    exit() {
      this.$router.push({path: '/'});
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
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.tip{
  margin: 10px;
}
.TradeMenu {
  height: 100%;
}
.aui-tile-menu {
  height: 100%;
}
.menu_exit_btn {
  position: absolute;
  right: 80px;
  bottom: 30px;
  width: 60px;
  height: 40px;
  font-size: 28px;
  line-height: 40px;
  text-align: center;
}
</style>
