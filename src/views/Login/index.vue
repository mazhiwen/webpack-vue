<template>
  <div>
    logissssn

    <div class="container">
      <!-- <div class="wrapper">
        <div class="box1" />
      </div> -->
      <div class="box2">
        22
      </div>
      <!-- <div class="box3">
        33
      </div> -->
    </div>
  </div>
</template>

<script>

import request from 'request';
// request.login.loginpost();
export default {
  data() {
    return {
      msg: 'home页面 !',
    };
  },
  created() {

  },
  mounted() {

  },
};
</script>

<style lang="less" scoped>

.container {
    // overflow: hidden;
    // width: 100px;
    // height: 100px;
    background-color: red;
}
// .wrapper {
//     overflow: hidden;
// }
// .box1 {
//     height: 20px;
//     margin: 10px 0;
//     background-color: green;
// }
.box2 {
  height: 20px;
  margin: 20px 0;
  background-color: green;
}
.box3 {
  height: 30px;
  // margin: 20px 0;
  background-color: pink;
}
</style>
