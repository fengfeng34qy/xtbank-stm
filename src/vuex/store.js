/**
 * store.js核心文件
 * 先引用vue和vuex 然后user(Vuex)返回一个Vuex.store
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    testStateValue1: '',
    parentTradeItem: undefined,
    swiperActiveIndex: 0,
    nextTradeConfig: {
      tadUrl: undefined,
      tradeCNName: undefined,
      tradeCode: undefined
    },
    isNavigatorBtnDisabled: false
  },
  mutations: {
    changeTestStateValue1(state, value) {
      state.testStateValue1 = value;
    },
    /**
     * @func changeNextTradeName
     * @desc 交易跳转交易需要提交下一只交易的信息
     * @param {*} tradeConfig 交易信息
     */
    changeNextTradeConfig(state, tradeConfig) {
      state.nextTradeConfig = tradeConfig;
    },
    /**
     * @func clearNextTradeName
     * @desc 清空NextTradeName
     */
    clearNextTradeConfig(state) {
      state.nextTradeConfig = {
        tadUrl: undefined,
        tradeCNName: undefined,
        tradeCode: undefined
      };
    },
    parentTradeItem(state, trade) {
      if (trade) {
        state.parentTradeItem = trade;
      } else {
        state.parentTradeItem = undefined;
      }
    },
    swiperSlideTo(state, index) {
      state.swiperActiveIndex = index;
    },
    /**
     * @func enableNavigatorButton
     * @desc 启动Navigator中返回按钮
     */
    enableNavigatorButton(state) {
      state.isNavigatorBtnDisabled = false;
    },
    /**
     * @func disableNavigatorBUtton
     * @desc 禁用Navigator中返回按钮
     */
    disableNavigatorButton(state) {
      state.isNavigatorBtnDisabled = true;
    }
  }
});
