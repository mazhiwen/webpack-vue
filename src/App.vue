<template>
  <div class="example">{{ msg }}
  
    <div id="aa"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello w2222orld!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
#aa{
  width:100px;
  height:100px;
  
  background:url('./images/time.jpg')
}
</style>