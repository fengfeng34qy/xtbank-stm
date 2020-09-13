<template>
  <div class="message-dialog">
    <div class="message-dialog-timeout-seconds" v-if="countDownTimer">{{countDownTimer.remainingSeconds}}&nbsp;
      <span style="color: #108EE9;">s</span>
    </div>
    <div class="message-dialog-icon" :class="{'message-dialog-icon-no-btn':isNoBtn}" :style="{ 'background-image': `url(${iconTypeHandler})` }" v-if="isShowIcon">
    </div>
    <!-- <aui-loading :class="{'message-dialog-icon-no-btn':isNoBtn}" :style="{ 'background-image': `url(${iconTypeHandler})` }" v-if="isShowLoading"></aui-loading> -->
    <div :class="{'message-dialog-icon-no-btn':isNoBtn}" v-if="isShowLoading"></div>
    <div class="message-dialog-message" :class="{'message-dialog-message-no-icon':isNoIcon, 'message-dialog-message-no-icon-btn':isNoIconBtn}" v-if="this.dialogBoxContentArgs.message">{{this.dialogBoxContentArgs.message}}</div>
    <div class="message-dialog-btn" v-if="isShowBtn">
      <aui-button v-for="(item,index) in btnTypeHandler" :key="index" :fill="item==='确定'||item==='是'"
        :class="{'message-dialog-second-btn': index===1}"
        @click="onClick(item)">
        {{item}}
      </aui-button>
    </div>
  </div>
</template>

<script>
import DialogContent from '../../mixins/dialog-content.js';
import { Dialog } from "aui-ss";
import Vue from 'vue';

export default {
  name: 'message-dialog',
  mixins: [DialogContent],
  data() {
    return {
      countDownTimer: {
        remainingSeconds: 10
      },
      iconTypesEnum: {
        wait: '../../../static/resource/trade/successIcon.png',
        success: '../../../static/resource/trade/successIcon.png',
        error: '../../../static/resource/trade/errorIcon.png',
        warn: '',
        info: '',
        none: ''
      },
      btnTypesEnum: {
        ok: ['确定'],
        cancel: ['取消'],
        okCancel: ['确定', '取消'],
        yesNo: ['是', '否'],
        none: []
      },
      result: ''
    };
  },
  props: {
    dialogBoxContentArgs: Object
  },
  computed: {
    isShowIcon() {
      if (this.dialogBoxContentArgs.iconType && this.dialogBoxContentArgs.iconType !== 'none' && this.dialogBoxContentArgs.iconType !== 'wait') {
        return true;
      } else {
        return false;
      }
    },
    isShowLoading() {
      if (this.dialogBoxContentArgs.iconType === 'wait') {
        return true;
      } else {
        return false;
      }
    },
    isNoIcon() {
      if (!this.isShowIcon && !this.isShowLoading) {
        return true;
      } else {
        return false;
      }
    },
    isNoIconBtn() {
      if (!this.isShowIcon && !this.isShowLoading && !this.isShowBtn) {
        return true;
      } else {
        return false;
      }
    },
    isNoBtn() {
      if (!this.isShowBtn) {
        return true;
      } else {
        return true;
      }
    },
    isShowBtn() {
      console.log('btnType', this.dialogBoxContentArgs.btnType);
      if (this.dialogBoxContentArgs.btnType && this.dialogBoxContentArgs.btnType !== 'none') {
        return true;
      } else {
        return false;
      }
    },
    isShowSecondBtn() {
      if (this.dialogBoxContentArgs.btnType === 'yesNo') {
        return true;
      } else {
        return false;
      }
    },
    iconTypeHandler() {
      return this.iconTypesEnum[this.dialogBoxContentArgs.iconType];
    },
    btnTypeHandler() {
      return this.btnTypesEnum[this.dialogBoxContentArgs.btnType];
    }
  },
  methods: {
    onInitialize() {
      if (!this.dialogBoxContentArgs.iconType) {
        Vue.set(this.dialogBoxContentArgs, 'iconType', 'none');
      }
      if (!this.dialogBoxContentArgs.btnType) {
        Vue.set(this.dialogBoxContentArgs, 'btnType', 'none');
      }
    },
    onClick(item) {
      if (item === '确定') {
        this.result = 'ok';
      } else if (item === '取消') {
        this.result = 'cancel';
      } else if (item === '是') {
        this.result = 'yes';
      } else if (item === '否') {
        this.result = 'no';
      }

      Dialog.close(this);
    },
    onClose() {
      this.dialogBoxContentArgs.onClose && this.dialogBoxContentArgs.onClose();
    },
    onTimeout() {
      if (this.dialogBoxContentArgs.onTimeout) {
        Dialog.close(this);
        this.dialogBoxContentArgs.onTimeout();
      } else {
        Dialog.close(this);
      }
    }
  }
};
</script>
<style scoped>
.message-dialog {
  background: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.50);
  width: 600px;
  height: 400px;
  position: relative;
}

.message-dialog-timeout-seconds {
  font-size: 48px;
  color: rgb(231, 74, 65);
  position: absolute;
  right: 10px;
  top: 5px;
}

.message-dialog-icon {
  width: 98px;
  height: 98px;
  margin-top: 10%;
  margin-left: auto;
  margin-right: auto;
}

.message-dialog-icon-no-btn {
  margin-top: 16%;
}

.message-dialog-message {
  width: 90%;
  font-size: 30px;
  color: #896e6e;
  text-align: center;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
  line-height: 40px;
}

.message-dialog-message-no-icon {
  margin-top: 22%;
}

.message-dialog-message-no-icon-btn {
  margin-top: 30%;
}

.message-dialog-btn {
  position: absolute;
  bottom: 30px;
  /* right: 32%; */
  left: 0;
  width: 100%;
  text-align: center;
}

.message-dialog-second-btn {
  margin-left: 10%!important;
}
</style>
