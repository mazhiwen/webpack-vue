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
console.log('listData 开始生成');

let textList = [
  '小小',
  '中大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大',
  '大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大大'
];


const listData = [];
let i = 0;
while (i<100) {
  listData.push({
    value: `${i}:${textList[i%3]}`
  });
  i++;
}
console.log('listData 已经生成');
export default {
  data() {
    return {
      listData,
      visibleData: [{value:1}],
      contentTransform: 'translate3d(0, 0, 0)',
      // itemHeight: 50,
      itemHeight: null,
      itemHeightListCache:[]
    };
  },
  computed: {
    allHeight() {
      //allHeight : 实际全部的内容自由撑开的总高度

      // return this.listData.length * this.itemHeight;

      const { listData, getItemHeight } = this;
      let allHeight = 0;
      for (let i = 0, j = listData.length; i < j; i++) {
        allHeight += getItemHeight(i);
      }
      console.log(allHeight);
      return allHeight;
    }
  },
  created() {
    this.visibleData = this.listData.slice(0, 0+6);
  },
  mounted() {
    
  },
  methods: {
    onScroll() {
      // 根据 scrollTop ： 计算视口应该出现的 实际数据列表
      const scrollTop = this.$el.scrollTop;
      const clientHeight = this.$el.clientHeight;
      
      // 定高的情况
      /*
      const startIndex = Math.floor(scrollTop/this.itemHeight);
      // 实际数据列表长度： clientHeight / 每条item高度 + 1
      this.visibleData = this.listData.slice(startIndex, startIndex+ (clientHeight/this.itemHeight + 1));
      // scrollTop%50 为实际DOM第一个元素顶部 距 可视窗口顶部的距离
      this.contentTransform = `translate3d(0, ${scrollTop - scrollTop % this.itemHeight}px, 0)`;
      */


      // 不定高的情况
      let startIndex = 0;
      let scrollTopAdd = this.getItemHeight(startIndex);
      while (scrollTopAdd < scrollTop) {
        ++startIndex;
        scrollTopAdd += this.getItemHeight(startIndex);
      }
      
      this.visibleData = this.listData.slice(startIndex, startIndex+ 6);
      // // scrollTop%50 为实际DOM第一个元素顶部 距 可视窗口顶部的距离
      this.contentTransform = `translate3d(0, ${scrollTopAdd - this.getItemHeight(startIndex)}px, 0)`;

    },
    getItemHeight(index) {
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
