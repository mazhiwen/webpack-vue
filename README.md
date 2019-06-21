

# vue

webpack基础配置

https://vue-loader.vuejs.org/zh/guide/asset-url.html#%E8%BD%AC%E6%8D%A2%E8%A7%84%E5%88%99


## vue-loader

Vue Loader 还提供了很多酷炫的特性：

- 允许为 Vue 组件的每个部分使用其它的 webpack loader，例如在 \<style> 的部分使用 Sass 和在 \<template> 的部分使用 Pug；  
- 允许在一个 .vue 文件中使用自定义块，并对其运用自定义的 loader 链；
- 使用 webpack loader 将 \<style> 和 \<template> 中引用的资源当作模块依赖来处理；
- 为每个组件模拟出 scoped CSS；
- 在开发过程中使用热重载来保持状态。


## vue-template-compiler

每个 vue 包的新版本发布时，一个相应版本的 vue-template-compiler 也会随之发布。编译器的版本必须和基本的 vue 包保持同步，这样 vue-loader 就会生成兼容运行时的代码。这意味着你每次升级项目中的 vue 包时，也应该匹配升级 vue-template-compiler。

