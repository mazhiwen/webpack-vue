<template>
  <router-view v-if="$route.name!=='demo'" />
  <div v-else>
    todo...
  </div>
</template>

<script>

export default {

  data() {
    return {
      aa: 'fkparent'
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {
    parentm() {
      console.log(this.aa);
    }
  }
};
</script>
