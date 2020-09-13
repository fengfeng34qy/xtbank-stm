import { CountDownTimer, CountDownTimeoutMode } from 'awp-plugin-timing';
import { Dialog } from "aui-ss";

/*let CountDownTimeoutMode = {
  //总是倒计时
  alawaysCountDown: 0,
  //输入操作重置倒计时
  resetOnInput: 1
};*/

// 倒计时器类型
const TimerTypes = {
  get None() {
    return 'none';  // 没有倒计时
  },
  get Independent() {
    return 'independent'; // 独立倒计时
  },
  get Shared() {
    return 'shared';  // 共享倒计时
  }
};

export default {
  name: "dialog-content",
  data() {
    return {
      countDownTimer: undefined
    };
  },
  props: ['dialogBoxContentArgs'],
  created() {
    this.setTimeout();
    this.onInitialize();
  },
  methods: {
    _setTimeout(timeoutSeconds, timerType, timeoutMode) {
      if (timerType === TimerTypes.None) {
        return;
      }

      timeoutSeconds = timeoutSeconds || 60;
      timerType = timerType || TimerTypes.Independent;
      timeoutMode = CountDownTimeoutMode[timeoutMode] ||
        timeoutMode || CountDownTimeoutMode.alawaysCountDown;

      // 共享计时器需要调用者自己处理对话框关闭
      if (timerType === TimerTypes.Independent) {
        console.log(timerType, TimerTypes.Independent);
        this.$globalTimer.pause();

        this.countDownTimer = new CountDownTimer();

        this.countDownTimer && this.countDownTimer.stop();
        this.countDownTimer.timeoutMode = timeoutMode;
        this.countDownTimer.setTimeout(timeoutSeconds);
        this.countDownTimer.start();

        this.countDownTimer.onTimeout = this.onTimeout;
      } else if (timerType === TimerTypes.Shared) {
        this.countDownTimer = this.$globalTimer;
      } else {
        throw new Error('timerType只能为independent、shared或none');
      }
    },
    onInitialize() {
    },
    onTimeout() {
      Dialog.close(this);
    },
    setTimeout() {
      const args = this.dialogBoxContentArgs;
      if (args) {
        // setTimeout方法附加到args上，让对话框调用者可以设置对话框超时
        args.setTimeout = this._setTimeout.bind(this);
        this._setTimeout(args.timeoutSeconds, args.timerType, args.timeoutMode);
      } else {
        this._setTimeout(60, TimerTypes.Independent, CountDownTimeoutMode.alawaysCountDown);
      }
    }
  },
  destroyed() {
    if (!this.countDownTimer || this.countDownTimer === this.$globalTimer) {
      return;
    }

    this.$globalTimer.resume();
    this.countDownTimer.stop();
  }
};
