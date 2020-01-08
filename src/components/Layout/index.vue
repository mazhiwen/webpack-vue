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
      <Menu/>

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
import logo from 'images/time.jpg';
import Menu from './Menu';

export default {
  components:{
    Menu
  },
  data() {
    return {
      logo,
    };
  },
  mounted(){

  },
  methods: {
  }
 
  
};
</script>

<style lang="less" >

</style>
