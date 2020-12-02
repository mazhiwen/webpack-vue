<template>

  <!-- <div class="virtuallist_wrap"
    @scroll="onScroll"
  >
    <div
      class="virtuallist_allcontent"
      :style="{
        height: `${allHeight}px`
      }"
    >
    </div>
    <div
      class="virtuallist_visiblecontent"
      :style="{
        transform: contentTransform
      }"
    >
      <div
        ref="virtuallist_item"
        v-for="(value, index) in visibleData"
        :key="index"
        class="virtuallist_item"
        :style="{
          height: itemHeight?`${itemHeight}px`:''
        }"
      >{{value.value}}</div>
    </div>
    
  </div> -->
  <div class="d_table"
    @scroll="onScroll"
  >
    <div
      class="d_table_allcontent"
      :style="{
        height: `${allHeight}px`,
        width: `${allWidth}px`
      }"
    >
    </div>
    <div
      v-if="isHadRowHead"
      class="d_table_rowhead"
      :style="{
        transform: rowHeadTransform
      }"
    >
      <div
        v-for="(rowHead, rowHeadIndex) in visibleRowHeadData"
        :key="rowHeadIndex"
        class="rowhead_cell"
        :style="{
          height: `${getRowHeight(startRowIndex+rowHeadIndex)}px`,
          width: `${rowHeadWidth}px`
        }"
      >
        {{rowHead.value}}
      </div>
    </div>
    <div
      v-if="isHadColumnHead"
      class="d_table_columnhead"
      :style="{
        transform: columnHeadTransform
      }"
    >
      <div
        v-for="(rowHead, columnHeadIndex) in visibleColumnHeadData"
        :key="columnHeadIndex"
        class="columnhead_cell"
        :style="{
          height: `${columnHeadHeight}px`,
          width: `${getColumnWidth((startColumnIndex+columnHeadIndex))}px`
        }"
      >
        {{rowHead.value}}
      </div>
    </div>
    <div class="d_table_content"
      :style="{
        transform: contentTransform
      }"
    >
      <div
        v-for="(row, rowIndex) in visibleData"
        :key="rowIndex"
        class="d_table_row"
      >
        <div
          v-for="(colum, columIndex) in row"
          :key="columIndex"
          class="d_table_cell"
          :style="{
            height: `${getRowHeight(startRowIndex+rowIndex)}px`,
            width: `${getColumnWidth(startColumnIndex+columIndex)}px`
          }"
        >
          {{colum.value}}
        </div>
      </div>  
    </div>

  </div>
  

</template>

