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
@Component
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
  // mounted() {
  //   console.log('parentaa', this.$parent.aa);
  // },
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
.left,.right{

}

</style>
