'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var currentPlayed = void 0;
var lastRunTime = Date.now();

exports.default = {
  getAudio: function getAudio(name) {
    var target = document.querySelector('audio[data-' + name + ']');
    return target;
  },
  install: function install(Vue, audios) {
    var frag = document.createDocumentFragment();
    audios.forEach(function (value, index, array) {
      var audio = document.createElement('audio');
      audio.src = value.path;
      audio.setAttribute('data-' + value.name, value.name);
      frag.appendChild(audio);
    });
    document.body.appendChild(frag);
  },
  play: function play(name) {
    var currentTime = Date.now();
    var protectTime = 100;
    if (currentTime - lastRunTime < protectTime) {
      return;
    }
    if (!name || typeof name !== "string") {
      throw Error('参数有错误');
    }
    var target = this.getAudio(name);
    if (!target) {
      throw Error('没有找到资源');
    }
    if (!currentPlayed) {
      currentPlayed = target;
      currentPlayed.play();
    } else {
      currentPlayed.pause();
      currentPlayed.currentTime = 0;

      currentPlayed = target;
      currentPlayed.play();
    }
    lastRunTime = Date.now();
  },
  pause: function pause() {
    currentPlayed.pause();
  },
  isEnded: function isEnded() {
    if (!currentPlayed) {
      throw Error('并没有音频正在播放');
    }
    return currentPlayed.ended;
  },
  setPlaybackRate: function setPlaybackRate(name, rate) {
    if (name && rate && typeof name === "string" && typeof rate === "number") {
      var target = this.getAudio(name);
      target.playbackRate = rate;
    } else {
      throw Error('参数有错误');
    }
  }
};
//# sourceMappingURL=audio.js.map
