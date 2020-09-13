export default {
  debounce(g,ms,flag){
    var t = null;
    return function(){
      var n = this;
      var l = arguments;
      var C = function(){
        t = null,
        flag || g.apply(n,l);
      };
      var A=flag && !t;
      clearTimeout(t);
      t=setTimeout(C,ms);
      A&&g.apply(n,l);
    };
  }
}
