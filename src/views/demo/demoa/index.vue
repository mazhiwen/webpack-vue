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

    <p>212</p>
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
    // let fra = window.document.createDocumentFragmentent;

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
p {
  position: relative;
  line-height: 1.5em;
  /*高度为需要显示的行数*行高，比如这里我们显示两行，则为3*/
  height: 3em;
  overflow: hidden;
  width: 50px;
}
p:after {
  content: '...';
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #fff;
}

</style>
