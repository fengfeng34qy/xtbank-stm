"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Timer = function () {
  function Timer() {
    (0, _classCallCheck3.default)(this, Timer);
    this._interval = 1000;
    this._isTimerStop = false;
    this._isTimerLoop = true;
  }

  (0, _createClass3.default)(Timer, [{
    key: "tickEvent",
    value: function tickEvent() {
      if (typeof this._tick != "function") {
        console.log("tick:" + this._tick + ",tick is not function.");
        return;
      }
      if (!this._isTimerStop) {
        this._tick();
      }
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      this._isTimerStop = false;
      if (this._isTimerLoop) {
        this.timer = setInterval(function () {
          _this.tickEvent();
        }, this.interval);
      } else {
        this.timer = setTimeout(function () {
          _this.tickEvent();
        }, this.interval);
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      this._isTimerStop = true;

      if (this._isTimerLoop) {
        clearInterval(this.timer);
      } else {
        clearTimeout(this.timer);
      }
    }
  }, {
    key: "interval",
    get: function get() {
      return this._interval;
    },
    set: function set(seconds) {
      this._interval = seconds;
    }
  }, {
    key: "tick",
    get: function get() {
      return this._tick();
    },
    set: function set(func) {
      this._tick = func;
    }
  }, {
    key: "isTimerLoop",
    get: function get() {
      return this._isTimerLoop;
    },
    set: function set(isLoop) {
      this._isTimerLoop = isLoop;
    }
  }, {
    key: "isTimerStop",
    get: function get() {
      return this._isTimerStop;
    }
  }]);
  return Timer;
}();

exports.default = Timer;
;
//# sourceMappingURL=timer.js.map
