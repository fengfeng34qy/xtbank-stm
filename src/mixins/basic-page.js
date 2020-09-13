// 导入输入场检验的ui组件
import { Validator } from 'aui-ss';

export default {
  name: "basic-page",
  // 混合相关mixin
  mixins: [Validator.Mixin],
  props: ['dm', 'session'],
  created() {
    this.setTimeout(60);
    this.onInitialize();
  },
  mounted() {
    if (!this.$store.state.nextTradeConfig.tradeCNName) {
      this.$router.replace('/');
    }
  },
  methods: {
    onInitialize() {},
    setTimeout(timeoutSeconds) {
      this.$globalTimer.setTimeout(timeoutSeconds);
      this.$globalTimer.start();
    },
    abort() {
      console.log('abort');
    }
  }
};
