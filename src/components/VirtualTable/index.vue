<template>
  <div class="d_table"
    @scroll="onScroll"
    :style="{
      width: width,
      height: height
    }"
  >
    <!-- 生成滚动条 -->
    <div
      class="d_table_allcontent"
      :style="{
        height: `${allHeight}px`,
        width: `${allWidth}px`
      }"
    >
    </div>
    <!-- 行头 -->
    <div
      v-if="isHadRowHead"
      class="d_table_rowhead"
      :class="{
        transparent_head: isRowHeadTransparent
      }"
      :style="{
        transform: rowHeadTransform
      }"
    >
      <div
        v-for="(value, index) in visibleRowHeadData"
        :key="index"
      >
        <div
          v-for="(cell, cellIndex) in value"
          :key="cellIndex"
          class="head_cell"
          :style="{
            height: `${getRowHeight(startRowIndex+index)}px`,
            width: `${rowHeadWidth}px`
          }"
        >
          {{cell.value}}
        </div>
      </div>
      <div
        class="d_table_span_wrap"
      >
        <div
          v-for="(value, index) in visibleRowHeadSpanList"
          :key="index"
          class="head_spancell"
          :class="{
            transparent_head: isRowHeadTransparent
          }"
          :style="{
            transform: value.transform,
            height: `${value.data.spanHeight}px`,
            width: `${value.data.spanWidth}px`,
          }"
        >
          {{value.data.value}}
        </div>
      </div>
    </div>
    <!-- 列头 -->
    <div
      v-if="isHadColumnHead"
      class="d_table_columnhead"
      :style="{
        transform: columnHeadTransform
      }"
    >
      <div
        v-for="(value, index) in visibleColumnHeadData"
        :key="index"
      >
        <div
          v-for="(cell, cellIndex) in value"
          :key="cellIndex"
          class="head_cell"
          :style="{
            height: `${columnHeadHeight}px`,
            width: `${getColumnWidth((startColumnIndex+cellIndex))}px`
          }"
        >
          {{cell.value}}
        </div>
      </div>
      <div
        class="d_table_span_wrap"
      >
        <div
          v-for="(value, index) in visibleColumnHeadSpanList"
          :key="index"
          class="head_spancell"
          :style="{
            transform: value.transform,
            height: `${value.data.spanHeight}px`,
            width: `${value.data.spanWidth}px`,
          }"
        >
          {{value.data.value}}
        </div>
      </div>
    </div>
    <!-- 交叉头部 -->
    <div
      v-if="isHadColumnHead && isHadRowHead"
      class="d_table_crosshead"
      :style="{
        height: `${columnHeadAllHeight}px`,
        width: `${rowHeadAllWidth}px`,
        transform: crossHeadTransform,
      }"
    >
      <div
        v-for="(value, index) in crossHead"
        :key="index"
      >
        <div
          v-for="(cell, cellIndex) in value"
          :key="cellIndex"
          class="head_cell"
          :style="{
            height: `${columnHeadHeight}px`,
            width: `${rowHeadWidth}px`
          }"
        >
          {{cell.value}}
        </div>
      </div>
      <div
        class="d_table_span_wrap"
      >
        <div
          v-for="(value, index) in visibleCrossHeadSpanList"
          :key="index"
          class="head_spancell"
          :style="{
            transform: value.transform,
            height: `${value.data.spanHeight}px`,
            width: `${value.data.spanWidth}px`,
          }"
        >
          {{value.data.value}}
        </div>
      </div>
    </div>
    <!-- 主数据 -->
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
          v-for="(cell, columIndex) in row"
          :key="columIndex"
          class="d_table_cell"
          :style="{
            height: `${getRowHeight(startRowIndex+rowIndex)}px`,
            width: `${getColumnWidth(startColumnIndex+columIndex)}px`,
          }"
        >         
          {{cell.value}}
        </div>
      </div>
      <div
        class="d_table_span_wrap"
      >
        <div
          v-for="(visibbleDataSpan, visibbleDataSpanIndex) in visibleDataSpanList"
          :key="visibbleDataSpanIndex"
          class="span_cell"
          :style="{
            transform: visibbleDataSpan.transform,
            height: `${visibbleDataSpan.data.spanHeight}px`,
            width: `${visibbleDataSpan.data.spanWidth}px`,
          }"
        >
          {{visibbleDataSpan.data.value}}
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



