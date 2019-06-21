<template>
  <div :class="$style.example">{{ msg }}
  
    <div :id="$style.aa"></div>
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

<style module>
.example {
  color: red;
}
#aa{
  width:100px;
  height:100px;
  background:url('./images/time.jpg')
}
</style>