<template>
  <div >{{ msg }}
  
    <div>22</div>


    <iframe id="iframe" src="http://localhost:8081/#/home" 
      style="width:800px;height:300px;"
    >
    </iframe>
  </div>
</template>

<script>
// import { dataStructure} from "utility-mar";
// import  dataStructure from "utils/dataStructure";

export default {
  data() {
    return {
      msg: 'home页面 !',
    };
  },
  created() {
    
  },
  mounted() {
    console.log(document.getElementById('iframe'));
    window.addEventListener('message',(event)=>{
      
      console.log('父级收到消息');
      console.log(event);
    });
    window.onload = () => {
      document.getElementById('iframe').contentWindow.postMessage(
        {
          type:2
        },
        'http://localhost:8081',
      );
    };
  },
};
</script>

<style >

</style>