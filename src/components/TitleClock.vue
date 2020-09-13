<template>
  <div class="title-clock">
    <aui-row>
      <aui-col>
        {{date}}
      </aui-col>
    </aui-row>
    <aui-row>
      <aui-col>
        <span>{{week}}</span><span class="span-margin">{{time}}</span>
      </aui-col>
    </aui-row>
  </div>
</template>

<script>
export default {
  name: 'title-clock',
  data () {
    return {
      date: "2017年01月01日",
      time: "10:00:00",
      week: "星期一"
    };
  },
  created () {
    this.updateDateTime();
    setInterval(this.updateDateTime, 1000);
  },
  methods: {
    updateDateTime () {
      let objD = new Date();
      let date;
      let time;
      let yy = objD.getYear();
      if (yy < 1900) yy = yy + 1900;
      let MM = objD.getMonth() + 1;
      if (MM < 10) MM = '0' + MM;
      let dd = objD.getDate();
      if (dd < 10) dd = '0' + dd;
      let hh = objD.getHours();
      if (hh < 10) hh = '0' + hh;
      let mm = objD.getMinutes();
      if (mm < 10) mm = '0' + mm;
      let ss = objD.getSeconds();
      if (ss < 10) ss = '0' + ss;
      date = yy + "年" + MM + "月" + dd + "日";
      time = hh + ": " + mm;
      this.date = date;
      this.time = time;
      this.week = "星期" + "日一二三四五六".charAt(objD.getDay());
    }
  }
};
</script>

<style scoped>
  .span-margin {
    margin-left:14px;
  }
</style>
