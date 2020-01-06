<template>
<div >
  <div
    class="carousel_wrap"
    ref="carousel_wrap"
  >
    <el-button
      @click="onLeftClick"
    >
      左
    </el-button>
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
          {{value.text}}
        </div>
      </div>
    </div>
    <el-button
      @click="onRightClick"
    >
      右
    </el-button>
  </div>





</div>
</template>

<script>

import request from 'request';
import {
  copy
} from 'utils';

// request.login.loginpost();
export default {
  data() {
    return {
      boxWidth: '80%',
      lengthGap: 2,
      // lengthGap 需要小于等于 data总长度
      isTransition: true,
      boxLeft: null,
      data: [
        {
          text: 1
        },
        {
          text: 2
        },
        // {
        //   text: 3
        // },
        // {
        //   text: 4
        // },
        // {
        //   text: 5
        // },
      ],
      renderDataList: [
      ],
      visualItemIndex: null,
      dataOriginLength: null, 
      stepWidth: null,
    };
  },
  created() {
    
  },
  mounted() {

    this.stepWidth = Math.floor((this.$refs['carousel_con_wrap'].offsetWidth) / this.lengthGap);
    this.visualItemIndex = this.lengthGap;
    this.boxLeft = - this.stepWidth * this.lengthGap;
    console.log(this.stepWidth,this.boxLeft);
    this.$nextTick(()=>{
      this.boxWidth = `${-this.boxLeft}px`;
    });
    


    const renderDataList = copy.deepCopy(this.data);
    this.dataOriginLength = this.data.length;
    renderDataList.forEach((value,index)=>{
      
    });
    const tail = renderDataList.slice(0,this.lengthGap);
    const head = renderDataList.slice(-this.lengthGap, this.dataOriginLength);
    
    this.renderDataList = head.concat(renderDataList).concat(tail);;
  },
  methods: {
    onLeftClick() {
      if(!this.isTransition){
        this.isTransition = true;
      }
      
      console.log(this.visualItemIndex);
      
      
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
      console.log(this.visualItemIndex);
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