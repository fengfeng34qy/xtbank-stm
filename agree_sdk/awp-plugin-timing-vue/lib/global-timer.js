'use strict';

var _awpPluginTiming = require('awp-plugin-timing');

module.exports.install = function (Vue, options) {
  console.log('Vue GlobalTimer install');

  Vue.prototype.$globalTimer = _awpPluginTiming.GlobalTimingService.getCountDownTimer();
  Vue.prototype.$globalTimerMode = _awpPluginTiming.CountDownTimeoutMode;
};
//# sourceMappingURL=global-timer.js.map
