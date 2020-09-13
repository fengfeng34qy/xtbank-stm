<template>
  <div class="child2">
    <span>{{session}}---{{normalizedSize}}</span><br>
    <div>第3个子组件</div>
    <div class="child2">
      <input type="button" @click="changeTitle" value="click">
      <v-chart theme="ovilia-green" :options="option"/>
      <aui-button @click="vueMetroTile" :fill="true">vue-metro-tile</aui-button>
    </div>
  </div>
</template>

<script>

import child1 from '@/modules/test1/child';
import child3 from '@/modules/test1/child3';
import MetroTile from 'vue-metro-tile';
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/pie';
// import 'echarts/lib/component/polar';
// import 'echarts-gl';

export default {
  name: 'child2',
  props: ['session'],
  computed: {
    normalizedSize() {
      return this.session;
    }
  },
  data() {
    let data = [];

    for (let i = 0; i <= 360; i++) {
      let t = i / 180 * Math.PI;
      let r = Math.sin(2 * t) * Math.cos(2 * t);
      data.push([r, i]);
    }
    return {
      option: {
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    };
  },
  created() {},
  components: {
    MetroTile,
    'v-chart': ECharts
  },
  methods: {
    changeTitle() {
      this.$emit('pageChange', child1);
    },
    vueMetroTile() {
      this.$emit('pageChange', child3);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.child2{
  height: 316px;
}
</style>
