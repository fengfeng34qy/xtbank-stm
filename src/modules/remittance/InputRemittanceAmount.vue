<template>
  <page class="input-remittance-amount">
    <page-header>转账汇款</page-header>
    <page-content>
      <div class="inputAmountPageCtn">
        <span class="inputAmountPrompt">{{tipes}}</span>
        <div class="inputAmountInfo">
          <div class="w40">
            <h4>{{dm.PayActName}}</h4>
            <p>{{dm.PayActNo}}</p>
            <p>可用余额 <span>{{avlBalance}}</span></p>
          </div>
          <div class="w20 inputAmountArrow">→</div>
          <div class="w40">
            <h4>{{dm.PayeeActName}}</h4>
            <p>{{dm.PayeeActNo}}</p>
            <!-- <p>{{dm.PayeeBankName}}({{dm.PayeeBankNo}})</p> -->
            <p>{{dm.PayeeBankName}}</p>
          </div>
          <div class="clear"></div>
        </div>
        <p style="color:#FF8636;">{{feedBack}}</p>
        <form-item property="Amount" :required="true">
          <aui-currency-input 
          class="inputClass" 
          align="left" 
          placeholder="请输入汇款金额" 
          v-model="dm.Amount" 
          :maxlength="10" 
          :decimal="2" 
          :currencySymbol="'¥'" 
          v-keyboard="'number'"><span slot="prepend" class="template">汇款金额</span>
          </aui-currency-input>
        </form-item>
          <aui-text-input class="inputClass" align="left" placeholder="请输入汇款附言" v-model="dm.PS" v-keyboard="'address'"><span slot="prepend" class="template">汇款附言</span></aui-text-input>
        <!-- <aui-text-input class="inputClass w100" align="right" placeholder="手续费" v-model="serviceCharge" :disabled="true"><span slot="prepend" class="template">手续费</span></aui-text-input> -->
        <div class="inputAmountTotle">
          <span class="">到账方式</span>
          <aui-button class="inputAmountBtn" :class="{btnActive: transferPriority == 0}" type="home" cornerType="rounded-corner" @click="changeTransferPriority(0)" v-if="checkIfWorkDay">实时</aui-button>   
          <aui-button class="inputAmountBtn" :class="{btnActive: transferPriority == 1}" type="home" cornerType="rounded-corner" @click="changeTransferPriority(1)">2小时内</aui-button>   
          <aui-button class="inputAmountBtn" :class="{btnActive: transferPriority == 2}" type="home" cornerType="rounded-corner" @click="changeTransferPriority(2)">次日</aui-button>   
          <div class="clear"></div>
        </div>
      </div>
    </page-content>
    <page-footer>
      <aui-box class="btn-space" justify-content="space-between">
          <aui-button @click="onBack" cornerType="rounded-corner" type="info" size="normal" class="footer-btn">
            <span>上一步</span>
          </aui-button>
          <aui-button :fill="true" @click="onNext" cornerType="rounded-corner" size="normal" class="footer-btn" :disabled="ifDisable">
            <span>下一步</span>
          </aui-button>
      </aui-box>
    </page-footer>
  </page>
</template>

<script>
import BasicPage from "../../mixins/basic-page";
import { TradeLogger } from "awp-plugin-logger"; //eslint-disable-line
import { FocusManager } from 'awp-ui-focus-manager';
import { CurrencyFormat } from 'awp-lib-currency-format';

let metadata = { //eslint-disable-line
  name: "InputRemittanceAmount.vue",
  description: "输入汇款金额、附言、到账方式",
  outlets: {
    确定: "OK",
    取消: "Cancel"
  }
};

