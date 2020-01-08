<template>
  <div class="app">
    <mycomponent/>
    <Login v-if="$route.name=='login'"/>  
    <Layout v-else-if="$route.name">
      <router-view />
    </Layout>
  </div>

</template>

<script>



import SYSOUTCONFIGS from 'SYSOUTCONFIG';
import Login from 'views/login';

import globalSvg from 'static/global.svg';

const mycomponent = {
  // Props 是可选的
  props: {
    // ...
  },
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (h, context) {
    return (
      <div>23232</div>
    )
  }
}


export default {
  components:{
    Login,
    mycomponent
  },
  data() {
    return {
      globalSvg
    };
  },
  mounted(){
    // console.log(this.$route);
  },
  methods: {

  }
 
  
};
</script>

<style lang="less" scoped>

</style>
