<template>

<el-menu
  default-active="2"
  class="left_menu"
  @open="handleOpen"
  @close="handleClose"
>
  <!-- <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span>导航一</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
      <el-menu-item index="1-3">选项3</el-menu-item>
    </el-menu-item-group>
    <el-submenu index="1-4">
      <template slot="title">选项4</template>
      <el-menu-item index="1-4-1">选项1</el-menu-item>
    </el-submenu>
  </el-submenu> -->
  <el-menu-item 
    v-for="(value,index) in menu"
    :key="index"
    :index="index.toString()"
  >
    <i
      v-if="value.icon"
      :class="[value.icon]"
    >
    </i>
    <router-link
      :to="{name: value.name}"
    >
      {{value.text}}
    </router-link>
  </el-menu-item>

</el-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          name: 'carousel',
          icon: 'el-icon-menu',
          text: '无缝轮播'
        },
        {
          name: 'svg',
          icon: 'el-icon-document',
          text: 'svg Map'
        },
        {
          name: 'table',
          icon: 'el-icon-menu',
          text: '表单 列表'
        },
        {
          name: 'echartrelation',
          icon: 'el-icon-menu',
          text: '关系图'
        },
        {
          name: 'echartline',
          icon: 'el-icon-menu',
          text: '折线图'
        }
      ]
    };
  },
  mounted(){

  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
 
  
};
</script>

<style lang="less" >

</style>
