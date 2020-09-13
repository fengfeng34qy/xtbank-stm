<template>
  <page class="transfer-remittance-confirm">
    <page-header>确认转账</page-header>
    <page-content>
      <!-- <div class="transferConfirmCtn">
        付款账户名称：{{dm.PayActName}}
        <br>
        付款账号：{{dm.PayActNo}}
        <br>
        收款账户名称：{{dm.PayeeActName}}
        <br>
        收款账号：{{dm.PayeeActNo}}
        <br>
        收款人行号：{{dm.PayeeBankNo}}
        <br>
        业务优先级：{{TransferPriorityShow}}
        <br>
        金额：{{dm.Amount}}
        <br>
        手续费: {{ServiceFee}}
        <br>
        手续收税: {{Tax}}
      </div> -->
      <div>
        <aui-box class="confirm-tips">{{tipes}}</aui-box>
        <aui-box class="amount-info">
          <aui-box direction="column" justify-content="flex-start" align-items="flex-start">
            <aui-box class="amount-name">{{dm.PayActName}}</aui-box>
            <aui-box>借记卡{{dm.PayActNo}}</aui-box>
            <aui-box>可用余额{{AvlBalanceShow}}</aui-box>
          </aui-box>
          <aui-box class="w20">
            <aui-box class="inputAmountArrow">→</aui-box>
          </aui-box>
          <aui-box direction="column" justify-content="flex-start" align-items="flex-start">
            <aui-box class="amount-name">{{dm.PayeeActName}}</aui-box>
            <aui-box>借记卡{{dm.PayActNo}}</aui-box>
            <aui-box>{{dm.PayeeBankName}}</aui-box>
          </aui-box>
        </aui-box>
        <aui-box>
          <aui-currency-input align="left" placeholder="左" size="large" v-model="dm.Amount" :decimal="2"  :currencySymbol="'¥'" class="custom" :disabled="true">
              <span slot="prepend" class="template">总金额</span>
          </aui-currency-input>
        </aui-box>
        <aui-box>
          <aui-text-input placeholder="" v-model="dm.PS" size="large" class="custom" :disabled="true">
              <span slot="prepend" class="template">汇款附言</span>
          </aui-text-input>
        </aui-box>
        <aui-box>
          <aui-currency-input align="left" placeholder="左" size="large" v-model="ServiceFee" :decimal="2"  :currencySymbol="'¥'" class="custom" :disabled="true">
              <span slot="prepend" class="template">手续费</span>
          </aui-currency-input>
        </aui-box>
        <aui-box>
          <aui-text-input placeholder="" v-model="transfer[dm.TransferPriority]" size="large" class="custom" :disabled="true">
              <span slot="prepend" class="template">到帐方式</span>
          </aui-text-input>
        </aui-box>
      </div>
    </page-content>
    <page-footer>
      <aui-box class="btn-space" justify-content="space-between">
          <aui-button @click="onBack" cornerType="rounded-corner" type="info" size="normal" class="footer-btn">
            <span>上一步</span>
          </aui-button>
          <aui-button :fill="true" @click="onNext" cornerType="rounded-corner" size="normal" class="footer-btn" :disabled="ifDisable">
            <span>确认转账</span>
          </aui-button>
      </aui-box>
    </page-footer>
  </page>
</template>

<script>
import BasicPage from "../../mixins/basic-page";
import { CurrencyFormat } from 'awp-lib-currency-format';

import RequestHelper from "../../utils/request-helper";
import MessagePacker from "../../utils/message-packer";
import CA003 from "../../messages/ca003"; // 查询手续费

let metadata = {//eslint-disable-line
  name: "transferRemittanceConfirm.vue",
  description: "转账确认页面",
  outlets: {
    确定: "OK",
    取消: "Cancel"
  }
};

export default {
  name: "transfer-remittance-confirm",
  mixins: [BasicPage],
  data() {
    return {
      ServiceFee: "",
      Tax: "",
      ifDisable: true,
      tipes: "温馨提示：周末或国家法定节假日，跨行转账金额超过五万元，转账将受理并在下一个工作日到帐",
      transfer: [ "实时", "2小时内", "次日" ]
    };
  },
  methods: {
    onNext() {
      this.commit("OK");
    },
    onBack() {
      this.back();
    },
    async getServiceCharge() {
      //查询手续费
      let content = new CA003();
      MessagePacker.pack(content, this.dm);
      content.AcctNo = this.dm.PayActNo;
      content.TransactionType = "SSTS";
      content.Currency = "";
      content.TranAmt = this.dm.Amount;
      try {
        let result = await RequestHelper.sendAsync(content);
        if (result.SYS_HEAD.ReturnCode === "000000") {
          this.ServiceFee = result.RSP_BODY.ServiceFee;
          this.Tax = result.RSP_BODY.Tax;
          //检测转账金额加手续费是否超出了剩余金额
          if (
            Number(this.dm.AvlBalance) <
            Number(this.dm.Amount) + Number(this.ServiceFee) + Number(this.Tax)
          ) {
            console.log("需要金额超出了可用余额");
            this.ifDisable = true;
          } else {
            this.ifDisable = false;
          }
        } else {
          console.debug(result.SYS_HEAD.ReturnMessage);
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
  computed: {
    TransferPriorityShow() {
      return this.dm.TransferPriority == 0
        ? "实时"
        : this.dm.TransferPriority == 1
          ? "两小时内"
          : this.dm.TransferPriority == 2 ? "次日" : "信息获取错误";
    },
    AvlBalanceShow(){
      return CurrencyFormat.formatMoney(this.dm.AvlBalance,"¥");
    }
  },
  beforeMount: function() {
    this.getServiceCharge();
  },
  mounted: function() {
    console.log(this.dm);
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
.fl {
  float: left;
}
.fr {
  float: right;
}
.clear {
  clear: both;
}
.margin-t-30 {
  margin-top: 30px;
}
.margin-t-60 {
  margin-top: 60px;
}
.transferConfirmCtn {
  text-align: center;
}
.confirm-tips {
  color: #ff8636;
  margin: 8px 0 30px 0;
  display: block;
}
.w20 {
  width: 20%;
}
.inputAmountArrow {
  font-size: 64px;
}
.amount-info {
  background: #f2f2f2;
  padding: 30px 60px;
  margin-bottom: 20px;
  box-sizing: content-box;
}
.amount-name {
  font-weight: 800;
  margin-bottom: 30px;
}
.template {
  font-size: 20px;
  color: #999999;
  border-right: 1px solid #cccccc;
  width: 80px;
  padding: 0 20px;
  display: inline-block;
  margin-right: 10px;
}
.custom {
  width: 100%;
  height: 58px;
  margin-bottom: 10px;
}
</style>
