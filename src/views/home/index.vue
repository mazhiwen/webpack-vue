<template>
  <div class="home">

    <div class="table" ref="aaa">
      <div>11111</div>
        <div>home</div>
    </div>
    


  </div>
</template>

<script>

// import { Vue, Component, Prop, Watch } from 'vue-property-decorator'


// export default class extends Vue{
  

// };

export default {
  mounted() {
    let fra = document.createDocumentFragment();

    var div = document.createElement('div');
    let text = document.createTextNode("Hi there and greetings!");
    div.appendChild(text);
    fra.appendChild(div);
    // this.$refs['aaa'].appendChild(fra);
    console.dir(div);
  }
}

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
