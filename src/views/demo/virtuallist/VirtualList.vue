<template>
  <div
    class="virtuallist_wrap"
    @scroll="onScroll"
  >
    <div
      class="virtuallist_allcontent"
      :style="{
        height: `${allHeight}px`
      }"
    />
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
          height: `${getRowHeight(index)}px`
        }"
      >
        <slot :rowData="value" />
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


const countScrollEvet = 0;


export default {
  props: {
    data: {
      type: Array,
      default: () => [],
      // 需要是一个二维数组
    },
    rowHeight: {
      type: [Function, Number, Array],
      default: 100,
    },
  },
  data() {
    return {
      rowHeightList: [],
      visibleData: [{ value: 1 }],
      contentTransform: 'translate3d(0, 0, 0)',
      // itemHeight: 50,
      itemHeight: null,
      itemPositionsCache: [
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

  },
  watch: {
    data(newV, oldV) {
      // 此处有问题，还需要判断其他影响高度的参数
      // 原scroll 距离偏大时，数据变少，总content高度变低，但是滚动距离scroll距离不会变小
      // 还需要添加 scrollLeft 的情况
      // 新数据长度变小时，把滚动高度置0 否则会计算错误视口高度。
      if (newV.length < oldV.length) {
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
    setContainerSize() {
      const { data, getRowHeight } = this;
      let allHeight = 0;
      for (let i = 0, j = data.length; i < j; i++) {
        allHeight += getRowHeight(i);
      }
      this.allHeight = allHeight;
    },
    init() {
      if (this.data && this.data.length > 0) {
        this.parseParams();
        // this.setCellSizeHandler();
        this.setContainerSize();
        this.$nextTick(() => {
          this.render();
        });
      }
    },
    parseParams() {
      this.visibleData = this.data.slice(0, 0 + 6);
    },
    setItemPositionsCache() {
    },
    onScroll() {
      requestAnimationFrame(this.render);
    },
    render() {
      // 不定高的情况


      const { startRowIndex, offset, endRowIndex } = this.getStartIndexAndOffset(scrollTop);
      this.visibleData = this.data.slice(startRowIndex, endRowIndex);
      this.contentTransform = `translate3d(0, ${offset}px, 0)`;
    },
    getStartIndexAndOffset() {
      const {
        scrollTop, scrollLeft,
        clientWidth, clientHeight,
      } = this.$el;
      // 新的写法

      const scrollTopContent = scrollTop;
      const allHeightContent = this.allHeight;
      const clientHeightContent = clientHeight;
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
      offsetRow -= this.getRowHeight(startRowIndex);
      while (offsetEndRow < minOffsetEndRow) {
        ++endRowIndex;
        offsetEndRow += this.getRowHeight(endRowIndex);
      }
      ++endRowIndex;


      return {
        startIndex,
        offset,
      };
    },
    getRowHeight(rowIndex) {
      if (this.rowHeightList[rowIndex]) {
        return this.rowHeightList[rowIndex];
      }
      return this.rowHeight;
    },
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
