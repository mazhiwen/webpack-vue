<template>
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
    <div
      v-if="isHadColumnHead && isHadRowHead"
      class="d_table_crosshead"
      :style="{
        height: `${columnHeadHeight}px`,
        width: `${rowHeadWidth}px`
      }"
    >
      
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
  props:{
    rowHead: {
      type: Array,
      default: () => []
    },
    columnHead: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    columnWidth: {
      type: [ String, Function, Number, Array ],
      default: () => 100
      // String :  fill  
      // Number: 固定
      // Function
      // Array 
    },
    rowHeight: {
      type: [ String, Function, Number, Array ],
      default: () => 40
      // String :  fill 
    },
    rowHeadWidth: {
      type: Number,
      default: 150
    },
  },
  data() {
    return {
      throttle,
      visibleData: [],
      contentTransform: 'translate3d(0, 0, 0)',
      itemHeight: null,
      itemPositionsCache:[
      ],
      startIndex: 0,
      lastStartIndex: 0,
      allWidth: 0,
      allHeight: 0,
      rowHeightList: [],
      columnWidthList: [],
      startRowIndex: 0,
      startColumnIndex: 0,
      // 行头部相关数据
      isHadRowHead: true,
      visibleRowHeadData: [],
      rowHeadTransform: 'translate3d(0, 0, 0)',
      rowHeadFixed: true,
      // 列头部相关数据
      isHadColumnHead: false,
      visibleColumnHeadData: [],
      columnHeadTransform: 'translate3d(0, 0, 0)',
      columnHeadHeight: 0, // 行头部宽度
      columnHeadFixed: true,

      rowLength: 0,
      columnLength:0,
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
    this.columnHeadHeight = 100;//this.defaultRowHeight;
    

  },
  mounted() {
    // 初始化渲染
    this.setCellSizeData();
    this.setAllScrollSize();
    this.onScroll();
  },
  updated() {
    // this.setItemPositionsCache();
  },
  methods: {
    setCellSizeData() {
      let { 
        clientWidth, clientHeight
      } = this.$el;
      this.rowLength = this.data.length;
      this.columnLength = this.data[0].length;
      if (this.columnWidth === 'fill') {
        let i = 0;
        let columnWidthList = [];
        let averageWidth = Math.floor(clientWidth/this.columnLength*100)/100;
        while (i < this.columnLength) {
          columnWidthList.push(averageWidth);
          i++;
        }
        this.columnWidthList = columnWidthList;
      } else if (typeof(this.columnWidth) === 'function') {
        // ..
      } else if (Object.prototype.toString.call(this.columnWidth) === '[object Array]') {
        // ..
        this.columnWidthList = this.columnWidth;
      }
      if (this.rowHeight === 'fill') {
        let i = 0;
        let rowHeightList = [];
        let averageHeight = Math.floor(clientHeight/this.rowLength*100)/100;
        while (i < this.rowLength) {
          rowHeightList.push(averageHeight);
          i++;
        }
        this.rowHeightList = rowHeightList;
      }
    },
    setAllScrollSize() {
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
      this.$refs.virtuallist_item.forEach((value,index) => {
        if(!this.itemPositionsCache[this.startIndex+index]) {
          this.itemPositionsCache[this.startIndex+index] = {
            height : value.getBoundingClientRect().height
          }
        }
      })

    },
    onScroll: function() {
      let curr = countScrollEvet++;
      let now = Date.now();
      const {
        startRowIndex,offsetRow,endRowIndex,
        startColumnIndex,offsetColumn,endColumnIndex,
        rowHeadTranslateX,columnHeadTranslateY
      } = this.getStartIndexAndOffset();

      let visibleData = [];

      let i = 0;
      while (i < endRowIndex - startRowIndex) {
        visibleData[i] = this.data[startRowIndex+i].slice(startColumnIndex, endColumnIndex);
        i++;
      }
      // 设置主数据 以及 位置
      this.visibleData = visibleData;
      let offsetColumnContent = offsetColumn;
      let offsetRowContent = offsetRow;
      // 设置行头部数据 以及 位置
      if (this.isHadRowHead) {
        this.visibleRowHeadData = this.rowHead.slice(startRowIndex, endRowIndex);
        // this.rowHeadTransform = `translate3d(${rowHeadTranslateX}px, ${offsetRow}px, 0)`;
        offsetColumnContent = this.rowHeadWidth+offsetColumn;
      }
      // 设置列头部数据 以及 位置
      if (this.isHadColumnHead) {
        this.visibleColumnHeadData = this.columnHead.slice(startColumnIndex, endColumnIndex);
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
      const minOffsetEndRow = Math.min(this.allHeight ,offsetRow + clientHeightContent);
      offsetRow = offsetRow - this.getRowHeight(startRowIndex);
      while (offsetEndRow < minOffsetEndRow) {
        ++endRowIndex;
        offsetEndRow += this.getRowHeight(endRowIndex);
      }
      ++endRowIndex;
      // 计算列的 起始索引 最终索引 偏移量
      let startColumnIndex = 0;
      let offsetColumn = this.getColumnWidth(startColumnIndex);
      console.log(scrollLeftContent);
      while (offsetColumn < scrollLeftContent) {
        ++startColumnIndex;
        offsetColumn += this.getColumnWidth(startColumnIndex);
      }
      this.startColumnIndex = startColumnIndex;
      let endColumnIndex = startColumnIndex;
      let offsetEndColumn = offsetColumn;
      const minOffsetEndColumn = Math.min(this.allWidth, offsetColumn + clientWidthContent);
      console.log(minOffsetEndColumn, clientWidthContent);
      while (offsetEndColumn < minOffsetEndColumn) {
        ++endColumnIndex;
        offsetEndColumn += this.getColumnWidth(endColumnIndex);
      }
      ++endColumnIndex;
      offsetColumn = offsetColumn - this.getColumnWidth(startColumnIndex);
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
      if (this.rowHeightList[rowIndex]) {
        return this.rowHeightList[rowIndex];
      } 
      return this.rowHeight;
    },
    getColumnWidth(columnIndex) {
      if (this.columnWidthList[columnIndex]) {
        return this.columnWidthList[columnIndex];
      } 
      return this.columnWidth;
    }
  },
};
</script>

<style lang="less">
.d_table{
  width: 100%;
  height: 300px;
  position: relative;
  border: 1px solid #eeeff0;
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
      &:nth-child(odd) {
        // background: #f7f8fa;
      }
      &:hover {
        background: #f7f8fa;
      }
    }
    

  }
  .d_table_cell{
      
    display: inline-flex;
    white-space: nowrap;
    vertical-align: middle;
    overflow: hidden;
  }
  .d_table_rowhead {

    box-shadow: 2px 0 6px -2px rgba(0,0,0,0.2);
  }
  .rowhead_cell{
    
    display: flex;
    
  }
  .d_table_columnhead{    
    font-size: 0;
    text-align: left;
    white-space: nowrap;
    box-shadow: 0 2px 6px -2px rgba(0,0,0,0.2);
  }
  .columnhead_cell{
    display: inline-flex;
    white-space: normal;
    word-break: break-all;
    vertical-align: middle;
  }
  .d_table_crosshead{
    position: fixed;
    background: rgb(244,245,247);
    z-index: 1;
  }
  .d_table_cell,.rowhead_cell,.columnhead_cell{
    padding: 8px 10px;
    box-sizing: border-box;
    align-items: center;
    font-size: 13px;
    border-right: 1px solid #eeeff0;
    border-bottom: 1px solid #eeeff0;
  }
  .d_table_rowhead, .d_table_columnhead{
    background: rgb(244,245,247);
    position: absolute;
    z-index: 1;
  }
}

</style>
