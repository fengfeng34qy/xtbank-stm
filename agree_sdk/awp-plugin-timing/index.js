'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalTimingService = exports.CountDownTimeoutMode = exports.CountDownTimerStatus = exports.CountDownTimer = exports.Timer = undefined;

var _timer = require('./lib/timer');

var _timer2 = _interopRequireDefault(_timer);

var _countDownTimer = require('./lib/count-down-timer');

var _globalTimingService = require('./lib/global-timing-service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Timer = _timer2.default;
exports.CountDownTimer = _countDownTimer.CountDownTimer;
exports.CountDownTimerStatus = _countDownTimer.CountDownTimerStatus;
exports.CountDownTimeoutMode = _countDownTimer.CountDownTimeoutMode;
exports.GlobalTimingService = _globalTimingService.GlobalTimingService;
//# sourceMappingURL=index.js.map
