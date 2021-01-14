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

<script>

import {
  copy,
} from 'utils';
import request from 'request';


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


export default {
  components: {

  },
  props: {

  },
  data() {
    return {

      content: '',
      config: {
        wordType: {
          keyword: ['keyworda', 'keywordb'],
          condition: ['if', 'else'],
          operator: ['>', '='],
          split: [';'],
          function: ['add'],
        },
      },
      show: false,
      // ruleDataController: new this.$EditorDataController.DataController({
      // }),
    };
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
    // this.$parent.parentm();
    console.log('parentaa', this.$parent.aa);
  },
  methods: {
    // throttle,
    btnClick(type) {
      import(/* webpackChunkName: "type" */ `./${type}`).then((data) => {
        console.log(data)
      })
    },
    btnmove: throttle((e) => {
      console.log('执行函数', e);
    }, 100),
    compositionupdate(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="less">
.left,.right{

}

</style>