// 
// 待添加功能：  冻结行 或者 列
// crosshead 区域的单元格的宽度 和 高度 
// 问题 会污染原数据
let now = Date.now();
let nowrender = Date.now();
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
    }, 500);
  };
}


export default {
  props:{
    rowHead: {
      type: Array,
      default: () => []
      // 需要是一个二维数组
    },
    rowHeadFixed: {
      type: Boolean,
      default: true
      // 需要是一个二维数组
    },
    // 行头部宽度
    rowHeadWidth: {
      type: Number,
      default: 150
    },
    rowHeight: {
      type: [ Function, Number, Array ],
      default: 40
    },
    columnHead: {
      type: Array,
      default: () => []
      // 需要是一个二维数组
    },
    columnHeadFixed: {
      type: Boolean,
      default: true
      // 需要是一个二维数组
    },
    columnHeadHeight: {
      type: Number,
      default: 50
    },
    columnWidth: {
      type: [ String, Function, Number, Array ],
      default: 100
      // String :  fill  
      // Number: 固定
      // Function
      // Array 
    },
    data: {
      type: Array,
      default: () => []
      // 需要是一个二维数组
    },
    width: {
      type: String,
      default: '100%'
      // 300px 100%
    },
    tableHeight: {
      type: String,
      default: '300px'
      // 300px 100% auto 
      // auto 情况下视情况 数据少正好填充满每行数据 数据多滚动
    },
    maxHeight: {
      type: Number,
      default: 400
      // 300 
      // tableHeight auto 的情况下，maxHeight有效
    },
    fixedColumnIndex: {
      type: Number,
      default: -1
    },
    // 固定列 无行头 无列头
    // 固定列 无行头 有列头
  },
  data() {
    return {
      throttle,
      visibleData: [],
      contentTransform: 'translate3d(0, 0, 0)',
      itemHeight: null,
      itemPositionsCache:[],
      startIndex: 0,
      lastStartIndex: 0,
      allWidth: 0,
      allHeight: 0,
      rowHeightList: [],
      columnWidthList: [],
      startRowIndex: 0,
      startColumnIndex: 0,
      // 行头部相关数据
      // isHadRowHead: true,
      visibleRowHeadData: [],
      rowHeadTransform: 'translate3d(0, 0, 0)',
      // 列头部相关数据
      visibleColumnHeadData: [],
      columnHeadTransform: 'translate3d(0, 0, 0)',
      rowLength: 0,
      columnLength:0,
      // 主数据合并行列 数据
      visibleDataSpanList: {},
      columnHeadAllHeight: 0,
      rowHeadAllWidth: 0,
      visibleColumnHeadSpanList: {},
      visibleCrossHeadSpanList: {},
      visibleRowHeadSpanList: {},
      crossHeadTransform: 'translate3d(0, 0, 0)',

      height: this.tableHeight,

      mainDataInner: null,
      rowHeadInner: null,
      columnHeadInner: null,

      isHadRowHead: false,
      crosshead: null,
      isHadColumnHead: false,

      isRowHeadTransparent: false,
    };
  },
  computed: {
  },
  watch: {
    data(newV, oldV) {
      // 此处有问题，还需要判断其他影响高度的参数
      // 原scroll 距离偏大时，数据变少，总content高度变低，但是滚动距离scroll距离不会变小
      // 还需要添加 scrollLeft 的情况
      // 新数据长度变小时，把滚动高度置0 否则会计算错误视口高度。
      if(newV.length < oldV.length) {
        this.$el.scrollTop = 0;
      }
      this.init();
    },
    rowHead() {
      this.init();
    },
    columnHead() {
      this.init();
    },
    width() {      
      this.init();
    },
    tableHeight(val) {
      this.init();
    },
    maxHeight(val) {
      this.init();
    },
    rowHeight() {
      this.init();
    },
    fixedColumnIndex(newV, oldV) {
      // 变化时 需要清空 rowhead 里 合并单元格的spanWidth spanHeight
      //  此处有问题，实际只需要处理 设置过的
      let clearLength = Math.max(newV, oldV);
      this.data.forEach((row) => {
        let i = 0;
        while(i <= clearLength) {
          row[i].spanWidth = null;
          row[i].spanHeight = null;
          i++;
        }
      })
      this.init();
    },
    rowHeadFixed() {
      this.init();
    },
    columnHeadFixed() {
      this.init();
    },
  },
  beforeCreated(){
    // console.log('beforeCreated结束耗时',Date.now() - now);
    // now = Date.now();
  },
  created() {
    // console.log('created结束耗时',Date.now() - now);
    // now = Date.now();
  },
  mounted() {
    // 初始化渲染
    // console.log('mounted结束耗时',Date.now() - now);
    // now = Date.now();
    this.init();
    this.addGlobalEvent();
    
  },
  updated() {
    // this.setItemPositionsCache();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.throttleInit)
  },
  methods: {
    addGlobalEvent(){
      window.addEventListener('resize', this.throttleInit);
    },
    throttleInit: throttle(function(){
      this.init();
    }),
    onScroll() {
      let { 
        scrollTop,scrollLeft,
        clientWidth,clientHeight
      } = this.$el;
      const {
        allWidth, allHeight
      } = this;
      // 此处功能有待优化，影响性能
      this.$emit(
        "onScroll",
        allWidth - scrollLeft - clientWidth, // 距离右侧边缘距离
        allHeight - scrollTop - clientHeight // 距离底部边缘距离
      );
      requestAnimationFrame(this.render);
    },
    init() {
      console.log(22);
      if (this.data && this.data.length > 0) {
        this.parseParams();
        // console.log('parseParams结束耗时',Date.now() - now);
        // now = Date.now();
        this.setCellSizeHandler();
        // console.log('setCellSizeHandler结束耗时',Date.now() - now);
        // now = Date.now();
        this.setContainerSize();
        // console.log('setContainerSize结束耗时',Date.now() - now);
        // now = Date.now();
        this.$nextTick(()=>{
          this.render();
          // console.log('init结束耗时',Date.now() - now);
          // now = Date.now();
        })
      }
    },
    parseParams() {
      let mainDataInner = [];
      let rowHeadInner = [];
      let columnHeadInner = [];
      let crossHead = [];
      if (this.fixedColumnIndex > -1) {
        this.isHadRowHead = true;
        this.isRowHeadTransparent = true;
        if (this.columnHead && this.columnHead.length > 0) {
          // 如果有列头
          // const aboveData = this.data.slice(0, this.columnHead.length);
          this.isHadColumnHead = true;
          this.columnHead.forEach((value) => {
            crossHead.push(value.slice(0, this.fixedColumnIndex + 1));
            columnHeadInner.push(value.slice(this.fixedColumnIndex + 1));
          })
          // console.log('parseParams1结束耗时',Date.now() - now);
          // now = Date.now();
        }
        this.data.forEach((value) => {
          rowHeadInner.push(value.slice(0, this.fixedColumnIndex + 1));
          mainDataInner.push(value.slice(this.fixedColumnIndex + 1));
        })
        // console.log('parseParams2结束耗时',Date.now() - now);
        // now = Date.now();
        
        

        
      } else {
        // 此处合并列会 忽略 行头rowhead数据
        mainDataInner = this.data;
        this.isRowHeadTransparent = false;
        if (this.columnHead && this.columnHead.length > 0) {
          this.isHadColumnHead = true;
          columnHeadInner = this.columnHead;
        }
        if (this.rowHead && this.rowHead.length > 0) {
          this.isHadRowHead = true;
          rowHeadInner = this.rowHead;
        } else {
          this.isHadRowHead = false;
        }
      }
      this.crossHead = Object.freeze(crossHead);
      this.columnHeadInner = Object.freeze(columnHeadInner);
      this.rowHeadInner = Object.freeze(rowHeadInner);
      this.mainDataInner = Object.freeze(mainDataInner);
      // console.log('parseParams3结束耗时',Date.now() - now,crossHead,columnHeadInner,rowHeadInner,mainDataInner);
      // now = Date.now();
    },
    // 设置合并单元格尺寸
    setCellSpanSize(
      cellData, getCellHeight, getCellWidth,
      spanStartRow, spanStartColumn
    ) {
      if (!cellData.spanWidth) {
        let spanWidth = 0;
        let spanHeight = 0;
        if(cellData.colSpan) {
          let i = cellData.colSpan - 1;
          while(i >= 0 ) {
            spanWidth += getCellWidth(spanStartColumn + i);
            i--;
          }
        } else {
          spanWidth += getCellWidth(spanStartColumn);
        }
        if(cellData.rowSpan) {
          let i = cellData.rowSpan - 1;            
          while(i >= 0 ) {
            spanHeight += getCellHeight(spanStartRow + i);
            i--;
          }  
        } else {
          spanHeight = getCellHeight(spanStartRow);
        }
        cellData.spanWidth = spanWidth;
        cellData.spanHeight = spanHeight;
      }
    },
    // 设置单元格尺寸高度 宽度 获取方法
    setCellSizeHandler() {
      let { 
        clientWidth, clientHeight
      } = this.$el;
      this.rowLength = this.mainDataInner.length;
      // 此处 'fill' 宽度逻辑 应该改为默认 小于 100%，则fill。 否则按照其他填充宽度list
      // 处理列宽数据
      
      if (typeof(this.columnWidth) === 'function') {
        // ..
      } else if (Object.prototype.toString.call(this.columnWidth) === '[object Array]') {
        // ..
        this.columnWidthList = this.columnWidth;
        this.getColumnWidth = this.getColumnWidthFromList;
      } if (typeof this.columnWidth === 'number') {
        // 此处计算影响性能。考虑固定高宽，不做自适应填满
        this.getColumnWidth = this.getColumnWidthFromNumer;
      }
      // 处理行高数据
      if (typeof this.rowHeight === 'number') {
        // ...
        this.getRowHeight = this.getRowHeightFromNumer;
      } else if (Object.prototype.toString.call(this.rowHeight) === '[object Array]') {
        this.rowHeightList = this.rowHeight;
        this.getRowHeight = this.getRowHeightFromList;
      }
      
    },
    // 设置滚动条总尺寸
    setContainerSize() {
      let allHeight = 0;
      let allWidth = 0;
      let { 
        clientWidth, clientHeight, offsetWidth
      } = this.$el;
      // 计算滚动总宽度
      this.columnLength = this.mainDataInner[0].length;
      this.mainDataInner[0].forEach((value, index)=>{
        allWidth += this.getColumnWidth(index);
      })
      if (this.isHadRowHead) {
        this.rowHeadAllWidth = this.rowHeadWidth * this.rowHeadInner[0].length;
        allWidth += this.rowHeadAllWidth;
      }
      // 计算滚动总高度
      // 此处计算高度有问题，应该是动态的  
      this.mainDataInner.forEach((value, index)=>{
        allHeight += this.getRowHeight(index);
      })
      if (this.isHadColumnHead) {
        this.columnHeadAllHeight = this.columnHeadHeight * this.columnHeadInner.length;
        allHeight += this.columnHeadAllHeight;
      }
      this.allHeight = allHeight;

      let heightNumber  = 0;
      let height;
      let heightSmallerThanMax = false;
      // 设置容器尺寸
      if (this.tableHeight === 'auto') {
        // 此处影响性能，正常按照excel固定高宽处理 不需要这么多判断      
        // 此处100%的情况判断有漏洞 后面补上
        
        if (this.maxHeight && allHeight > this.maxHeight) {
          height = this.maxHeight;
        } else {
          heightSmallerThanMax = true;
          height = allHeight;
        }
        heightNumber = height;
        height = `${height}px`;
      } else {
        height = this.tableHeight;
        if (this.tableHeight === '100%') {
          heightNumber = clientHeight;
        } else {
          heightNumber = parseFloat(this.tableHeight);
        }
      }
      if (allHeight > heightNumber) {
        clientWidth = offsetWidth - 12 - 2;
      }
      // 判断实际内容宽度 是否小于 容器宽度
      if (allWidth < clientWidth) {
        let clientWidthContent = clientWidth;
        if (this.isHadRowHead) {
          clientWidthContent = clientWidth - this.rowHeadWidth * this.rowHeadInner[0].length;
        }
        let averageWidth = Math.floor(clientWidthContent/this.columnLength*100)/100;
        let columnWidthList = [];
        let i = 0;
        while (i < this.columnLength) {
          columnWidthList.push(averageWidth);
          i++;
        }
        this.columnWidthList = columnWidthList;
        this.getColumnWidth = this.getColumnWidthFromList;
        this.allWidth = clientWidth;
      } else {
        this.allWidth = allWidth;
        if (heightSmallerThanMax) {
          height = `${Math.min(this.maxHeight, allHeight+12)}px`;
        }
      }
      this.height = height;
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
    render: function() {
      // console.log('距离上次render', Date.now() - now);
      // now = Date.now();
      // nowrender = now;
      let curr = countScrollEvet++;
      const {
        startRowIndex,offsetRow,endRowIndex,
        startColumnIndex,offsetColumn,endColumnIndex,
        rowHeadTranslateX,columnHeadTranslateY,
        crossHeadTransformX,crossHeadTransformY
      } = this.getStartIndexAndOffset();
      const  {
        getColumnWidth, getRowHeight
      } = this;
      let visibleData = [];

      let i = 0;
      while (i < endRowIndex - startRowIndex) {
        visibleData[i] = this.mainDataInner[startRowIndex+i].slice(startColumnIndex, endColumnIndex);
        i++;
      }
      let spanStartColumnOffset = 0;
      if (this.fixedColumnIndex > -1) {
        // 固定列的情况: 处理列头数据，data数据时 需要如此判断
        spanStartColumnOffset = this.fixedColumnIndex + 1;
      }
      this.visibleDataSpanList = this.getVisibleSpanList(
        visibleData,
        this.mainDataInner,
        getRowHeight,
        getColumnWidth,
        startRowIndex,
        startColumnIndex,
        spanStartColumnOffset
      );

      // 设置主数据 以及 位置
      this.visibleData = visibleData;
      let offsetColumnContent = offsetColumn;
      let offsetRowContent = offsetRow;


      // 设置行头部数据 以及 位置
      if (this.isHadRowHead) {

        // let visibleRowHeadData = [];
        // this.rowHead.forEach((value, index)=>{
        //   visibleRowHeadData[index] = value.slice(startColumnIndex, endColumnIndex);
        // })
        // this.visibleRowHeadData = visibleRowHeadData;
        this.visibleRowHeadData = this.rowHeadInner.slice(startRowIndex, endRowIndex);
        this.visibleRowHeadSpanList = this.getVisibleSpanList(
          this.visibleRowHeadData,
          this.rowHeadInner,
          getRowHeight,
          this.getRowHeadWidth,
          startRowIndex,
          0,
          0
        );

        offsetColumnContent = this.rowHeadAllWidth+offsetColumn;
      }


      // 设置列头部数据 以及 位置
      if (this.isHadColumnHead) {
        let visibleColumnHeadData = [];
        this.columnHeadInner.forEach((value, index)=>{
          visibleColumnHeadData[index] = value.slice(startColumnIndex, endColumnIndex);
        })
        this.visibleColumnHeadData = visibleColumnHeadData;

        this.visibleColumnHeadSpanList = this.getVisibleSpanList(
          visibleColumnHeadData,
          this.columnHeadInner,
          this.getColumnHeadHeight,
          getColumnWidth,
          0,
          startColumnIndex,
          spanStartColumnOffset
        );

        offsetRowContent = this.columnHeadAllHeight+offsetRow;
      }
      // 设置交叉头部合并单元格数据
      if (this.isHadColumnHead && this.isHadRowHead) {
        this.visibleCrossHeadSpanList = this.getVisibleSpanList(
          this.crossHead,
          this.crossHead,
          this.getColumnHeadHeight,
          this.getRowHeadWidth,
          0,
          0,
          0
        );
      }

      if (this.isHadRowHead) {
        this.rowHeadTransform = `translate3d(${rowHeadTranslateX}px, ${offsetRowContent}px, 0)`;
      }

      if (this.isHadColumnHead) {
        this.columnHeadTransform = `translate3d(${offsetColumnContent}px, ${columnHeadTranslateY}px, 0)`;
      }

      this.contentTransform = `translate3d(${offsetColumnContent}px, ${offsetRowContent}px, 0)`;      
      this.crossHeadTransform = `translate3d(${crossHeadTransformX}px, ${crossHeadTransformY}px, 0)`;
      // console.log('耗时render', Date.now() - nowrender);
    },
    // 获取 生成 可视数据 中 合并单元格 数据列表
    getVisibleSpanList(
      visibleData,
      data,
      getCellHeight,
      getCellWidth,
      startRowIndex,
      startColumnIndex,
      spanStartColumnOffset
    ) {
      // 设置span 合并单元格数据
      // 此处可以做数据缓存优化， 或者把数据处理放在初始化
      // 需要遇到合并单元格的任一单元格位置时， 就把该合并单元格渲染出来
      let visibleSpanList = {};
      visibleData.forEach((row, rowIndex) => {
        row.forEach((cellData, columnIndex) => {
          if(cellData.spanStartRow > -1) {
            let spanStartRow = cellData.spanStartRow;
            let spanStartColumn = cellData.spanStartColumn;
            spanStartColumn -= spanStartColumnOffset;
            if(
              !visibleSpanList[`${spanStartRow}-${spanStartColumn}`]
            ) {
              this.setCellSpanSize(
                data[spanStartRow][spanStartColumn],
                getCellHeight,getCellWidth,
                spanStartRow,
                spanStartColumn
              );
              // 计算合并单元格的 偏移transform
              // 起始span 距离content startrow的偏移row startcolumn的偏移column
              // let i = startRowIndex;
              let i = spanStartRow;
              let transformY = 0;
              // 合并单元格起始行i >= 视口startRowIndex 的情况
              if (i >= startRowIndex) {
                while (i-- > startRowIndex) {
                  transformY += getCellHeight(i);
                }
              } else {
                while (startRowIndex > i++) {
                  transformY -= getCellHeight(i);
                }
              }
              i = spanStartColumn;
              let transformX = 0;
              if (i >= startColumnIndex) {
                while (i-- > startColumnIndex) {
                  transformX += getCellWidth(i);
                }
              } else {
                while (startColumnIndex > i++) {
                  transformX -= getCellWidth(i);
                }
              }
              visibleSpanList[`${spanStartRow}-${spanStartColumn}`] = {
                data: data[spanStartRow][spanStartColumn],
                transform: `translate3d(${transformX}px, ${transformY}px, 0)`
              }  
            }
              
          }
        })
      });
      return visibleSpanList;
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
      let allWidthContent = this.allWidth;
      let crossHeadTransformX = 0;
      let crossHeadTransformY = 0;
      if (this.isHadRowHead) { 
        if (this.rowHeadFixed) {
          rowHeadTranslateX = scrollLeft;
          clientWidthContent -= this.rowHeadAllWidth;
          crossHeadTransformX = scrollLeft;
        } else {
          scrollLeftContent -= this.rowHeadAllWidth;
          crossHeadTransformX = 0;
        }
        allWidthContent = this.allWidth - this.rowHeadAllWidth;
      }
      // 处理列头部数据
      let clientHeightContent = clientHeight;
      let scrollTopContent = scrollTop;
      let columnHeadTranslateY = 0;
      let allHeightContent = this.allHeight;
      if (this.isHadColumnHead) { 
        if (this.columnHeadFixed) {
          columnHeadTranslateY = scrollTop;
          clientHeightContent -= this.columnHeadAllHeight;
          crossHeadTransformY = scrollTop;
        } else {
          scrollTopContent -= this.columnHeadAllHeight;
          crossHeadTransformY = 0;
        }
        allHeightContent = this.allHeight - this.columnHeadAllHeight; 
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
      const minOffsetEndRow = Math.min(allHeightContent, offsetRow + clientHeightContent);
      offsetRow = offsetRow - this.getRowHeight(startRowIndex);
      while (offsetEndRow < minOffsetEndRow) { // 520 810
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
      const minOffsetEndColumn = Math.min(allWidthContent, offsetColumn + clientWidthContent);
      while (offsetEndColumn < minOffsetEndColumn) {
        ++endColumnIndex;
        offsetEndColumn += this.getColumnWidth(endColumnIndex);
      }
      ++endColumnIndex;
      offsetColumn = offsetColumn - this.getColumnWidth(startColumnIndex);

      return {
        startRowIndex,offsetRow,endRowIndex,
        startColumnIndex,endColumnIndex,offsetColumn,
        rowHeadTranslateX,columnHeadTranslateY,
        crossHeadTransformX,crossHeadTransformY
      }
    },
    getRowHeightFromList(rowIndex) {
      return this.rowHeightList[rowIndex];
    },
    getRowHeightFromNumer() {
      return this.rowHeight;
    },
    getRowHeight(rowIndex) {
      if (this.rowHeightList[rowIndex]) {
        return this.rowHeightList[rowIndex];
      } 
      return this.rowHeight;
    },
    getColumnHeadHeight(columnIndex) {
      // if (this.rowHeightList[rowIndex]) {
      //   return this.rowHeightList[rowIndex];
      // } 
      return this.columnHeadHeight;
    },
    getRowHeadWidth(rowIndex) {
      // if (this.rowHeightList[rowIndex]) {
      //   return this.rowHeightList[rowIndex];
      // } 
      return this.rowHeadWidth;
    },
    getColumnWidth(columnIndex) {
      if (this.columnWidthList[columnIndex]) {
        return this.columnWidthList[columnIndex];
      } 
      return this.columnWidth;
    },
    getColumnWidthFromNumer() {
      return this.columnWidth;
    },
    getColumnWidthFromList(columnIndex) {
      return this.columnWidthList[columnIndex];
    },
  },
};
</script>

<style lang="less">
.d_table{
  position: relative;
  border: 1px solid #eeeff0;
  overflow: auto;
  font-size: 0;
  // 配合滚动条样式设置
  box-sizing: content-box;
  // padding-bottom: 12px;
  // padding-right: 12px;
  .d_table_allcontent{
    position: absolute;
  }
  .d_table_content{
    position: absolute;
    background: white;
    .d_table_row{
      white-space: nowrap;
      &:nth-child(odd) {
        // background: #f7f8fa;
      }
      &:hover {
        background: #f7f8fa;
      }
    }
    

  }
  .d_table_cell,.head_cell{
      
    display: inline-flex;
    white-space: nowrap;
    vertical-align: middle;
    overflow: hidden;
    position: relative;
  }
  .d_table_rowhead {
    
    box-shadow: 2px 0 6px -2px rgba(0,0,0,0.2);
  }
  .d_table_columnhead{    
    text-align: left;
    white-space: nowrap;
    box-shadow: 0 2px 6px -2px rgba(0,0,0,0.2);
  }
  
  .d_table_cell,.span_cell,
  .head_cell,.head_spancell{
    padding: 8px 10px;
    box-sizing: border-box;
    align-items: center;
    font-size: 13px;
    border-right: 1px solid #eeeff0;
    border-bottom: 1px solid #eeeff0;
  }
  .d_table_crosshead{
    left: 0;
    top: 0;
    box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 6px -2px;
  }
  .d_table_rowhead,
  .d_table_columnhead,
  .head_spancell,
  .d_table_crosshead{
    background: rgb(244,245,247);
    position: absolute;
    z-index: 1;
    color: #7d8292;
    font-weight: bold;
    overflow: hidden;
  }
  .span_cell{
    position: absolute;
    left: 0;
    top: 0;
    background: white;
    overflow: hidden;
    z-index: 1;
    display: block;
  }
  .d_table_span_wrap{
    position: absolute;
    left: 0;
    top: 0;
  }
  .transparent_head{
    background: white;
    color: inherit;
    font-weight: normal;
  }
}
</style>
