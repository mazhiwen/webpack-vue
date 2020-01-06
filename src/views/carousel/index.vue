<template>
<div class="page_carousel">
  <Carousel
    :data="data"
  >
    <template v-slot:default="slotProps">
      <div
        class="item"
        :style="{
          background:slotProps.rowData.color
        }"
      >
        {{slotProps.rowData.text}}
      </div>
    </template>
  </Carousel>





</div>
</template>

<script>

import {
  copy
} from 'utils';

export default {
  data() {
    return {
      data: [
        {
          text: 1,
          color: 'red'
        },
        {
          text: 2,
          color: 'blue'
        },
        // {
        //   text: 3,
        //   color: 'gray'
        // },
        // {
        //   text: 4,
        //   color: 'pink'
        // },
        // {
        //   text: 5,
        //   color: 'gold'
        // },
      ],
    };
  },
  created() {
    
  },
  mounted() {


  },
  methods: {
    
  }
};
</script>

<style lang="less">

</style>>

