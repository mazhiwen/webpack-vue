
## 启动编译

```sh
yarn
yarn start --API_ENV=环境标识Str
yarn build --API_ENV=环境标识Str
```

## API host配置

src/configs/index.js

```js
API: {
  proxy: {
    prefix: '/proxyAPI/',
  },
  development: {
    prefix: 'http://localhost:3000/',
  },
  integration: {
    prefix: 'https://japi-fat.company.com/company-anti-fraud/api/',
  },
  production: {
    prefix: 'https://channels.company.com/judex/api/',
  },
},
```
```sh
yarn build --API_ENV=development
```

## 本地跨域host

修改  webpackConfig/dev.js -> proxy['/proxyAPI'].target 为需要跨域的host
```js
proxy: {
  '/proxyAPI': {
    target: 'http://localhost:3000',
  }
}
```
```sh
yarn start --API_ENV=proxy
```

## 工具库引用

```js
import {
  localForage,//localStorage
  utiDate,//日期操作
  cookie, //cookie相关操作
  copy,//深拷贝
  dataFormat,//数据格式化
  validator,//正则校验器
} from "utils";
```

## axios XHR请求

```js
import request from 'request';
request.login.loginpost({
  da:2,
  ddddd:3
}).then((res)=>{
  console.log(res);
})
```

## filters全局注册

src/filters/index.js

## 全局组件自动注册

src/components/index.js 会自动注册目录内的组件。  
注册后的组件可以全局直接引用 无需import

## 图片引用

```html

<!-- 作为DataURI引用 -->
<template>
  <div>
    <img :src="logo">
  </div>
</template>

<script>
import logo from 'images/logo.png'
// vue注册
data() {
  return {
    logo
  };
}
</script>

```
## style scoped

深度组件样式影响

```html
<style scoped>
.a >>> .b { /* ... */ }
</style>
```

编译为

```css
.a[data-v-f3f3eg9] .b { /* ... */ }
```

有些像 Sass 之类的预处理器无法正确解析 >>>。这种情况下你可以使用 /deep/ 或 ::v-deep 操作符取而代之——两者都是 >>> 的别名，同样可以正常工作。

## vuex

```js
//////////// 使用 /////////////
import { mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  // ...
  computed: {

    //////////////////////////////mapState
    ...mapState({
      // 箭头函数可使代码更简练
      count: state => state.count,

      // 传字符串参数 'count' 等同于 `state => state.count`
      countAlias: 'count',

      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalState (state) {
        return state.count + this.localCount
      }
    }),
    // mapState 或者当计算属性名称 = 子节点名称时 如下操作
    mapState([
      // 映射 this.count 为 store.state.count
      'count','countA'
    ]),

    //////////////////////////////mapGetters
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
      doneCount: 'doneTodosCount'
    ]),

  },
  methods:{

    //////////////////////////////mapMutations
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })

    //////////////////////////////mapActions
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

## CSS Modules

作为style scoped的替代方案

https://vue-loader.vuejs.org/zh/guide/css-modules.html#%E5%92%8C%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8%E9%85%8D%E5%90%88%E4%BD%BF%E7%94%A8

<style module>
.red {
  color: red;
}
.bold {
  font-weight: bold;
}
</style>

<template>
  <p :class="$style.red">
    This should be red
  </p>
</template>

开启cssmodule需要在webpack css-loader
配置:
```js
options: {
  //开启 CSS Modules
    modules: true,
    // 自定义生成的类名
    localIdentName: '[local]_[hash:base64:8]'
}
```

```js
,
  // "sideEffects": [
  //   "*.css"
  // ]
```