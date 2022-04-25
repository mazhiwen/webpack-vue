<template>
  <div class="page_demoa">

    <svg viewBox="-3 0 33 10" xmlns="http://www.w3.org/2000/svg">
  <!-- No dash array -->
  <line x1="0" y1="1" x2="30" y2="1" stroke="black" />

  <!-- No dash offset -->
  <line x1="0" y1="3" x2="30" y2="3" stroke="black"
        stroke-dasharray="3 1" />

        <line x1="0" y1="5" x2="30" y2="5" stroke="black"
        stroke-dasharray="5"
        stroke-dashoffset="2" />
    </svg>
    <div v-for="(item,index) in testlist"
      class="blockitem"
      :key="index"
    >
      {{item}}
    </div>
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
