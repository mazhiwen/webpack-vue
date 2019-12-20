<template>
  <div class="example">
    {{ msg }}
    <div class="aa">
      <router-view />
    </div>


  </div>
</template>

<script>
import SYSOUTCONFIGS from 'SYSOUTCONFIG';

export default {
  data() {
    return {
      msg: 'Hello w2222orld!',
    };
  },
  mounted(){

  }
  
};
</script>

<style lang="less" scoped>

</style>