<script>
/**
 * virtuallist_allcontent ：
 * 一个空的模拟实际内容高度的块，用来使父组建生成滚动条。
 * 
 * 
 * virtuallist_visiblecontent: 实际生成的DOMlist容器
 * 
 * 行头：有多少条行数据 就有多少条 行头
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

const rowHeadData = [];
while (i<100) {
  data[i] = [];
  rowHeadData.push({
    value: `第${i}行`
  });
  let j = 0;
  while (j<100) {
    data[i].push({
      value: `${i}-${j}:${textList[(i+j)%3]}`
    });
    j++;
  }
  i++;
  
}
i = 0;
const columnHeadData = [];
while (i<100) {
  columnHeadData.push({
    value: `第${i}列`
  });
  i++;
}
console.log('data 生成耗时',Date.now() - now);

let countScrollEvet = 0;

function throttle(fn) {
  let canRun = true; // 通过闭包保存一个标记
  return function () {
    if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
    canRun = false; // 立即设置为false
    setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
      fn.apply(this, arguments);
      // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
      canRun = true;
    }, 50);
  };
}


export default {
  data() {
    return {
      throttle,
      data,
      visibleData: [],
      contentTransform: 'translate3d(0, 0, 0)',
      itemHeight: null,
      itemPositionsCache:[
      ],
      startIndex: 0,
      lastStartIndex: 0,
      allWidth: 0,
      allHeight: 0,
      heightList: [],
      widthList: [],
      defaultRowHeight: 50,
      defaultColumnWidth: 100,
      startRowIndex: 0,
      startColumnIndex: 0,
      // 行头部相关数据
      isHadRowHead: true,
      rowHeadData,
      visibleRowHeadData: [],
      rowHeadTransform: 'translate3d(0, 0, 0)',
      rowHeadWidth: 0, 
      rowHeadFixed: true,
      // 列头部相关数据
      isHadColumnHead: true,
      columnHeadData,
      visibleColumnHeadData: [],
      columnHeadTransform: 'translate3d(0, 0, 0)',
      columnHeadHeight: 0, // 行头部宽度
      columnHeadFixed: true
    };
  },
  computed: {
    // allHeight() {
    //   //allHeight : 实际全部的内容自由撑开的总高度

    //   // return this.data.length * this.itemHeight;
    //   let now = Date.now();
    //   const { data, getRowHeight } = this;
    //   let allHeight = 0;
    //   for (let i = 0, j = data.length; i < j; i++) {
    //     allHeight += getRowHeight(i);
    //   }
    //   console.log('allHeight 计算耗时',Date.now() - now);
    //   return allHeight;
    // }
  },
  created() {
    this.rowHeadWidth = 150;//this.defaultColumnWidth;
    this.columnHeadHeight = 100;//this.defaultRowHeight;
    this.setAllDomSize();

  },
  mounted() {
    // 初始化渲染
    this.onScroll();
  },
  updated() {
    // this.setItemPositionsCache();
  },
  methods: {
    setAllDomSize() {
      let allHeight = 0;
      let allWidth = 0;
      this.data[0].forEach((value, index)=>{
        allWidth += this.getColumnWidth(index);
      })
      if (this.isHadRowHead) {
        allWidth += this.rowHeadWidth;
      }
      this.allWidth = allWidth;
      this.data.forEach((value, index)=>{
        allHeight += this.getRowHeight(index);
      })
      if (this.isHadColumnHead) {
        allHeight += this.columnHeadHeight;
      }
      this.allHeight = allHeight;
    },
    setItemPositionsCache () {
      let now = Date.now();
      
      // console.log('updated',this.$refs.virtuallist_item);
      this.$refs.virtuallist_item.forEach((value,index) => {
        if(!this.itemPositionsCache[this.startIndex+index]) {
          this.itemPositionsCache[this.startIndex+index] = {
            height : value.getBoundingClientRect().height
          }
        }
      })
      console.log('setItemPositionsCache 运行耗时：',Date.now() - now);

    },
    onScroll: function() {
      let curr = countScrollEvet++;

      console.log('onScroll', curr);

      
      let now = Date.now();

      const {
        startRowIndex,offsetRow,endRowIndex,
        startColumnIndex,offsetColumn,endColumnIndex,
        rowHeadTranslateX,columnHeadTranslateY
      } = this.getStartIndexAndOffset();

      let visibleData = [];
      let i = 0;
      while (i < endRowIndex-startRowIndex ) {
        visibleData[i] = this.data[startRowIndex + i].slice(startColumnIndex, endColumnIndex);
        i++;
      }
      // 设置主数据 以及 位置
      this.visibleData = visibleData;
      let offsetColumnContent = offsetColumn;
      let offsetRowContent = offsetRow;
      // 设置行头部数据 以及 位置
      if (this.isHadRowHead) {
        this.visibleRowHeadData = this.rowHeadData.slice(startRowIndex, endRowIndex);
        // this.rowHeadTransform = `translate3d(${rowHeadTranslateX}px, ${offsetRow}px, 0)`;
        offsetColumnContent = this.rowHeadWidth+offsetColumn;
      }
      // 设置列头部数据 以及 位置
      if (this.isHadColumnHead) {
        this.visibleColumnHeadData = this.columnHeadData.slice(startColumnIndex, endColumnIndex);
        // this.columnHeadTransform = `translate3d(${offsetColumn}px, ${columnHeadTranslateY}px, 0)`;
        offsetRowContent = this.columnHeadHeight+offsetRow;
      }
      if (this.isHadRowHead) {
        this.rowHeadTransform = `translate3d(${rowHeadTranslateX}px, ${offsetRowContent}px, 0)`;
      }
      if (this.isHadColumnHead) {
        this.columnHeadTransform = `translate3d(${offsetColumnContent}px, ${columnHeadTranslateY}px, 0)`;
      }
      this.contentTransform = `translate3d(${offsetColumnContent}px, ${offsetRowContent}px, 0)`;

      console.log('设置新的data以及css位置运行耗时：',Date.now() - now);
      
      
      now = Date.now();
      setTimeout(()=>{
        console.log('onScroll 计算之后到下一个tick耗时 :',Date.now() - now, curr);
      },0)
    },
    getStartIndexAndOffset() {
      let now = Date.now();
      let { 
        scrollTop,scrollLeft,
        clientWidth,clientHeight
      } = this.$el;

      let clientWidthContent = clientWidth;
      let scrollLeftContent = scrollLeft;
      // 处理行头部数据
      let rowHeadTranslateX = 0;
      if (this.isHadRowHead) { 
        if (this.rowHeadFixed) {
          rowHeadTranslateX = scrollLeft;
          clientWidthContent -= this.rowHeadWidth;
        } else {
          scrollLeftContent -= this.rowHeadWidth;
        }
      }
      // 处理列头部数据
      let clientHeightContent = clientHeight;
      let scrollTopContent = scrollTop;
      let columnHeadTranslateY = 0;
      if (this.isHadColumnHead) { 
        if (this.columnHeadFixed) {
          columnHeadTranslateY = scrollTop;
          clientHeightContent -= this.columnHeadHeight;
        } else {
          scrollTopContent -= this.columnHeadHeight;
        }
      }
      // 计算行的 起始索引 最终索引 偏移量
      let startRowIndex = 0;
      let offsetRow = this.getRowHeight(startRowIndex);
      while (offsetRow < scrollTopContent) {
        ++startRowIndex;
        offsetRow += this.getRowHeight(startRowIndex);
      }
      this.startRowIndex = startRowIndex;
      let endRowIndex = startRowIndex;
      let offsetEndRow = offsetRow;
      const minOffsetEndRow = offsetRow + clientHeightContent;
      offsetRow = offsetRow - this.getRowHeight(startRowIndex);
      while (offsetEndRow < minOffsetEndRow) {
        ++endRowIndex;
        offsetEndRow += this.getRowHeight(endRowIndex);
      }
      ++endRowIndex;
      // 计算列的 起始索引 最终索引 偏移量
      let startColumnIndex = 0;
      let offsetColumn = this.getColumnWidth(startColumnIndex);
      while (offsetColumn < scrollLeftContent) {
        ++startColumnIndex;
        offsetColumn += this.getColumnWidth(startColumnIndex);
      }
      this.startColumnIndex = startColumnIndex;
      let endColumnIndex = startColumnIndex;
      let offsetEndColumn = offsetColumn;
      const minOffsetEndColumn = offsetColumn + clientWidthContent;
      while (offsetEndColumn < minOffsetEndColumn) {
        ++endColumnIndex;
        offsetEndColumn += this.getColumnWidth(endColumnIndex);
      }
      ++endColumnIndex;
      offsetColumn = offsetColumn - this.getColumnWidth(startColumnIndex);

      console.log('getStartIndexAndOffset运行耗时：',Date.now() - now);
      return {
        startRowIndex,
        offsetRow,
        endRowIndex,
        startColumnIndex,
        endColumnIndex,
        offsetColumn,
        rowHeadTranslateX,
        columnHeadTranslateY
      }
    },
    getRowHeight(rowIndex) {
      if (this.heightList[rowIndex]) {
        return this.heightList[rowIndex];
      } 
      return this.defaultRowHeight;
    },
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
.d_table{
  width: 100%;
  height: 300px;
  position: relative;
  border: 1px solid blue;
  overflow: scroll;
  .d_table_allcontent{
    position: absolute;
  }
  .d_table_content{
    position: absolute;
    // overflow: scroll;
    // width: 600px;
    // height: 300px;
    .d_table_row{
      font-size: 0;
      white-space: nowrap;
    }
    .d_table_cell{
      font-size: 13px;
      outline: 1px solid gray;
      width: 100px;
      height: 100px;
      display: inline-block;
      white-space: normal;
      vertical-align: middle;
      overflow: hidden;
    }

  }
  .d_table_rowhead {
    position: absolute;
    background: lightgrey;
    z-index: 1;

  }
  .rowhead_cell{
    line-height: 50px;
    outline: 1px solid black;
  }
  .d_table_columnhead{
    position: absolute;
    z-index: 1;
    background: lightcyan;
    font-size: 0;
    text-align: left;
    white-space: nowrap;
  }
  .columnhead_cell{
    display: inline-block;
    outline: 1px solid black;
    font-size: 13px;
    white-space: normal;
    word-break: break-all;
    vertical-align: middle;
  }
}

</style>
