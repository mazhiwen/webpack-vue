<template>
  <router-view v-if="$route.name!=='demo'" />
  <div v-else>
    todo... demo
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
@Component
export default class extends Vue{

};
</script>
