<template>
  <div class="example">{{ msg }}
  
    <div class="aa">
    
    
        <router-view></router-view>

    </div>
  </div>
</template>

<script>

import {testObj} from "configs";
console.log("app第一次",testObj);
testObj.a="contextPath";
console.log(testObj);

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