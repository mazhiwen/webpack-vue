<template>
  <div class="example">
    {{ msg }}
    <div class="aa">
      <router-view />
    </div>
  </div>
</template>

<script>
import request from 'request';
// console.log(request.login.login());
// request.login.loginpost({
//   da:2,
//   ddddd:3
// })

import SYSOUTCONFIGS from 'SYSOUTCONFIG';

console.log(SYSOUTCONFIGS);
console.log(window.SYSOUTCONFIG);

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
</style>
