<template>
  
  <div
    style="height:400px"
  >
    <VirtualTable
      :data="data"
      :rowHead="rowHead"
      :columnHead="columnHead"
      :rowHeadFixed="rowHeadFixed"
      :columnHeadFixed="columnHeadFixed"
      :rowHeight="rowHeight"
      :tableHeight="'auto'"
      width="100%"
    />
    <el-button @click="changeData">data</el-button>
    <el-button @click="changerowHead">rowHead</el-button>
    <el-button @click="changecolumnHead">columnHead</el-button>
    <el-button @click="changerowHeadfix">rowHeadfix</el-button>
    <el-button @click="changecolumnHeadfix">columnHeadfix</el-button>
    <el-button @click="changeWidth">changeWidth</el-button>
    <el-button @click="changerowHeight">changerowHeight</el-button>
  </div>


  
</template>

<script>

let now = Date.now();
let textList = [
  '小小',
  '中大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大',
  '大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大'
];

let rowCount = 7;
let columnCount = 20;

const data = [];
let i = 0;

while (i<rowCount) {
  data[i] = [];
  let j = 0;
  while (j<columnCount) {
    data[i].push({
      value: `${i}-${j}:${textList[(i+j)%3]}`,
      row: i,
      column: j,
    });
    j++;
  }
  i++;
  
}
// data[10][10].colSpan = 2;
data[5][5].spanStartRow = 5;
data[5][5].spanStartColumn = 5;
data[5][5].rowSpan = 2;
// data[5][5].columnSpan = 2;



// 列头数据
i = 0;
const columnHeadData = [];
while (i<4) {
  columnHeadData[i] = [];
  let j = 0;
  while (j<columnCount) {
    columnHeadData[i].push({
      value: `第${i}-${j}列`,
      row: i,
      column: j,
    });
    j++;
  }
  i++;
}
columnHeadData[1][4].spanStartRow = 1;
columnHeadData[1][4].spanStartColumn = 4;
columnHeadData[1][4].rowSpan = 2;
columnHeadData[1][4].colSpan = 2;


// 行头数据
i = 0;
const rowHeadData = [];
while (i<rowCount) {
  rowHeadData[i] = [];
  let j = 0;
  while (j<2) {
    rowHeadData[i].push({
      value: `第${i}-${j}行`,
      row: i,
      column: j,
    });
    j++;
  }
  i++;
}
rowHeadData[4][0].spanStartRow = 1;
rowHeadData[4][0].spanStartColumn = 4;
rowHeadData[4][0].rowSpan = 2;
rowHeadData[4][0].colSpan = 2;




console.log('data 生成耗时',Date.now() - now);
export default {
  data() {
    return {
      data: null,
      rowHead:null,
      columnHead:null,
      rowHeadFixed: false,
      columnHeadFixed: true,
      width: 400,
      rowHeight: 30,
      
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
    
    changeData() {
      this.data = data;
    },
    changerowHead() {
      this.rowHead = rowHeadData;
    },
    changecolumnHead() {
      this.columnHead = columnHeadData;
    },
    changerowHeadfix() {
      this.rowHeadFixed = !this.rowHeadFixed;
    },
    changecolumnHeadfix() {
      this.columnHeadFixed = !this.columnHeadFixed;
    },
    changeWidth() {
      this.width += 100;
    },
    changerowHeight() {
      this.rowHeight += 10;
    },

    
  },
};
</script>

<style lang="less">


</style>
