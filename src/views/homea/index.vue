<template>
  <div class="home">
    <div class="table">
      <div>homea</div>
    </div>
  </div>
</template>

<script lang="ts">

import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';


export default class extends Vue {


}
</script>

<style lang="less" scoped>

.table{
  display: table;
  width: 100px;
  >div{
    display: table-cell;
  }
}

</style>
