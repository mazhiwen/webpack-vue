<template>
  <div class="app">
    <GlobalSvg/>
    <Login v-if="$route.name=='login'"/>  
    <Layout v-else-if="$route.name">
      <router-view />
    </Layout>
  </div>

</template>

<script>



import SYSOUTCONFIGS from 'SYSOUTCONFIG';
import Login from 'views/login';
import GlobalSvg from 'components/GlobalSvg';



export default {
  components:{
    Login,
    GlobalSvg
  },
  data() {
    return {
    };
  },
  mounted(){
  },
  methods: {

  }
 
  
};
</script>

<style lang="less" scoped>

</style>
