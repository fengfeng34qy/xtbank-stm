<template>
  <div class="child">
    <aui-text style="width:200px;">默认对齐</aui-text><br>
    <aui-text align="justify" style="width:200px;">两端对齐</aui-text><br>
    <aui-text align="right" style="width:200px;">右对齐</aui-text><br>
    <aui-text align="center" style="width:200px;">居中对齐</aui-text><br>
    <aui-text align="justify" style="width:200px;">两端</aui-text>
    <div ref="testdiv">第一个子组件</div>
    <div class="child1">
      <div>State: {{State}}</div>
      <!-- <input type="button" @click="changeTitle" value="click"> -->
      <aui-button @click="changeTitle" :fill="true">下一步(填充)</aui-button>
      <aui-button @click="changeState">改变State</aui-button>
      <input type="button" @click="getRef" value="getRef">
    </div>
    <div>
      <!-- <input type="text" v-model="money" property="money"> -->
      <!-- <aui-number-input v-model="money" placeholder="数字输入框"></aui-number-input> -->
      <!-- <aui-box justifyContent="flex-start" class="field-set"> -->
        <aui-text align='justify' class='field-label'>存款金额</aui-text>：
        <input-error-template property="money">
          <aui-currency-input placeholder="请输入金额" v-model="money" :big="maxMoney" :small="minMoney" :decimal="2" size="large"></aui-currency-input>
        </input-error-template>
      <!-- </aui-box> -->
    </div>
    <div>
      <input type="button" value="disabled" :disabled="isDisabled">
    </div>
    <div>
      <datepicker v-model="date"></datepicker>
    </div>
  </div>
</template>

<script>

import { Dialog } from "aui-ss";
import {
  MessageDialog,
  MessageDialogButton,
  MessageDialogIcon
} from "../../components/dialog";
import BasicPage from '@/mixins/basic-page';
import child2 from '@/modules/test1/child2';
import datepicker from 'vue-date';
// import Datepicker from '@/modules/test1/Datepicker';
import { mapState } from 'vuex';

/* eslint-disable */
export default {
  name: 'child',
  mixins: [BasicPage],
  props: ['dm'],
  computed: mapState({
    // State: state => state.testStateValue1,
    State: 'testStateValue1',
    isDisabled() {
      return !(this.$validate() && this.money);
    }
  }),
  validators: {
    money: [
      {
        test(value){
          let inputValue=value.replace(/,/g,'');
          return Number(inputValue) >= 1000;
        },
        errorMsg: '不能小于1000'
      },
      {
        test(value){
          let inputValue=value.replace(/,/g,'');
          return Number(inputValue) < 2000;
        },
        errorMsg: '不能大于2000'
      }
    ]
  },
  data() {
    return {
      oSession: 'session',
      menu: this.dm,
      date: '2016-10-16',
      money: '',
      maxMoney: '',
      minMoney: ''
    };
  },
  components: { datepicker},
  created(){
    console.log(this.$store.state.nextTradeConfig.tradeCNName);
  },
  mounted() {
    console.log('mounted');
    console.log(this.$store.state);
  },
  activated() {
    console.log('activated');
  },
  props: {
    language: { default: 'en' }
  },
  methods: {
    onInitialize() {
      console.log('test1');
    },
    onNavigated() {
      // ...
    },
    async getRef() {
      let box = await Dialog.showNonAwait(MessageDialog,{
        dialogBoxContentArgs: {
          iconType: MessageDialogIcon.Success,
          timeoutSeconds: 10,
          // timerType: "independent",
          message: "确认退出",
          btnType: MessageDialogButton.OK,
          async onTimeout() {
            console.log('timeout');
          }
        }
      });
      // if(box == 'ok'){
      //   console.log('asdf');
      // }
      fetch('http://www.sunfengfeng.com/post', {
        redirect: "error",
        method: 'post'
      }).then(function(response){
        response.json().then(function(data) {
          console.log(data);
          // Dialog.close(box);
        });
      });
    },
    changeState() {
      this.$store.commit('changeTestStateValue1', 'changeStateValue1');
    },
    changeTitle() {
      this.$emit('pageChange', child2);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.child1{
  margin-top: 40px;
}
</style>
