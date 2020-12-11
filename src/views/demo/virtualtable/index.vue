<template>
  
  <div
    style="height:400px"
  >
    <VirtualTable
      :data="data"
      :rowHead="null"
      :columnHead="columnHead"
      :tableHeight="'400px'"
      :rowHeadFixed="rowHeadFixed"
      :columnHeadFixed="columnHeadFixed"
      :fixedColumnIndex="-1"
      @onScroll="onScrollRightEdge"
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

let rowCount = 200;
let columnCount = 200;

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
// data[10][10].colSpan = 2;
data[5][5].spanStartRow = 5;
data[5][5].spanStartColumn = 5;
data[5][5].rowSpan = 2;
// data[5][5].columnSpan = 2;



// 列头数据
const columnHeadData = [];
// let originColumnHeadData = [
//   {
//     value: 1
//   },
//   {
//     value: 2,
//     children: [
//       {
//         value: '2-1'
//       },
//       {
//         value: '2-2',
//         children: [
//           {
//             value: '2-2-1'
//           },
//           {
//             value: '2-2-2'
//           },  
//         ]
//       },
//       {
//         value: '2-2'
//       },  
//     ]
//   },
//   {
//     value: 3,
//     children: [
//       {
//         value: '3-1'
//       },
//       {
//         value: '3-2'
//       },  
//     ]
//   }
// ]


// let rowData = [];
// originColumnHeadData.forEach((value,index)=>{
//   rowData.push({
//     value: value.value
//   })
// })


i = 0;
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
// columnHeadData[1][4].spanOffsetStartRow = 0;
// columnHeadData[1][4].spanOffsetStartColumn = 0;
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
// console.log(data);
export default {
  data() {
    return {
      data: Object.freeze(data),
      rowHead:rowHeadData,
      columnHead:columnHeadData,
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
    onScrollRightEdge(toRight, toBottom) {
      // console.log('onScroll',toRight,toBottom);
      // 
      // 区块划分：每块的长度n*n 一般是固定写死的. 
      // 区块的位置表示：起始坐标(x*n,y*n), 长度n 
      // 初始化加载 n*n数据
      // 滑动时 判断，获取，填充 当前可视区域数据区块 周边8个格子的数据

      if (toBottom < 50) { 
        let data = [];
        // this.data.forEach((value)=>{
          
        //   value = value.concat(value);
        //   data.push(value);
        // })
        // request(pageNum,pageSize);
        this.data = this.data.concat(this.data);
        // console.log(data);
      } 
      
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

    
  },
};
</script>

<style lang="less">


</style>
