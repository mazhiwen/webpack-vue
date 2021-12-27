<template>
  <VirtualList
    :data="data"
    :rowHeight="120"
  >
    <template
      v-slot:default="slotProps"
    >
      {{ slotProps.rowData.value }} --slot
    </template>
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
const now = Date.now();

const textList = [
  '小小',
  '中大大大大大大大大',
  '大大大大大大大大大大大大大大大大大大大大大大大大大',
];


const data = [];
let i = 0;
while (i < 100) {
  data.push({
    value: `${i}:${textList[i % 3]}`,
  });
  i++;
}
console.log('data 生成耗时', Date.now() - now);


export default {
  components: {
    VirtualList,
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


</style>
