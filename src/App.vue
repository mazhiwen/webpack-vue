<template>
  <div class="app">
    <GlobalSvg />

    <Login v-if="$route.name=='login'" />
    <Layout v-else-if="$route.name">
      <router-view />
    </Layout>
  </div>
</template>

<script>
import Login from 'views/login';
import GlobalSvg from 'components/GlobalSvg';


import logo from 'images/time.jpg';


export default {
  components: {
    Login,
    GlobalSvg,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less">
</style>
