// 导入倒计时模块
// import { CountDownTimeoutMode } from 'awp-plugin-timing';
// 导入activity页面切换控制引擎模块
// import { RootActivityManager } from 'awp-ui-activity-manager';

export default {
  name: "basic-activity",

  provide: {
    logger: undefined
  },

  // created生命周期钩子函数
  // 当交易中混合了mixin，先执行mixin中的生命周期钩子函数，再执行页面中的生命周期钩子
  created() {
    console.log('basic-activity created');
    this.$globalTimer.onTimeout = this.onTimeout;
    document.documentElement.addEventListener('mousemove', this.onMousemove.bind(this), false);
    this.onInitialize();
  },

  // mounted生命周期钩子函数
  mounted() {
    // 配置activity页面跳转
    // this.$activityManager = RootActivityManager.currentActivityManager;
    this.$nextTick(function() {
      console.log('菜单渲染完毕');
      this.openPage();
    });
  },
  // 声明方法
  // 页面中的同名方法会覆盖mixin中的同名方法，以页面中的方法为准
  methods: {
    onInitialize() {
      // console.log('[BasicActivity] onInitialize');
    },
    onClose() {
      // console.log('[BasicActivity] onClose');
    },
    onTimeout() {
      console.warn('[BasicActivity] onTimeout');
    },
    onMousemove() {
      this.$globalTimer.pause();
      this.$globalTimer.setTimeout(60);
      this.$globalTimer.start();
    },
    openPage() {}
  }
};
