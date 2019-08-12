

# vue

webpack基础配置

https://vue-loader.vuejs.org/zh/guide/asset-url.html#%E8%BD%AC%E6%8D%A2%E8%A7%84%E5%88%99

## 
```sh
yarn start --API_ENV=dev
yarn build --API_ENV=dev
```



## vue-loader

Vue Loader 还提供了很多酷炫的特性：

- 允许为 Vue 组件的每个部分使用其它的 webpack loader，例如在 &lt;style&gt; 的部分使用 Sass 和在 &lt;template&gt; 的部分使用 Pug；  
- 允许在一个 .vue 文件中使用自定义块，并对其运用自定义的 loader 链；
- 使用 webpack loader 将 &lt;style&gt; 和 &lt;template&gt; 中引用的资源当作模块依赖来处理；
- 为每个组件模拟出 scoped CSS；
- 在开发过程中使用热重载来保持状态。


## vue-template-compiler

每个 vue 包的新版本发布时，一个相应版本的 vue-template-compiler 也会随之发布。编译器的版本必须和基本的 vue 包保持同步，这样 vue-loader 就会生成兼容运行时的代码。这意味着你每次升级项目中的 vue 包时，也应该匹配升级 vue-template-compiler。



## style scoped

深度组件样式影响
<style scoped>
.a >>> .b { /* ... */ }
</style>

编译为

.a[data-v-f3f3eg9] .b { /* ... */ }

有些像 Sass 之类的预处理器无法正确解析 >>>。这种情况下你可以使用 /deep/ 或 ::v-deep 操作符取而代之——两者都是 >>> 的别名，同样可以正常工作。



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
options: {
  //开启 CSS Modules
    modules: true,
    // 自定义生成的类名
    localIdentName: '[local]_[hash:base64:8]'
}





,
  // "sideEffects": [
  //   "*.css"
  // ]