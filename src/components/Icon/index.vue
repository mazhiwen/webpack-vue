<template>
  <svg
    class="icon"
    aria-hidden="true"
    @click="$emit('click')"
  >
    <use
      :xlink:href="`#icon-${id}`"
    />
  </svg>
</template>

<script>

export default {
  props:{
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
    };
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style lang="less">
</style>

