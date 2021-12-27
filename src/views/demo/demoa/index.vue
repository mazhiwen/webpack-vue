<template>
  <div class="page_demoa">
    <Card>
      <transition name="fade">
        <h1 v-if="show">
          content
        </h1>
      </transition>
      <el-button @click="btnClick('a')">a</el-button>
      <el-button @click="btnClick('b')">b</el-button>
    </Card>

    <div class="testa rect" data-title="状态悬浮球">
      testa
      <div class="testb1 rect">
        testb1
      </div>
      <div class="testb2 rect">
        testb2
        <div class="testc rect">
          testc
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">


import { Vue, Component, Prop, Watch } from 'vue-property-decorator'


const throttle = function (fn, interval) {
  const handler = fn;
  let timer;
  let firstTime = true;
  return function () {
    const args = arguments;
    const innerThis = this;
    if (firstTime) {
      handler.apply(innerThis, args);
      firstTime = false;
      return;
    }
    if (timer) {
      return false;
    }
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      handler.apply(innerThis, args);
    }, interval || 500);
  };
};
@Component({
  // components: { Button },
})
export default class extends Vue{
  
  // components: {

  // },
  // props: {

  // },
  show = false
  // computed: {
  // },
  // watch: {
  // },
  // created() {
  // },
  mounted() {
  }

  btnClick(type) {
    import(/* webpackChunkName: "type" */ `./${type}`).then((data) => {
      console.log(data)
    })
  }
  // btnmove: throttle((e) => {
  //   console.log('执行函数', e);
  // }, 100)
  
};
</script>

<style lang="less">
.state-ball {
	overflow: hidden;
	position: relative;
	padding: 5px;
	border: 3px solid #3c9;
	border-radius: 100%;
	width: 150px;
	height: 150px;
	background-color: #fff;
	&::before,
	&::after {
		position: absolute;
		left: 50%;
		top: 0;
		z-index: 20;
		margin-left: -100px;
		width: 200px;
		height: 200px;
		content: "";
	}
	&::before {
		margin-top: -150px;
		border-radius: 45%;
		background-color: rgba(#fff, .5);
		animation: rotate 10s linear -5s infinite;
	}
	&::after {
		margin-top: -160px;
		border-radius: 40%;
		background-color: rgba(#fff, .8);
		animation: rotate 15s infinite;
	}
	&.warning {
		border-color: #f90;
		.wave {
			background-image: linear-gradient(-180deg, #f0c78a 13%, #f90 91%);
		}
	}
	&.danger {
		border-color: #f66;
		.wave {
			background-image: linear-gradient(-180deg, #f78989 13%, #f66 91%);
		}
	}
	.wave {
		position: relative;
		border-radius: 100%;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(-180deg, #af8 13%, #3c9 91%);
	}
}
@keyframes rotate {
	to {
		transform: rotate(1turn);
	}
}

.rect{
  width: 200px;
  
  background: red;
}
.testa{
  
  .testb1{
    height: 200px;
  }
  .testb2{
      position: absolute;
    top: 20px;
    background: yellow;
    width: 300px;
  }
  .testc{
    height: 200px;
    position: fixed;
    top: 0;
    background: green;
  }
}
</style>
