<template>
  <page class="trade-result-page">
    <!-- <page-header>{{this.result.title}}</page-header> -->
    <page-header>转账汇款交易结果</page-header>
    <audio src="static/resource/audio/takeBankCard.ogg" autoplay></audio>
    <page-content>
      <aui-box justifyContent="center" class="result-icon">
        <img :src="this.imgSrc" :class="this.result.icon === 'ejectCard' ? 'eject-card-img' : ''">
      </aui-box>
      <h1>{{dm.TranResult.resultType == "success" ? "交易成功" : "交易失败"}}</h1>
      <aui-box v-for="(tip, index) in this.result.tips" :key="index" v-show="tip.show" class="info-box" justify-content="flex-start">
        <aui-text align="justify" class="info">{{tip.message}}</aui-text>
      </aui-box>
    </page-content>
    <!-- 取卡无按钮 -->
    <page-footer v-if="!this.result.ejectCard">
      <aui-box justify-content="center" class="footer-box">
        <aui-button @click="onNext" :fill="true">完成</aui-button>
      </aui-box>
    </page-footer>
  </page>
</template>

<script>
import BasicPage from "../../mixins/basic-page";
import { CardReader } from "awp-plugin-device-card-reader";
import { SensorsIndicators } from "awp-plugin-device-sensors-indicators";
import C004 from "../../messages/c004";
import RequestHelper from "../../utils/request-helper";
// 导入倒计时模块
import { CountDownTimeoutMode } from "awp-plugin-timing";
import { Dialog } from "aui-ss";
import { WaitDialog } from "../../../src/components/dialog";

let metadata = { //eslint-disable-line
  name: "TradeResultPage.vue",
  description: "交易结果页面",
  outlets: {
    交易成功: "Success",
    交易失败: "Failed",
    取消: "Cancel"
  }
};

export default {
  name: "trade-result-page",
  mixins: [BasicPage],
  data() {
    return {
      // 交易结果，应传入既定格式
      result: {
        resultType: 'success', // 交易结果类型: success/failed
        ejectCard: false, // 是否吐卡、默认为false不吐卡
        title: "交易成功", // header标题
        countDownTimeoutMode: false, // 是否重置计时、默认为false不重置
        icon: "success", // 交易结果的图标：success/failed/ejectCard 、默认为success
        tips: [
          {
            message: "", // 要显示的信息
            show: true // 是否显示
          }
        ]
      },
      imgSrc: ""
    };
  },
  // computed: {
  //   resultWords: this.dm.TranResult.resultType == "success" ? "交易成功" : "交易失败"
  // },
  methods: {
    async onInitialize() {
      this.result = this.dm.TranResult;
      console.log("TranResult", this.dm);
      // 获取图标
      switch (this.result.icon) {
        case "ejectCard":
          this.imgSrc = "static/resource/trade/cardout.gif";
          break;
        case "success":
          this.imgSrc = "static/resource/trade/success.png";
          break;
        case "failed":
          this.imgSrc = "static/resource/trade/failed.png";
          break;
        default:
          this.imgSrc = "static/resource/trade/success.png";
      }
      // 禁用触控重置计时
      if (this.result.countDownTimeoutMode) {
        this.$globalTimer.timeoutMode = CountDownTimeoutMode.AlwaysCountDown;
        this.setTimeout(60);
      }
      //成功后退出卡片
      if (this.result.ejectCard) {
        SensorsIndicators.openCardUnit1Async();
        try {
          await CardReader.ejectCardAsync();
          await CardReader.waitCardTakenAsync();
          SensorsIndicators.closeCardUnit1Async();
          if (this.result.resultType === "success") {
            this.commit("Success");
          } else {
            this.commit("Failed");
          }
        } catch (err) {
          console.error(err);
          this.logger.error("出卡异常", err);
        }
      }
    },
    /** 
     * @func onTimeout 超时
     */
    async onTimeout() {
      if (this.result.ejectCard) {
        // 取卡超时将吞卡
        await this.retainCardAndSendMsgAsync();
      }
      this.commit("Cancel");
    },
    /** 
     * @func retainCardAndSendMsgAsync 吞卡并通知P端
     */
    async retainCardAndSendMsgAsync() {
      try {
        let isCardAtPresent = await CardReader.isCardAtPresentAsync(); // 卡是否在卡道内
        let isCardAtEntrance = await CardReader.isCardAtEntranceAsync(); // 卡是否在卡口
        if (!isCardAtPresent && !isCardAtEntrance) {
          return;
        }
        SensorsIndicators.openCardUnit1Async();

        let dialog;
        try {
          dialog = Dialog.showNonAwait(WaitDialog, {
            dialogBoxContentArgs: { tips: "吞卡" }
          });
        } catch (err) {
          console.error(err);
        }
        await CardReader.cancelAsync();
        await CardReader.retainCardAsync();
        let content = new C004();
        content.RetCardFlag = "1"; // 吞卡标志 0-客户卡
        content.RetCardRsnCode = "21"; // 吞卡原因代码
        content.RetCardRsnDesc = "开卡成功超时未取吞卡"; // 吞卡原因描述
        let result;
        try {
          result = await RequestHelper.sendAsync(content);
        } catch (error) {
          this.logger.error("C004异常", error);
          console.error(error);
        }
        if (result.SYS_HEAD.ReturnCode == "000000") {
          console.debug("通讯成功");
        } else {
          console.debug("通讯失败");
          console.debug(result.SYS_HEAD.ReturnMessage);
        }
        Dialog.close(dialog);
      } catch (err) {
        this.logger.error("吞卡异常", err);
        console.error(err);
        return;
      } finally {
        SensorsIndicators.closeCardUnit1Async();
      }
    },
    onNext() {
      if (this.result.resultType === "success") {
        this.commit("Success");
      } else {
        this.commit("Failed");
      }
    }
  },
  mounted: function() {
  }
};
</script>

<style scoped>
.footer-box {
  width: 520px;
}

.result-icon {
  margin-top: 50px;
  margin-bottom: 30px;
}

.eject-card-img {
  width: 218px;
  height: 155px;
}

.info-box {
  width: 350px;
  font-size: 20px;
  line-height: 28px;
}

.info {
  width: 120px;
}
</style>
