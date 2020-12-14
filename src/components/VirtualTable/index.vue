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
            height: `${getRowHeight(startRowIndex+cellIndex)}px`,
            width: `${rowHeadWidth}px`
          }"
        >
          {{cell.value}}
        </div>
      </div>
      <div
        class="d_table_dataspan_wrap"
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
        class="d_table_dataspan_wrap"
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
        class="d_table_dataspan_wrap"
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

let now = Date.now();

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
      // 需要是一个二维数组
    },
    rowHeadFixed: {
      type: Boolean,
      default: true
      // 需要是一个二维数组
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
    
    data: {
      type: Array,
      default: () => []
      // 需要是一个二维数组
    },
    columnWidth: {
      type: [ String, Function, Number, Array ],
      default: 100
      // String :  fill  
      // Number: 固定
      // Function
      // Array 
    },
    rowHeight: {
      type: [ Function, Number, Array ],
      default: 40
    },
    // 行头部宽度
    rowHeadWidth: {
      type: Number,
      default: 150
    },
    columnHeadHeight: {
      type: Number,
      default: 50
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
      // auto 情况下正好填充满每行数据
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
      // isHadRowHead: true,
      visibleRowHeadData: [],
      rowHeadTransform: 'translate3d(0, 0, 0)',
      // 列头部相关数据
      visibleColumnHeadData: [],
      visibleRowHeadData: [],
      columnHeadTransform: 'translate3d(0, 0, 0)',

      rowLength: 0,
      columnLength:0,
      // 主数据合并行列 数据
      visibleDataSpanList: {},
      columnHeadAllHeight: 0,
      rowHeadAllWidth: 0,
      visibleColumnHeadSpanList: {},
      visibleRowHeadSpanList: {},
      crossHeadTransform: 'translate3d(0, 0, 0)',

      height: this.tableHeight,

      _mainData: null,
      _rowHead: null,
      _columnHead: null,

      isHadRowHead: false,
      crosshead: null,
      isHadColumnHead: false,

      isRowHeadTransparent: false,
      _rowHeadFixed: this.rowHeadFixed,
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
    // isHadRowHead() {
    //   return this._rowHead && this._rowHead.length > 0
    // },
    // isHadColumnHead() {
    //   return this.columnHead && this.columnHead.length > 0
    // }
  },
  watch: {
    data(newV, oldV) {
      // 此处有问题，还需要判断其他影响高度的参数
      // 原scroll 距离偏大时，数据变少，总content高度变低，但是滚动距离scroll距离不会变小
      // 还需要添加 scrollLeft 的情况
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
    console.log('beforeCreated结束耗时',Date.now() - now);
    now = Date.now();
  },
  created() {
    console.log('created结束耗时',Date.now() - now);
    now = Date.now();
  },
  mounted() {
    // 初始化渲染
    console.log('mounted结束耗时',Date.now() - now);
    now = Date.now();
    this.init();
  },
  updated() {
    // this.setItemPositionsCache();
  },
  methods: {
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
      // 判断当前可视区域所在区块的 周围8格是否有数据
      // 如果有 直接渲染
      // 如果没有 去判断获取填充周围8格数据
      // 每一个区块的表示：始终坐标 (0,0) - (n,n)
      // 判断获取 (0,0) - (3n,3n)


      // 判断当前数据所在区块 :
      // (Math.floor(x/n)*n, Math.floor(y/n)*n) = 
      // currentPositionX = Math.floor(x/n)*n 
      // => (currentPositionX,currentPositionY)
      // 依次判断周围8块 缺少数据的区块
      // 判断标准： 判断区块起始位置是否有数据
      // 数据块标序依次为 
      // 1 2 3 
      // 4 5 6
      // 7 8 9            
      // 1: (currentPositionX-n,currentPositionY-n)
      // 2: (currentPositionX,currentPositionY-n)
      // 3: (currentPositionX+2n,currentPositionY-n)
      // 4: (currentPositionX-n,currentPositionY)
      // 6: (currentPositionX+2n,currentPositionY)
      // 7: (currentPositionX-n,currentPositionY+2n)
      // 8: (currentPositionX,currentPositionY+2n)
      // 9: (currentPositionX+2n,currentPositionY+2n)
      // 或者直接获取  (currentPositionX-n,currentPositionY-n)  -> (currentPositionX+2n,currentPositionY+2n) 的数据
      
      
      // 判断 右侧3块 和 下侧3块 有没有数据 
      // 

      this.render();
    },
    init() {
      if (this.data && this.data.length > 0) {
        this.parseParams();
        this.setCellSizeData();
        this.setAllScrollSize();
        this.$nextTick(()=>{
          this.render();
        })
      }
    },
    parseParams() {
      let _mainData = [];
      let _rowHead = [];
      let _columnHead = [];
      let crossHead = [];
      if (this.fixedColumnIndex > -1) {
        this.isHadRowHead = true;
        this._rowHeadFixed = true;
        this.isRowHeadTransparent = true;
        if (this.columnHead && this.columnHead.length > 0) {
          // 如果有列头
          // const aboveData = this.data.slice(0, this.columnHead.length);
          this.isHadColumnHead = true;
          this.columnHead.forEach((value) => {
            crossHead.push(value.slice(0, this.fixedColumnIndex + 1));
            _columnHead.push(value.slice(this.fixedColumnIndex + 1));
          })
        }
        this.data.forEach((value) => {
          _rowHead.push(value.slice(0, this.fixedColumnIndex + 1));
          _mainData.push(value.slice(this.fixedColumnIndex + 1));
        })
        
      } else {
        _mainData = this.data;
        
        if (this.columnHead && this.columnHead.length > 0) {
          this.isHadColumnHead = true;
          _columnHead = this.columnHead;
        }
        if (this.rowHead && this.rowHead.length > 0) {
          this._rowHeadFixed = this.rowHeadFixed;
          this.isHadRowHead = true;
          _rowHead = this.rowHead;
        } else {
          this.isHadRowHead = false;
        }
      }
      this.crossHead = crossHead;
      this._columnHead = _columnHead;
      this._rowHead = _rowHead;
      this._mainData = _mainData;

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
            spanWidth += getCellWidth(spanStartRow + i);
            i--;
          }
        } else {
          spanWidth += getCellWidth(spanStartRow);
        }
        if(cellData.rowSpan) {
          let i = cellData.rowSpan - 1;            
          while(i >= 0 ) {
            spanHeight += getCellHeight(spanStartColumn + i);
            i--;
          }  
        } else {
          spanHeight = getCellHeight(spanStartColumn);
        }
        cellData.spanWidth = spanWidth;
        cellData.spanHeight = spanHeight;
      }
    },
    // 设置单元格尺寸数据
    setCellSizeData() {
      let { 
        clientWidth, clientHeight
      } = this.$el;
      this.rowLength = this._mainData.length;
      this.columnLength = this._mainData[0].length;
      // 此处 'fill' 宽度逻辑 应该改为默认 小于 100%，则fill。 否则按照其他填充宽度list
      if (this.columnWidth === 'fill') {
        let i = 0;
        let columnWidthList = [];
        
        let clientWidthContent = clientWidth;
        if (this.isHadRowHead) {
          clientWidthContent = clientWidth - this.rowHeadWidth * this._rowHead[0].length;
        }
        
        let averageWidth = Math.floor(clientWidthContent/this.columnLength*100)/100;
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
        this.getColumnWidth = this.getColumnWidthFromList;
      } if (typeof this.columnWidth === 'number') {
        // ...
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

      // 设置容器尺寸
      if (this.tableHeight === 'auto') {
        // 此处计算高度有问题，应该是动态的        
        let height = this._mainData.length * this.rowHeight;
        if (this.isHadColumnHead) {
          height += this._columnHead.length * this.columnHeadHeight;
        }
        // 此处100%的情况判断有漏洞 后面补上
        if (this.maxHeight && height > this.maxHeight) {
          height = this.maxHeight;
        }
        this.height = `${height}px`;
      } else {
        this.height = this.tableHeight;
      }
      

      
    },
    // 设置滚动条总尺寸
    setAllScrollSize() {
      let allHeight = 0;
      let allWidth = 0;
      
      this._mainData[0].forEach((value, index)=>{
        allWidth += this.getColumnWidth(index);
      })
      if (this.isHadRowHead) {
        this.rowHeadAllWidth = this.rowHeadWidth * this._rowHead[0].length;
        allWidth += this.rowHeadAllWidth;
      }
      this.allWidth = allWidth;
      this._mainData.forEach((value, index)=>{
        allHeight += this.getRowHeight(index);
      })
      if (this.isHadColumnHead) {
        this.columnHeadAllHeight = this.columnHeadHeight * this._columnHead.length;
        allHeight += this.columnHeadAllHeight;
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
    render: function() {
      let curr = countScrollEvet++;
      let now = Date.now();
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
        visibleData[i] = this._mainData[startRowIndex+i].slice(startColumnIndex, endColumnIndex);
        i++;
      }
      let spanStartColumnOffset = 0;
      if (this.fixedColumnIndex) {
        // 固定列的情况: 处理列头数据，data数据时 需要如此判断
        spanStartColumnOffset = this.fixedColumnIndex + 1;
      }
      this.visibleDataSpanList = this.getVisibleSpanList(
        visibleData,
        this._mainData,
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
        this.visibleRowHeadData = this._rowHead.slice(startRowIndex, endRowIndex);
        this.visibleRowHeadSpanList = this.getVisibleSpanList(
          this.visibleRowHeadData,
          this._rowHead,
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
        this._columnHead.forEach((value, index)=>{
          visibleColumnHeadData[index] = value.slice(startColumnIndex, endColumnIndex);
        })
        this.visibleColumnHeadData = visibleColumnHeadData;

        this.visibleColumnHeadSpanList = this.getVisibleSpanList(
          visibleColumnHeadData,
          this._columnHead,
          this.getColumnHeadHeight,
          getColumnWidth,
          0,
          startColumnIndex,
          spanStartColumnOffset
        );

        offsetRowContent = this.columnHeadAllHeight+offsetRow;
      }


      if (this.isHadRowHead) {
        this.rowHeadTransform = `translate3d(${rowHeadTranslateX}px, ${offsetRowContent}px, 0)`;
      }

      if (this.isHadColumnHead) {
        this.columnHeadTransform = `translate3d(${offsetColumnContent}px, ${columnHeadTranslateY}px, 0)`;
      }

      this.contentTransform = `translate3d(${offsetColumnContent}px, ${offsetRowContent}px, 0)`;      
      this.crossHeadTransform = `translate3d(${crossHeadTransformX}px, ${crossHeadTransformY}px, 0)`;
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
              while (i-- > startRowIndex) {
                transformY += getCellHeight(i);
              }
              i = spanStartColumn;
              let transformX = 0;
              while (i-- > startColumnIndex) {
                transformX += getCellWidth(i);
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
        if (this._rowHeadFixed) {
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
  .d_table_allcontent{
    position: absolute;
  }
  .d_table_content{
    position: absolute;
    background: white;
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
    font-size: 0;
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
  .d_table_dataspan_wrap{
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
