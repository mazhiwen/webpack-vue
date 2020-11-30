<template>
  <div class="home">

    <div class="table">
      <div>11111</div>
        <div>222222222222222</div>
    </div>
    


  </div>
</template>

<script>
import logo from 'images/time.jpg'

import request from 'request';
// request.login.loginpost();
export default {
  data() {
    return {
      formData: {
        radio: 6
      },
      a:"5 &lt; 7"
    };
  },
  created() {

  },
  mounted() {
    window.addEventListener('storage', function(e) {  
      console.log(e);
    });
    console.log(this);
  },
  methods: {
    testfn(){
      console.log(23123131);
    },
    change(){
      console.log(this.formData);
    }
  },
};
</script>

<style lang="less" scoped>

.table{
  display: table;
  width: 100px;
  >div{
    display: table-cell;
  }
}

</style>
