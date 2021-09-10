<template>

  <VirtualList
    :data="data"
  >

  </VirtualList>
    


</template>

<script>
import VirtualList from './VirtualList';

/**
 * virtuallist_allcontent ：
 * 一个空的模拟实际内容高度的块，用来使父组建生成滚动条。
 * 
 * 
 * virtuallist_visiblecontent: 实际生成的DOMlist容器
 * 
 * 
 * 
 */
let now = Date.now();

let textList = [
  '小小',
  '中大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大',
  '大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大'
];


const data = [];
let i = 0;
while (i<100000) {
  data.push({
    value: `${i}:${textList[i%3]}`
  });
  i++;
}
console.log('data 生成耗时',Date.now() - now);





export default {
  components:{
    VirtualList
  },
  data() {
    return {
      data,
    };
  },
  computed: {

  },
  created() {
  },
  mounted() {
    
  },
  updated() {
  },
  methods: {

  },
};
</script>

<style lang="less">
.virtuallist_wrap{
  height: 300px;
  width: 300px;
  background: lightgray;
  position: relative;
  overflow: scroll;
  .virtuallist_allcontent{
    position: absolute;
    height: 1000px;
    width: 100%;
    background: lightyellow;
  }
  .virtuallist_visiblecontent{
    position: absolute;
    background: lightpink;
    width: 100%;

  }
  .virtuallist_item{
    // line-height: 50px;
    outline: 1px solid red;
  }
}

</style>
