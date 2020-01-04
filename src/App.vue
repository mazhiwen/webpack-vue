<template>
  <div class="app">
    <Login v-if="$route.name=='login'"/>  
    <Layout v-else-if="$route.name">
      <router-view />
    </Layout>
  </div>
</template>

<script>
import SYSOUTCONFIGS from 'SYSOUTCONFIG';
import Login from 'views/login';
export default {
  components:{
    Login
  },
  data() {
    return {
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
