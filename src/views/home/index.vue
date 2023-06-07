<template>
  <div class="home">
    <div>
      <div>11111</div>
      <div>222222222222222</div>
      <div style="width: 50rem; height: 35rem; border: 1px solid salmon;">
        <TUICallKit /> <!-- 组件默认显示空内容，进入通话后自动显示 -->
      </div>
    </div>
  </div>
</template>

<script>
import logo from 'images/time.jpg';
import { TUICallKit, TUICallKitServer, TUICallType } from '@tencentcloud/call-uikit-vue2';

import request from 'request';
// request.login.loginpost();
export default {
  components: {
    TUICallKit,
  },
  data() {
    return {
      formData: {
        radio: 6,
      },
      a: '5 &lt; 7',
    };
  },
  created() {

  },
  mounted() {
    this.initTRTC();
    window.addEventListener('storage', (e) => {
      console.log(e);
    });
    console.log(this);
  },
  methods: {
    async initTRTC() {
      const SDKAppID = 1400814400;
      const userID = 'zhengdaclient';
      const userSig = 'eJw1zMsKwjAQBdB-yVpKEtMnuCgWLfaBoOC6NNM4qCXUVkzFfzfWurlwzwz3RY75wXlARyLCHUoWU0cJbY8NTjyeoVWyqq9ocX64y0ulNUoSMUFpwITN3wWeGjuw7roup3-t8fY1L-CoYH7ozyuo7H68GyEz2Z6zdd4kooS0EGCWQ56kQxibUQUl3fJTtZHFirw-M4wz*g__';

      // const userID = 'administrator';
      // const userSig = 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwokpuZl5mcUlRYkl*UVQBcUp2YkFBZkpSlaGJgYGFoYmQBIik1pRkFmUChQ3NTU1MoCJlmTmgsTMLMwMTAzNDc2gpmSmA81PKsoPqsoxitE3TfapCq4sNTHJcCoMzfQrKzcPs-R39XQ2MnEJzygKKk8xTLZVqgUAlYQ1TQ__';
      // administrator

      // eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwokpuZl5mcUlRYkl*UVQBcUp2YkFBZkpSlaGJgYGFoYmQBIik1pRkFmUChQ3NTU1MoCJlmTmgsTMLMwMTAzNDc2gpmSmA81PKsoPqsoxitE3TfapCq4sNTHJcCoMzfQrKzcPs-R39XQ2MnEJzygKKk8xTLZVqgUAlYQ1TQ__

      try {
        await TUICallKitServer.init({ SDKAppID, userID, userSig }); // 关于初始化所需参数，请查看下方基础示例代码
        alert('初始化完成');
      } catch (error) {
        alert(`初始化失败，原因：${error}`);
      }
    },
    testfn() {
      console.log(23123131);
    },
    change() {
      console.log(this.formData);
    },
  },
};
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
