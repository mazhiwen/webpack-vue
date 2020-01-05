<template>
<div >
  <div
    class="carousel_wrap"
  >
    <el-button
      @click="onLeftClick"
    >
      左
    </el-button>
    <div class="carousel_con_wrap">
      <div
        :class="[
          'carousel_con_wrap_inner',
          isTransition?'carousel_transiton':''
        ]"
        :style="{
          left:`${left}px`
        }"
      >
        <div
          v-for="(value, index) in endList"
          :key="index"
          class="carousel_item"
          
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
      isTransition: true,
      left: -380 * 3,
      endList: [
        {
          text: 2
        },
        {
          text: 3
        },
        {
          text: 4
        },



        {
          text: 1
        },
        {
          text: 2
        },
        {
          text: 3
        },
        {
          text: 4
        },


        {
          text: 1
        },
        {
          text: 2
        },
        {
          text: 3
        },
          
      ],
      visualItemIndex: 3,
      dataOriginLength: 4, 
    };
  },
  created() {
    
  },
  mounted() {
    let startLeft = 0;
    const endList = copy.deepCopy(this.endList);
    endList.forEach((value,index)=>{
      value.left = startLeft;
      startLeft += 380;
    });
    this.endList = endList;
  },
  methods: {
    onLeftClick() {
      // if(!this.isTransition){
      //   this.isTransition = true;
      // }
      // this.visualItemIndex += 1;
      console.log(this.visualItemIndex);
      this.left += 380;
      
      // if(this.visualItemIndex === this.dataOriginLength) {
        
      //   setTimeout(()=>{
      //     this.isTransition = false;
      //     this.left = 0;
      //   },3000);
      // }
    },
    onRightClick() {
      if(!this.isTransition){
        this.isTransition = true;
      }
      this.visualItemIndex += 1;
      console.log(this.visualItemIndex);
      this.left -= 380;
      
      if(this.visualItemIndex === (this.dataOriginLength + 3)) {
        
        setTimeout(()=>{
          this.isTransition = false;
          this.left = -380 * 3;
        },3000);
      } 
      
    }
  }
};
</script>

<style >

</style>