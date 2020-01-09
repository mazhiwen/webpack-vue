<template>
    <router-view v-if="$route.name!=='echart'"></router-view>
    <div v-else>todo...</div>
</template>

<script>

export default {
  data() {
    return {
    };
  },
  created() {
    
  },
  mounted() {
    
  },
};
</script>
