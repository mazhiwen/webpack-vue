<template>
  <div class="page_carousel">
    <Carousel
      :data="data"
      style="height:300px;"
      :isInfinite="true"
    >
      <template
        v-slot:default="slotProps"
      >
        <div
          class="item"
          :style="{
            background:slotProps.rowData.color
          }"
        >
          {{ slotProps.rowData.text }}
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
@Component
export default class extends Vue{

  data = [
    {
      text: 1,
      color: 'red',
    },
    {
      text: 2,
      color: 'blue',
    },
    {
      text: 3,
      color: 'gray',
    },
    {
      text: 4,
      color: 'pink',
    },
    {
      text: 5,
      color: 'gold',
    },
  ]


};
</script>

<style lang="less">

</style>>
