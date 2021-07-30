<template>
  <div class="page_demoa">
    <Card>
      <transition name="fade">
        <h1 v-if="show">
          content
        </h1>
      </transition>
      <el-button @click="btnClick('a')">a</el-button>
      <el-button @click="btnClick('b')">b</el-button>
    </Card>

      <video
        id="example-video" width="600" height="300"
        class="video-js vjs-default-skin vjs-big-play-centered" poster=""
        data-setup='{}'
      >
      </video>
  </div>
</template>

<script lang="ts">


import { Vue, Component, Prop, Watch } from 'vue-property-decorator'



const throttle = function (fn, interval) {
  const handler = fn;
  let timer;
  let firstTime = true;
  return function () {
    const args = arguments;
    const innerThis = this;
    if (firstTime) {
      handler.apply(innerThis, args);
      firstTime = false;
      return;
    }
    if (timer) {
      return false;
    }
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      handler.apply(innerThis, args);
    }, interval || 500);
  };
};
@Component({
  // components: { Button },
})
export default class extends Vue{
  
  // components: {

  // },
  // props: {

  // },
  show = false
  // computed: {
  // },
  // watch: {
  // },
  // created() {
  // },
  mounted() {
  }

  btnClick(type) {
    import(/* webpackChunkName: "type" */ `./${type}`).then((data) => {
      console.log(data)
    })
  }
  // btnmove: throttle((e) => {
  //   console.log('执行函数', e);
  // }, 100)
  
};
</script>

<style lang="less">
.a1 {
  position: relative;
  background: red;
}
.a2{
  position: absolute;
  background: blue;
}
.a3 {
  position: absolute;
  background: gray;
}

</style>
