<template>
  <div class="example">
    {{ msg }}
    <div class="aa">
      <router-view />
    </div>

      <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>




  </div>
</template>

<script>
import request from 'request';
request.login.loginpost({
  da:2,
  ddddd:3
}).then((res)=>{
  console.log(res);
})

import SYSOUTCONFIGS from 'SYSOUTCONFIG';

console.log(SYSOUTCONFIGS);

export default {
  data() {
    return {
      msg: 'Hello w2222orld!',
      show:true
    };
  },
  
};
</script>

<style lang="less">


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


.example {
  color: @aa;
  .aa {
    width: 100px;
    height: 100px;
    background: url("./images/time.jpg");
  }
}

.test{
  display: flex;
  width:100px;
}
.test >div{
  word-wrap: break-word;
    overflow: hidden;
  // flex-basis:10px;
}
.test div:last-child{
  // flex-grow:1;
}


 *{
        margin: 0;
        padding: 0;
    }
    .wrapper{
        display: flex;
        width: 1000px;
        height: 300px;
    }
    .p1{
        flex: 2;
        border: 1px solid red;
    }
    .p2{
        border: 1px solid red;
        flex: 1;
        display: block;
        overflow: scroll;
    }
    .p3{
        width: 700px;
        height: 200px;
    }

</style>
