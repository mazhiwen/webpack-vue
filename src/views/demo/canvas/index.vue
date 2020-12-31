<template>
  <div class="page_demoa">
    <canvas
      id="canvas"
      width="600"
      height="400"
    >

    </canvas>
  </div>
</template>

<script>



export default {
  components: {

  },
  props: {

  },
  data() {
    return {

    };
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
    const  canvas=document.querySelector('#canvas');
    //定义画笔
    const ctx=canvas.getContext('2d');
    //设置画笔的颜色
    ctx.fillStyle='red';
    //开启一次绘制路径
    ctx.beginPath();    
    ctx.moveTo(50,50);
    ctx.lineCap = 'round'
    ctx.lineWidth = 15;
    ctx.lineTo(400,50);
    ctx.fillText('fuck', 60,80)
    // ctx.lineTo(400,300);
    ctx.stroke();
    
    //渲染路径
    ctx.fill()
    ctx.closePath();

  },
  methods: {
    
  },
};
</script>

<style lang="less">
.left,.right{

}

</style>
