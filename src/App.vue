<template>
  <div class="example">
    {{ msg }}
    <div class="aa">
      <router-view />
    </div>

    <div class="test">
      <div>zhe是腹肌1111111111111111111111单独的的的的</div>
      <div>哈哈的</div>
    </div>
    <div class="wrapper">
    <div class="p1"></div>
    <div class="p2">
            <div class="p3">256</div>
    </div>
</div>



  </div>
</template>

<script>
import request from 'request';
request.login.testMock({
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
    };
  },
  
};
</script>

<style lang="less">
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
