'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CountDownTimeoutMode = exports.CountDownTimerStatus = exports.CountDownTimer = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _awpPluginInteractionChecker = require('awp-plugin-interaction-checker');

var _timer = require('./timer');

var _timer2 = _interopRequireDefault(_timer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CountDownTimerStatus = {
  started: 0,

  stopped: 1,

  paused: 2
};

var CountDownTimeoutMode = {
  alawaysCountDown: 0,

  resetOnInput: 1
};

var mainTimerInterval = 1000;
var checkInputTimerInterval = 1000;
var CountDownTimer = function () {
  function CountDownTimer() {
    var _this = this;
    (0, _classCallCheck3.default)(this, CountDownTimer);
    this._remainingSeconds = 0;
    this._timeoutSeconds = 0;
    this._timerStatus = CountDownTimerStatus.paused;
    this._timeoutMode = CountDownTimeoutMode.alawaysCountDown;

    this.mainTimer = new _timer2.default();
    this.mainTimer.isTimerLoop = false;
    this.mainTimer.interval = mainTimerInterval;
    this.mainTimer.tick = function () {
      _this.mainTimerEvent();
    };

    this.checkInputTimer = new _timer2.default();
    this.checkInputTimer.isTimerLoop = false;
    this.checkInputTimer.interval = checkInputTimerInterval;
    this.checkInputTimer.tick = function () {
      _this.checkInputTimerEvent();
    };
  }

  (0, _createClass3.default)(CountDownTimer, [{
    key: 'setTimeout',
    value: function setTimeout(seconds) {
      this.stop();
      this.timeoutSeconds = seconds;
      this.remainingSeconds = seconds;
    }
  }, {
    key: 'start',
    value: function start() {
      this.remainingSeconds = this.timeoutSeconds;
      this.mainTimer.start();
      if (this.timeoutMode == CountDownTimeoutMode.resetOnInput) {
        this.checkInputTimer.start();
      }
      this._timerStatus = CountDownTimerStatus.started;
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.mainTimer.stop();
      this.checkInputTimer.stop();

      this.remainingSeconds = 0;
      this._timerStatus = CountDownTimerStatus.stopped;
    }
  }, {
    key: 'pause',
    value: function pause() {
      if (this._timerStatus == CountDownTimerStatus.started) {
        this.mainTimer.stop();
        this.checkInputTimer.stop();

        this._timerStatus = CountDownTimerStatus.paused;
      }
    }
  },{
    key: 'resume',
    value: function resume() {
      if (this._timerStatus != CountDownTimerStatus.paused) {
        return;
      }
      this.mainTimer.start();
      if (this.timeoutMode == CountDownTimeoutMode.resetOnInput) {
        this.checkInputTimer.start();
      }
      this._timerStatus = CountDownTimerStatus.started;
    }
  }, {
    key: 'reset',
    value: function reset() {
      if (this._timerStatus == CountDownTimerStatus.stopped) {
        return;
      }
      this.stop();
      this.start();
    }
  }, {
    key: 'countDownTimeout',
    value: function countDownTimeout() {
      if (this.onTimeout && typeof this.onTimeout == "function") {
        this.onTimeout();
      }
    }
  }, {
    key: 'mainTimerEvent',
    value: function mainTimerEvent() {
      this.remainingSeconds--;

      if (this.remainingSeconds <= 0) {
        this.stop();
        this._timerStatus = CountDownTimerStatus.stopped;
        this.countDownTimeout();
      } else {
        this.mainTimer.start();
      }
    }
  }, {
    key: 'checkInputTimerEvent',
    value: function checkInputTimerEvent() {
      var _this2 = this;

      _awpPluginInteractionChecker.InteractionChecker.checkUserInputAsync(checkInputTimerInterval, function (isReset) {
        if (isReset) {
          _this2.reset();
        }
        _this2.checkInputTimer.start();
      });
    }
  }, {
    key: 'remainingSeconds',
    get: function get() {
      return this._remainingSeconds;
    },
    set: function set(seconds) {
      this._remainingSeconds = seconds;
    }
  }, {
    key: 'timeoutSeconds',
    get: function get() {
      return this._timeoutSeconds;
    },
    set: function set(seconds) {
      this._timeoutSeconds = seconds;
    }
  }, {
    key: 'timerStatus',
    get: function get() {
      return this._timerStatus;
    }
  }, {
    key: 'timeoutMode',
    get: function get() {
      return this._timeoutMode;
    },
    set: function set(mode) {
      this._timeoutMode = mode;
    }
  }]);
  return CountDownTimer;
}();

exports.CountDownTimer = CountDownTimer;
exports.CountDownTimerStatus = CountDownTimerStatus;
exports.CountDownTimeoutMode = CountDownTimeoutMode;
//# sourceMappingURL=count-down-timer.js.map
