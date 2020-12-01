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
          height: itemHeight?`${itemHeight}px`:''
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
let now = Date.now();

let textList = [
  '小小',
  '中大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大',
  '大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大'
];


const data = [];
let i = 0;
while (i<100000) {
  data.push({
    value: `${i}:${textList[i%3]}`
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
      const { data, getItemHeight } = this;
      let allHeight = 0;
      for (let i = 0, j = data.length; i < j; i++) {
        allHeight += getItemHeight(i);
      }
      console.log('allHeight 计算耗时',Date.now() - now);
      return allHeight;
    }
  },
  created() {
    this.visibleData = this.data.slice(0, 0+6);
  },
  mounted() {
    
  },
  updated() {
    this.setItemPositionsCache();
  },
  methods: {
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
      // 根据 scrollTop ： 计算视口应该出现的 实际数据列表
      const scrollTop = this.$el.scrollTop;
      const clientHeight = this.$el.clientHeight;
      let curr = countScrollEvet++;

      console.log('onScroll', curr);
      // 定高的情况
      /*
      const startIndex = Math.floor(scrollTop/this.itemHeight);
      // 实际数据列表长度： clientHeight / 每条item高度 + 1
      this.visibleData = this.data.slice(startIndex, startIndex+ (clientHeight/this.itemHeight + 1));
      // scrollTop%50 为实际DOM第一个元素顶部 距 可视窗口顶部的距离
      this.contentTransform = `translate3d(0, ${scrollTop - scrollTop % this.itemHeight}px, 0)`;
      */


      // 不定高的情况
      

      const {startIndex,offset} = this.getStartIndexAndOffset(scrollTop);
      let now = Date.now();
      this.visibleData = this.data.slice(startIndex, startIndex+ 6);
      this.contentTransform = `translate3d(0, ${offset}px, 0)`;
      console.log('设置新的data以及css位置运行耗时：',Date.now() - now);
      
      
      now = Date.now();
      setTimeout(()=>{
        console.log('onScroll 计算之后到下一个tick耗时 :',Date.now() - now, curr);
      },0)
    },
    getStartIndexAndOffset(scrollTop) {
      let now = Date.now();
      let startIndex = 0;
      let offset = this.getItemHeight(startIndex);
      while (offset < scrollTop) {
        ++startIndex;
        let height = this.getItemHeight(startIndex);
        offset += height;
      }
      this.startIndex = startIndex;
      offset = offset - this.getItemHeight(startIndex);
      console.log('getStartIndexAndOffset运行耗时：',Date.now() - now);
      return {
        startIndex,
        offset
      }
    },
    getItemHeight(index) {
      if (this.itemPositionsCache[index]) {
        return this.itemPositionsCache[index].height;
      } 
      return (index%3+1)*37;
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
