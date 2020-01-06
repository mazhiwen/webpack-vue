<template>
<div >
  <div
    class="carousel_wrap"
    ref="carousel_wrap"
  >
    <Icon
      id="left-arrow"
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
      ],
    },
    lengthGap: {
      type: Number,
      default: 4,
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
    };
  },
  watch: {
    data: {
      handler(val) {
        this.parseData();
      },
      immediate: true,
    }
  },
  created() {
    
  },
  mounted() {
    this.stepWidth = Math.floor((this.$refs['carousel_con_wrap'].offsetWidth) / this.lengthGap);
    this.visualItemIndex = this.lengthGap;
    this.boxLeft = - this.stepWidth * this.lengthGap;
    this.$nextTick(()=>{
      this.boxWidth = `${-this.boxLeft}px`;
    });
    this.parseData();
  },
  methods: {
    parseData() {
      const renderDataList = copy.deepCopy(this.data);
      this.dataOriginLength = this.data.length;
      const tail = renderDataList.slice(0,this.lengthGap);
      const head = renderDataList.slice(-this.lengthGap, this.dataOriginLength);
      
      this.renderDataList = head.concat(renderDataList).concat(tail);
    },
    onLeftClick() {
      if(!this.isTransition){
        this.isTransition = true;
      }
      if(this.visualItemIndex === 1) {
        this.boxLeft += this.stepWidth;
        this.visualItemIndex -= 1;
        setTimeout(()=>{
          this.isTransition = false;
          this.boxLeft = -(this.stepWidth) * (this.dataOriginLength);
          this.visualItemIndex = (this.dataOriginLength);
        },3000);
      } else if (this.visualItemIndex === 0) {
      } else {
        this.boxLeft += this.stepWidth;
        this.visualItemIndex -= 1;
      }
    },
    onRightClick() {
      if(!this.isTransition){
        this.isTransition = true;
      }
      if(this.visualItemIndex === ((this.dataOriginLength + this.lengthGap) - 1)) {
        this.boxLeft -= this.stepWidth;
        this.visualItemIndex += 1;
        setTimeout(()=>{
          this.isTransition = false;
          this.boxLeft = -(this.stepWidth) * this.lengthGap;
          this.visualItemIndex = this.lengthGap;
        },3000);
      } else if(this.visualItemIndex === (this.dataOriginLength + this.lengthGap)) {
      } else {
        this.visualItemIndex += 1;
        this.boxLeft -= this.stepWidth;
      } 
      
      
    }
  }
};
</script>

<style >
</style>

