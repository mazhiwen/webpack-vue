<template>
  
  <div
    style="height:400px"
  >
    <VirtualTable
      :data="data"
      :rowHead="null"
      :columnHead="columnHead"
      :columnWidth="150"
      :tableHeight="'350px'"
      :fixedColumnIndex="1"
      :rowHeadFixed="rowHeadFixed"
      @onScroll="onScroll"
    />
    <el-button @click="changeData">data</el-button>
    <el-button @click="changerowHead">rowHead</el-button>
    <el-button @click="changecolumnHead">columnHead</el-button>
    <el-button @click="changerowHeadfix">rowHeadfix</el-button>
    <el-button @click="changecolumnHeadfix">columnHeadfix</el-button>
    <el-button @click="changeWidth">changeWidth</el-button>
    <el-button @click="changerowHeight">changerowHeight</el-button>
    <el-button @click="changeData1">changeData1</el-button>
    <div
      :style="{width: `${testwidth}px`}"
      style="background:red;height:20px"

    >test</div>
  </div>


  
</template>

<script>

let now = Date.now();
let textList = [
  '小小',
  '中大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大',
  '大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大'
];

let rowCount = 20;
let columnCount = 200;





function generateData(rowCount, columnCount) {

  let data = [];
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
  // data[0][0].spanStartRow = 0;
  // data[0][0].spanStartColumn = 0;
  // data[0][0].rowSpan = 3;
  // data[0][0].colSpan = 1;
  // data[1][0].spanStartRow = 0;
  // data[1][0].spanStartColumn = 0;
  // data[1][0].rowSpan = 3;
  // data[1][0].colSpan = 1;
  // data[2][0].spanStartRow = 0;
  // data[2][0].spanStartColumn = 0;
  // data[2][0].rowSpan = 3;
  // data[2][0].colSpan = 1;
  // data[3][0].spanStartRow = 3;
  // data[3][0].spanStartColumn = 0;
  // data[3][0].rowSpan = 3;
  // data[3][0].colSpan = 1;
  // data[4][0].spanStartRow = 3;
  // data[4][0].spanStartColumn = 0;
  // data[4][0].rowSpan = 3;
  // data[4][0].colSpan = 1;
  // data[5][0].spanStartRow = 3;
  // data[5][0].spanStartColumn = 0;
  // data[5][0].rowSpan = 3;
  // data[5][0].colSpan = 1;
  // data[13][0].spanStartRow = 13;
  // data[13][0].spanStartColumn = 0;
  // data[13][0].rowSpan = 7;
  // data[13][0].colSpan = 1;
  return data;
}

const data = generateData(rowCount,columnCount);


// 列头数据
const columnHeadData = [];
let i = 0;
while (i<3) {
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

columnHeadData[0][0].spanStartRow = 0;
columnHeadData[0][0].spanStartColumn = 0;
columnHeadData[0][0].rowSpan = 3;
columnHeadData[0][0].colSpan = 1;
columnHeadData[1][0].spanStartRow = 0;
columnHeadData[1][0].spanStartColumn = 0;
columnHeadData[2][0].spanStartRow = 0;
columnHeadData[2][0].spanStartColumn = 0;

console.log(columnHeadData);

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
// rowHeadData[0][0].spanStartRow = 0;
// rowHeadData[0][0].spanStartColumn = 0;
// rowHeadData[0][0].rowSpan = 2;
// rowHeadData[0][0].colSpan = 2;




console.log('data 生成耗时',Date.now() - now);
// console.log(data);
export default {
  data() {
    return {
      data: Object.freeze(data),
      rowHead:Object.freeze(rowHeadData),
      columnHead:Object.freeze(columnHeadData),
      rowHeadFixed: false,
      columnHeadFixed: true,
      width: 400,
      rowHeight: 30,
      isScroll: true,
      testwidth: 0
    };
  },
  computed: {

  },
  created() {


  },
  mounted() {
    // 初始化渲染
    // this.onScroll();
    // requestAnimationFrame(this.testsetwidth);
  },
  updated() {
    // this.setItemPositionsCache();
  },
  methods: {
    testsetwidth(){
      console.log('testsetwidth');
      if(this.testwidth<200){
        this.testwidth += 1;
        requestAnimationFrame(this.testsetwidth);
      }
      
    },
    onScroll(toRight, toBottom) {
      // console.log('onScroll',toRight,toBottom);
      // 
      // 区块划分：每块的长度n*n 一般是固定写死的. 
      // 区块的位置表示：起始坐标(x*n,y*n), 长度n 
      // 初始化加载 n*n数据
      // 滑动时 判断，获取，填充 当前可视区域数据区块 周边8个格子的数据
      // if (toBottom < 50 && this.isScroll) { 
      //   let data = [];

      //   this.isScroll = false;
      //   setTimeout(()=>{
      //     this.data = Object.freeze(this.data.concat(this.data));
      //   }, 3*1000)
        
      // } 
      
    },
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
    changeData1() {
      this.data = generateData(10,10);
    }
    
  },
};
</script>

<style lang="less">


</style>
