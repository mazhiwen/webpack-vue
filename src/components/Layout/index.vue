<template>
  <el-container class="layout">
    <el-aside 
      width="256px"
    >
      <div
        class="menu_logo"
      >
        <a href="/">
          <img
            :src="logo"
          />
          <h1>
            Admin Marjoven
          </h1>
        </a>
      </div>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <!-- <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu> -->
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>

    </el-aside>
    <el-container>
      <el-header
        height="64px"
      >
        <div>
          折叠菜单
        </div>
        <div
          class="header_right"
        >

          <el-dropdown>
            <span class="el-dropdown-link">
              Marjoven Ma<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
              <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <el-main>
        <div class="layout_content">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import SYSOUTCONFIGS from 'SYSOUTCONFIG';
import logo from 'images/time.jpg';
export default {
  data() {
    return {
      logo,
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

<style lang="less" scoped>

</style>
