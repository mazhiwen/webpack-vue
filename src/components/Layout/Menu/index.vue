<template>

<el-menu
  default-active="2"
  class="left_menu"
  @open="handleOpen"
  @close="handleClose"
>
  
  <div
    v-for="(value,index) in menu"
    :key="index"
  >
    <el-submenu
      v-if="value.children" 
      :index="index.toString()"
    >
      <template slot="title">
        <i
          v-if="value.icon"
          :class="[value.icon]"
        />
        <span>{{value.text}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          v-for="(valuec,indexc) in value.children"
          :key="`${index}-${indexc}`"
          :index="`${index}-${indexc}`"
        >
          <router-link
            :to="{name: valuec.name}"
          >
            {{valuec.text}}
          </router-link>
        </el-menu-item>
      </el-menu-item-group>
      <!-- <el-submenu index="1-4">
        <template slot="title">选项4</template>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu> -->
    </el-submenu>
    <el-menu-item 
      v-else
      :index="index.toString()"
    >
      <i
        v-if="value.icon"
        :class="[value.icon]"
      />
      <router-link
        :to="{name: value.name}"
      >
        {{value.text}}
      </router-link>
    </el-menu-item>
  </div>
  

</el-menu>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
@Component

export default class extends Vue{

  menu = [
    // {
    //   name: 'echart',
    //   icon: 'el-icon-menu',
    //   text: '图表',
    //   children: [
    //     {
    //       name: 'echart.relation',
    //       icon: 'el-icon-menu',
    //       text: '关系图'
    //     },
    //     {
    //       name: 'echart.line',
    //       icon: 'el-icon-menu',
    //       text: '折线图'
    //     }
    //   ]
    // },
    {
      name: 'demoo',
      icon: 'el-icon-menu',
      text: 'demo',
      children: [
        {
          name: 'demo.demoa',
          icon: 'el-icon-menu',
          text: '可以复制demo页面开发'
        },
        {
          name: 'demo.carousel',
          icon: 'el-icon-menu',
          text: '无缝轮播'
        },
        // {
        //   name: 'demo.svg',
        //   icon: 'el-icon-document',
        //   text: 'svg Map'
        // },
        // {
        //   name: 'demo.table',
        //   icon: 'el-icon-menu',
        //   text: '表单 列表'
        // },
        // {
        //   name: 'demo.virtuallist',
        //   icon: 'el-icon-menu',
        //   text: '虚拟列表'
        // },
        // {
        //   name: 'demo.virtualtable',
        //   icon: 'el-icon-menu',
        //   text: 'excel'
        // },
        // {
        //   name: 'demo.canvas',
        //   icon: 'el-icon-menu',
        //   text: 'canvas'
        // },
      ]
    },
  ]


  handleOpen(key, keyPath) {
    console.log(key, keyPath);
  }
  
  handleClose(key, keyPath) {
    console.log(key, keyPath);
  }
  
 
  
};
</script>

<style lang="less" >

</style>
