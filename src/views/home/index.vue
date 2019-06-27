<template>
  <div >{{ msg }}
  
    <div>22</div>
  </div>
</template>

<script>

import {testObj} from "configs";
console.log("home页面取到的obj:",testObj);
export default {
  data () {
    return {
      msg: 'home页面 !'
    }
  }
}
</script>

<style >

</style>