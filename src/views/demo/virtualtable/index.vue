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

while (i<400) {
  data[i] = [];
  let j = 0;
  while (j<400) {
    data[i].push({
      value: `${i}-${j}:${textList[(i+j)%3]}`
    });
    j++;
  }
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
      // itemHeight: 50,
      itemHeight: null,
      itemPositionsCache:[
        // {
        //   top: '',
        //   height: '',
        //   bottom: ''
        // }
      ],
      startIndex: 0,
      lastStartIndex: 0,
      allWidth: 0,
      allHeight: 0,
      heightList: [],
      widthList: [],
      defaultRowHeight: 100,
      defaultColumnWeight: 200,
      startRowIndex: 0,
      startColumnIndex: 0,
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
    this.setAllDomSize();
    

    this.visibleData = this.data.slice(0, 0+6);
  },
  mounted() {
    
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
      this.allWidth = allWidth;
      this.data.forEach((value, index)=>{
        allHeight += this.getRowHeight(index);
      })
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
      const clientHeight = this.$el.clientHeight;
      let curr = countScrollEvet++;

      console.log('onScroll', curr);

      // 不定高的情况
      

      const {
        startRowIndex,offsetRow,endRowIndex,
        startColumnIndex,offsetColumn,endColumnIndex
      } = this.getStartIndexAndOffset();
      let now = Date.now();
      let visibleData = [];
      let i = 0;
      while (i < endRowIndex-startRowIndex ) {
        visibleData[i] = this.data[startRowIndex + i].slice(startColumnIndex, endColumnIndex);
        i++;
      }
      this.visibleData = visibleData;
      this.contentTransform = `translate3d(${offsetColumn}px, ${offsetRow}px, 0)`;
      console.log('设置新的data以及css位置运行耗时：',Date.now() - now);
      
      
      now = Date.now();
      setTimeout(()=>{
        console.log('onScroll 计算之后到下一个tick耗时 :',Date.now() - now, curr);
      },0)
    },
    getStartIndexAndOffset() {
      const { 
        scrollTop,scrollLeft,
        clientWidth,clientHeight
      } = this.$el;
      let now = Date.now();
      // 计算行的 起始索引 最终索引 偏移量
      let startRowIndex = 0;
      let offsetRow = this.getRowHeight(startRowIndex);
      while (offsetRow < scrollTop) {
        ++startRowIndex;
        offsetRow += this.getRowHeight(startRowIndex);
      }
      this.startRowIndex = startRowIndex;
      let endRowIndex = startRowIndex;
      let offsetEndRow = offsetRow;
      const minOffsetEndRow = offsetRow + clientHeight;
      while (offsetEndRow < minOffsetEndRow) {
        ++endRowIndex;
        offsetEndRow += this.getRowHeight(endRowIndex);
      }
      ++endRowIndex;
      offsetRow = offsetRow - this.getRowHeight(startRowIndex);
      // 计算列的 起始索引 最终索引 偏移量
      let startColumnIndex = 0;
      let offsetColumn = this.getColumnWidth(startColumnIndex);
      while (offsetColumn < scrollLeft) {
        ++startColumnIndex;
        offsetColumn += this.getColumnWidth(startColumnIndex);
      }
      this.startColumnIndex = startColumnIndex;
      let endColumnIndex = startColumnIndex;
      let offsetEndColumn = offsetColumn;
      const minOffsetEndColumn = offsetColumn + clientWidth;
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
        offsetColumn
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
      return this.defaultColumnWeight;
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
}
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

</style>
