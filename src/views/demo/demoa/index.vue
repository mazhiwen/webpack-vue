<template>
  <div class="page_demoa">

  </div>
</template>

<script lang="ts">


import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import testClass from './test.js'

import anime from 'animejs/lib/anime.es';


@Component({
  // components: { Button },
})
export default class extends Vue{
  
  // components: {

  // },
  // props: {

  // },
  thegif
  // newtestClass = newtestClass
  testlist = [1,2,3,4,5]
  show = false
  // get testlist() {
  //   return this.newtestClass.list
  // }
  
  // watch: {
  // },
  // created() {
  // },
  mounted() {
    anime({
      targets: '.blockitem',
      // opacity: 0,
      duration: 6000,
      translateX: anime.stagger(100),
      // loop: true,
      direction: 'alternate',
      easing: 'easeInOutExpo',
    });


  }

  btnClick(type) {
    
  }

  
};
</script>

<style lang="less">

.blockitem{
  width: 40px;
  height: 40px;
  background: red;
  margin-top: 10px;
}
</style>
