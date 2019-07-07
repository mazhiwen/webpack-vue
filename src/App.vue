<template>
  <div class="example">{{ msg }}
  
    <div class="aa">
    
    
        <router-view></router-view>

    </div>
  </div>
</template>

<script>

import axios from 'request/axiosConfig';



export default {
  data () {
    return {
      msg: 'Hello w2222orld!'
    }
  }
}
</script>

<style lang="less">
.example {
  color: red;
  .aa{
    width:100px;
    height:100px;
    background:url('./images/time.jpg')
  }
}
 
</style>