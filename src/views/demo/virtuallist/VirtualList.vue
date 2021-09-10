<template>

  <div class="virtuallist_wrap"
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
          height: `${getRowHeight(index)}px`
        }"
      >{{value.value}}</div>
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


let countScrollEvet = 0;


export default {
  props:{
    data: {
      type: Array,
      default: () => []
      // 需要是一个二维数组
    },
    rowHeight: {
      type: [ Function, Number, Array ],
      default: 100
    },
  },
  data() {
    return {
      rowHeightList: [],
      visibleData: [{value:1}],
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
    };
  },
  computed: {
    allHeight() {
      //allHeight : 实际全部的内容自由撑开的总高度

      // return this.data.length * this.itemHeight;
      let now = Date.now();
      const { data, getRowHeight } = this;
      let allHeight = 0;
      for (let i = 0, j = data.length; i < j; i++) {
        allHeight += getRowHeight(i);
      }
      console.log('allHeight 计算耗时',Date.now() - now);
      return allHeight;
    }
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
  },
  created() {
    // 
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.data && this.data.length > 0) {
        this.parseParams();
        // this.setCellSizeHandler();
        // this.setContainerSize();
        this.$nextTick(()=>{
          this.render();
        })
      }
    },
    parseParams(){
      this.visibleData = this.data.slice(0, 0+6);
    },
    setItemPositionsCache () {
      // let now = Date.now();      
      // this.$refs.virtuallist_item.forEach((value,index) => {
      //   if(!this.itemPositionsCache[this.startIndex+index]) {
      //     this.itemPositionsCache[this.startIndex+index] = {
      //       height : value.getBoundingClientRect().height
      //     }
      //   }
      // })
    },
    onScroll(){
      requestAnimationFrame(this.render);
    },
    render: function() {
      // 根据 scrollTop ： 计算视口应该出现的 实际数据列表
      const scrollTop = this.$el.scrollTop;
      const clientHeight = this.$el.clientHeight;
      let curr = countScrollEvet++;

      // 定高的情况
      /*
      const startIndex = Math.floor(scrollTop/this.itemHeight);
      // 实际数据列表长度： clientHeight / 每条item高度 + 1
      this.visibleData = this.data.slice(startIndex, startIndex + (clientHeight/this.itemHeight + 1));
      // scrollTop%50 为实际DOM第一个元素顶部 距 可视窗口顶部的距离
      this.contentTransform = `translate3d(0, ${scrollTop - scrollTop % this.itemHeight}px, 0)`;
      */


      // 不定高的情况
      

      const {startIndex,offset} = this.getStartIndexAndOffset(scrollTop);
      let now = Date.now();
      this.visibleData = this.data.slice(startIndex, startIndex+ 6);
      this.contentTransform = `translate3d(0, ${offset}px, 0)`;
      now = Date.now();
    },
    getStartIndexAndOffset(scrollTop) {
      let now = Date.now();
      let startIndex = 0;
      let offset = this.getRowHeight(startIndex);
      while (offset < scrollTop) {
        ++startIndex;
        let height = this.getRowHeight(startIndex);
        offset += height;
      }
      this.startIndex = startIndex;
      offset = offset - this.getRowHeight(startIndex);
      return {
        startIndex,
        offset
      }
    },
    getRowHeight(rowIndex) {
      if (this.rowHeightList[rowIndex]) {
        return this.rowHeightList[rowIndex];
      } 
      return this.rowHeight;
    }
  },
};
</script>

<style lang="less">
.virtuallist_wrap{
  height: 300px;
  width: 300px;
  background: lightgray;
  position: relative;
  overflow: scroll;
  .virtuallist_allcontent{
    position: absolute;
    height: 1000px;
    width: 100%;
    background: lightyellow;
  }
  .virtuallist_visiblecontent{
    position: absolute;
    background: lightpink;
    width: 100%;

  }
  .virtuallist_item{
    // line-height: 50px;
    outline: 1px solid red;
  }
}

</style>
