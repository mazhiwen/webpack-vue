<template>
<div >
  <div
    class="carousel_wrap"
    ref="carousel_wrap"
  >
    <Icon
      id="left-arrow"
      class="arrow"
      style="cursor:pointer;font-size: 30px;"
      @click="onLeftClick"
    />
    <div
      ref="carousel_con_wrap"
      class="carousel_con_wrap"
      :style="{
        width:boxWidth
      }"
    >
      <div
        :class="[
          'carousel_con_wrap_inner',
          isTransition?'carousel_transiton':''
        ]"
        :style="{
          left:`${boxLeft}px`
        }"
      >
        <div
          v-for="(value, index) in renderDataList"
          :key="index"
          class="carousel_item"
          :style="{
            width:`${stepWidth}px`
          }"
        >
          <slot :rowData="value">

          </slot>
        </div>
      </div>
    </div>
    <Icon
      id="left-arrow"
      class="arrow"
      style="transform: rotate(180deg);cursor:pointer;font-size: 30px;"
      @click="onRightClick"
    />
  </div>
</div>
</template>

<script>
import {
  copy
} from 'utils';
export default {
  props:{
    data: {
      type: Array,
      default: () => [
        // {
        //   text: 1
        // },
        // {
        //   text: 2
        // },
      ],
    },
    // 视觉长度，一屏放几个块
    lengthGap: {
      type: Number,
      default: 4,
    },
    // 每次滚动几个块
    steps: {
      type: Number,
      default: 4,
    },
    //是否需要无缝滚动
    isInfinite: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      boxWidth: '90%',
      // lengthGap: 2,
      // lengthGap 需要小于等于 data总长度
      isTransition: true,
      boxLeft: null,
      renderDataList: [
      ],
      visualItemIndex: null,
      dataOriginLength: null, 
      stepWidth: null,
      // 数据总长度是否大于视觉长度
      lengthMore: null,
    };
  },
  computed:{

  },
  watch: {
    data: {
      handler(val) {
        this.parseData(val||[]);
        
      },
      // immediate: true,
    }
  },
  created() {
    
  },
  mounted() {
    this.stepWidth = Math.floor((this.$refs['carousel_con_wrap'].offsetWidth) / this.lengthGap);

    
    
    this.parseData(this.data);
  },
  methods: {
    parseData(data) {
      this.visualItemIndex = this.lengthGap;
      this.isTransition = false;
      const renderDataList = copy.deepCopy(data);
      this.$nextTick(()=>{
        this.boxWidth = `${-(this.stepWidth * this.lengthGap)}px`;
      });
      this.dataOriginLength = data.length;
      this.lengthMore = this.dataOriginLength > this.lengthGap;
      if (this.lengthMore && this.isInfinite) {
        this.boxLeft = -this.stepWidth * this.lengthGap;
        
        // this.dataOriginLength = data.length;
        const tail = renderDataList.slice(0,this.lengthGap);
        const head = renderDataList.slice(-this.lengthGap, this.dataOriginLength);
        this.renderDataList = head.concat(renderDataList).concat(tail);
      } else {
        this.boxLeft = 0;
        this.renderDataList = renderDataList;
      }
      
    },

    ////////////////// 注意: 循环 指定steps 的逻辑没有加
    onLeftClick() {
      if (!this.lengthMore) return;
      if (!this.isTransition) {
        this.isTransition = true;
      }
      console.log(this.visualItemIndex, this.dataOriginLength,this.lengthGap);
      if (this.isInfinite) {
        if (this.visualItemIndex === 0) {
          // ...
        } else if (this.visualItemIndex === 1) {
          this.boxLeft += this.stepWidth;
          this.visualItemIndex -= 1;
          setTimeout(() => {
            this.isTransition = false;
            this.boxLeft = -(this.stepWidth) * (this.dataOriginLength);
            this.visualItemIndex = (this.dataOriginLength);
          }, 1000);
        } else {
          this.boxLeft += this.stepWidth;
          this.visualItemIndex -= 1;
        }
      } else {
        if (this.visualItemIndex === this.lengthGap) {
          // ...
        } else if (this.visualItemIndex < (this.steps + this.lengthGap)) {
          this.boxLeft = 0;
          this.visualItemIndex = this.lengthGap;
        } else {
          this.visualItemIndex -= this.steps;
          this.boxLeft += this.stepWidth * this.steps;
        }
      }
    },
    onRightClick() {
      if (!this.lengthMore) return;
      if (!this.isTransition) {
        this.isTransition = true;
      }
      console.log(this.visualItemIndex, this.dataOriginLength,this.lengthGap);
      if (this.isInfinite) {
        if (this.visualItemIndex === (this.dataOriginLength + this.lengthGap)) {
          // ..
        } else if (this.visualItemIndex === ((this.dataOriginLength + this.lengthGap) - 1)) {
          this.boxLeft -= this.stepWidth;
          this.visualItemIndex += 1;
          setTimeout(() => {
            this.isTransition = false;
            this.boxLeft = -(this.stepWidth) * this.lengthGap;
            this.visualItemIndex = this.lengthGap;
          }, 1000);
        } else {
          this.visualItemIndex += 1;
          this.boxLeft -= this.stepWidth;
        }
      } else {
        if (this.visualItemIndex === this.dataOriginLength) {
          // ..
        } else if (this.visualItemIndex > (this.dataOriginLength - this.steps)) {
          this.boxLeft -= this.stepWidth * (this.dataOriginLength - this.visualItemIndex);
          this.visualItemIndex = this.dataOriginLength;
        } else {
          this.visualItemIndex += this.steps;
          this.boxLeft -= this.stepWidth * this.steps;
        }
      }
    },
  },
};
</script>

<style >
</style>
