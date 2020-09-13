<template>
  <div class="TradeMenuList">
    <div class="items" v-for="(item,index) in menu" :key="index">
      <img v-bind:src="item.icon" alt="" @click="toStepNavigeter(item)">
      <div>{{item.tradeName}}</div>
    </div>
  </div>
</template>

<script>

// import BasicPage from '@/mixins/basic-page';

/* eslint-disable */
export default {
  name: 'TradeMenuList',
  // mixins: [BasicPage],
  props: ['dm'],
  computed: {
    normalizedSize() {
      return this.session;
    }
  },
  data() {
    return {
      oSession: 'session',
      menu: this.dm
    };
  },
  created() {
    console.log(this.menu);
  },
  methods: {
    onInitialize() {
      // console.log(this.dm);
    },
    toStepNavigeter(item) {
      this.$store.state.nextTradeConfig = {
        tradeCNName: item.tradeName,
        tradeCode: item.code,
        tadUrl: item.tadPath
      };
      // let nextTradeConfig = {
      //   tradeCNName: item.tradeName,
      //   tradeCode: item.code,
      //   tadUrl: item.tadPath
      // }
      // this.$store.commit('changeNextTradeConfig', nextTradeConfig);
      console.log(item);
      // this.session.Customer.tradeName = item.tradeName;
      this.$router.replace(item.tadPath);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.TradeMenuList{
  display: flex;
  height: 336px;
}
.items{
  flex: 4;
}
</style>
