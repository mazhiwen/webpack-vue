<template>
  <div class="page_demoa">
    <Card>
      <transition name="fade">
        <h1 v-if="show">
          content
        </h1>
      </transition>
    </Card>
    <MarEdit
      :data-controller="ruleDataController"
    />
    <button @click="show=true">
      btn
    </button>
  </div>
</template>

<script>

import {
  copy,
} from 'utils';
import request from 'request';

export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      show: false,
      ruleDataController: new this.$EditorDataController.DataController({
      }),
    };
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style lang="less">

</style>