export default {
  name: "input-remittance-amount",
  mixins: [BasicPage],
  data() {
    return {
      Amount: this.dm.Amount,
      tipes: "温馨提示：客户可持银行卡办理同行、跨行转账业务，周六日转账金额不能超过5万元",
      transferPriority: "",//用于显示按钮颜色
      avlBalance:CurrencyFormat.formatMoney(this.dm.AvlBalance,"¥"),
      feedBack:""
    };
  },
  methods: {
    onNext() {
      // 判断金额是否输入
      //在下一个模块判断是否金额超过5w用不用身份信息  在判断有没有刷过身份证
      this.commit("OK");
    },
    onBack() {
      this.back();
    },
    changeTransferPriority(type) {
      this.dm.TransferPriority = type;
      this.transferPriority = type;
    },
    checkIfWorkDay() {
      var d = new Date();
      var nowDay = d.getDay();
      if (nowDay > 0 && nowDay < 6) {
        return true;
      }
      return false;
    },
    onNavigated() {
      FocusManager.attach(this);
    },
    onClose() {
      FocusManager.detach(this);
    }
  },
  computed: {
    // 原来测试用的手续费算法
    // serviceCharge: function() {
    //   return (this.dm.Amount * 0.1).toFixed(2) + "元";
    // },
    ifDisable: function() {
      if(!this.dm.Amount){
        this.feedBack="请输入金额";
        return true
      }
      else if(Number(this.dm.Amount) > Number(this.dm.AvlBalance)){
        this.feedBack="输入金额大于可用余额";
        return true
      }
      this.feedBack="";
      return false;
    }
  },
  validators: {///////////////////////////////这里的校验方法还不太会用////////
    Amount: [
      "required",
      {
        test(value) {
          return (
            value * 1 >
            this.dm.AvlBalance * 1
          );
        },
        errorMsg: "金额超过余额"
      },
      // {
      //   test(value) {
      //     return (
      //       value * 1 >=
      //       this.dm.CheckedFinancialProduct.FinancingInitialAmount * 1
      //     );
      //   },
      //   errorMsg: "购买金额需大于起购金额"
      // },
      // {
      //   test(value) {
      //     return (
      //       value * 1 -
      //         parseInt(
      //           value *
      //             1 /
      //             this.dm.CheckedFinancialProduct.FinancingAddAmount *
      //             1
      //         ) *
      //           this.dm.CheckedFinancialProduct.FinancingAddAmount *
      //           1 ===
      //       0
      //     );
      //   },
      //   errorMsg: "购买金额需满足金额递增"
      // }
    ]
  },
  beforeMount: function() {
    this.dm.PayActNo = this.session.Customer.CardNo;
    this.dm.PayActName = this.dm.AcctName;
    //初始化转账方式数据
    this.transferPriority = 0;
    this.dm.TransferPriority = 0;
  },
  mounted: function() {
  }
};
</script>

<style scoped>
.footer-btn {
  width: 168px;
  height: 60px;
  font-size: 26px;
}

.footer-btn:last-child span {
  display: inline-block;
  line-height: 30px;
  padding-left: 45px;
  margin-right: 10px;
  background: url(../../../static/resource/trade/ok.png) 0 0 no-repeat;
}

.btn-space {
  width: 608px;
}

.fl{
  float: left;
}
.fr{
  float: right;
}
.w100{
  width: 100%;
}
.w40{
  width: 40%;
}
.w20{
  width: 20%;
}
.clear{
  clear: both;
}
.inputAmountArrow{
  font-size: 30px;

}
.inputAmountPageCtn{
  width: 80%;
  height: 100%;
  margin:auto;
}
.inputAmountPrompt{
  color: #FF8636;
  margin: 8px 0 30px 0;
  display: block;
}
.inputAmountInfo{
  background: #F2F2F2;
  box-sizing: content-box;
  padding: 30px 60px;
  display: flex;
  flex-flow: row nowrap;
  align-items:center;
  margin-bottom: 20px;
}
.inputAmountInfo h4{
  font-weight: 800;
  display: block;
  margin-bottom: 30px;
}
.inputAmountArrow{
  font-size: 64px;
}
/* .inputAmountTotle{
  
} */
.shishidaozhangBtn{
  height: 20px;
  width: 120px;
  background: #000;
}
.inputClass{
  width: 758px;
  margin-bottom: 10px;
  height: 60px;
}
.inputAmountBtn{
    width: 123px;
    min-width: 50px;
    height: 40px;
    /* line-height: 34px; */
    font-size: 22px;
    margin: 8px auto;
}
.inputAmountBtn.btnActive{
  color:#fff;
  border:#fff 1px solid;
  background: #f27948;
}
.template {
  font-size: 20px;
  color: #999999;
  border-right: 1px solid #CCCCCC;
  width: 80px;
  padding: 0 20px;
  display: inline-block;
}
/* .aui-text-input-disabled{
  background: none;
} */
/* 下面样式不生效 不明原因 */
/* .aui-text-input input:disabled{
  background: none !important;
} */

</style>
