<template>
  <div class="Home" @click="toMenu">
    <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="toMenu" @click.prevent="toMenu">
      <!-- slides -->
      <swiper-slide>
        <img src="static/resource/ads/2.png" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="static/resource/ads/3.png" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="static/resource/ads/4.png" alt="">
      </swiper-slide>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"  slot="pagination"></div>

      <!-- 如果需要导航按钮 -->
      <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
      <!-- <div class="swiper-button-next" slot="button-next"></div> -->

      <!-- 如果需要滚动条 -->
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'carrousel',
  data() {
    return {
      swiperOption: {
        autoplay: 3000,
        effect: 'slide', // 'slide' | 'cube'
        // initialSlide: 2,
        disableOnInteraction: false,
        on: {
          tap() {
            console.log('sdsd');
            // const { realIndex } = this;
            // this.handleClickSlide(realIndex);
          }
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log('this is current swiper instance object', this.swiper);
    // this.swiper.slideTo(3, 1000, false);
    // console.log(myPlug)
  },
  methods: {
    toMenu() {
      this.$router.push({path: '/trade-menu'});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Home {
  width: 100%;
  height: 100%;
}
.swiper-container{
  width: 100%;
  height: 100%;
}
.swiper-slide{
  background: #eee;
}
.swiper-slide img{
  width: 100%;
  height: 100%;
}
</style>
