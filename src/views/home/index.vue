<template>
  <div class="home">
    <p class="test">
      哒哒哒哒是的撒的撒哒哒哒哒是的撒的撒哒哒哒哒是的撒的撒哒哒哒哒是的撒的撒
    </p>

    <span class="a">的撒的撒大<span class="b">的撒大</span>
    </span>
  </div>
</template>

<script>

// import { Vue, Component, Prop, Watch } from 'vue-property-decorator'


// export default class extends Vue{


// };


import request from 'request';


const a = null;

export default {
  mounted() {
    console.log(this.$route.params);
    // function AsyncTo(promise) {
    //   return promise.then(data => [null, data]).catch(err => [err]);
    // }
    // const [err, res] = await AsyncTo(Func());
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

.test {
  position: relative;
  line-height: 1.5em;
  /*高度为需要显示的行数*行高，比如这里我们显示两行，则为3*/
  height: 3em;
  overflow: hidden;
  width:100px;
  word-break: break-all;
}
.test:after {
  content: '...';
  // position: absolute;
  // bottom: 0;
  // right: 0;

  // content: "";
  text-align: right;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 50%;
  height: 1.2em;


  background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 50%);

}

.a{
  font-size:23px;
}
.b{
  // font-size: 1em;
  display: inline-block;
  width: 100px;
  height: 0.5em;
  background: red;
}
</style>
