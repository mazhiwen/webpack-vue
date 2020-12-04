<template>
  
  <div>
    <VirtualTable
      :data="data"
      :rowHead="rowHead"
      :columnHead="columnHead"
      :columnWidth="130"
    />
  </div>
</template>

<script>
let now = Date.now();
let textList = [
  '小小',
  '中大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大',
  '大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大'
];

const data = [];
let i = 0;

const rowHeadData = [];
while (i<50) {
  data[i] = [];
  rowHeadData.push({
    value: `第${i}行`
  });
  let j = 0;
  while (j<20) {
    data[i].push({
      value: `${i}-${j}:${textList[(i+j)%3]}`
    });
    j++;
  }
  i++;
  
}
i = 0;
const columnHeadData = [];
while (i<10) {
  columnHeadData.push({
    value: `第${i}列`
  });
  i++;
}
console.log('data 生成耗时',Date.now() - now);

export default {
  data() {
    return {
      data,
      rowHead:rowHeadData,
      columnHead:columnHeadData
    };
  },
  computed: {

  },
  created() {


  },
  mounted() {
    // 初始化渲染
    // this.onScroll();
  },
  updated() {
    // this.setItemPositionsCache();
  },
  methods: {
    
    getColumnWidth(columnIndex) {
      if (this.widthList[columnIndex]) {
        return this.heightList[columnIndex];
      } 
      return this.defaultColumnWidth;
    }
  },
};
</script>

<style lang="less">


</style>
