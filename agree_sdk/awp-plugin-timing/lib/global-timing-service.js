'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalTimingService = undefined;

var _countDownTimer = require('./count-down-timer');

var countDownTimer = new _countDownTimer.CountDownTimer();

var GlobalTimier = {
  getCountDownTimer: function getCountDownTimer() {
    return countDownTimer;
  }
};

exports.GlobalTimingService = GlobalTimier;
//# sourceMappingURL=global-timing-service.js.map
