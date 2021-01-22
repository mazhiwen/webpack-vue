<template>
  <div class="app">
    <!-- <GlobalSvg />

    <Login v-if="$route.name=='login'" />
    <Layout v-else-if="$route.name">
      <router-view />
    </Layout> -->text
    {{propB}} {{title}}
    <Layout/>
  </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component({
  // components: { Layout },
})

export default class extends Vue {

  // data
  title = 'data-title'


  //prop
  @Prop(Number) readonly propA: number | undefined
  @Prop({ default: 'prop-propB-ts' }) readonly propB!: string
  @Prop([String, Boolean]) readonly propC: string | boolean | undefined


  // watch
  @Watch('child')
  onChildChanged(val: string, oldVal: string) {}

  // @Watch('person', { immediate: true, deep: true })
  // onPersonChanged1(val: Person, oldVal: Person) {}
 
  // @Watch('person')
  // onPersonChanged2(val: Person, oldVal: Person) {}



}



// 非ts写法
// <script>
// import Login from 'views/login';
// import GlobalSvg from 'components/GlobalSvg';
// import logo from 'images/time.jpg';
// export default {
//   components: {
//     // Login,
//     // GlobalSvg,
//   },
//   data() {
//     return {
//       propB: 'propB'
//     };
//   },
//   mounted() {},
//   methods: {},
// };
// </script>



</script>










