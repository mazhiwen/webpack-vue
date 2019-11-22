<template>
  <div class="example">
    {{ msg }}
    <div class="aa">
      <router-view />
    </div>


  </div>
</template>

<script>
import usaJson from './shenzhen.json';

import hangzhou from './hangzhou-track.json';

// const echarts = require('echarts');
// import request from 'request';
// request.login.loginpost({
//   da:2,
//   ddddd:3
// }).then((res)=>{
//   console.log(res);
// })

import SYSOUTCONFIGS from 'SYSOUTCONFIG';

console.log(echarts);

export default {
  data() {
    return {
      msg: 'Hello w2222orld!',
      show:true,
      popUpWin:{
        left:100,
        top:0
      }
    };
  },
  mounted(){

  }
  
};
</script>

<style lang="less" scoped>

</style>
