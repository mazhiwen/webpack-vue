import Layout from './Layout/index.vue';
// import Carousel from './Carousel';
// import Icon from './Icon';
// import Card from './Card';
// import VirtualTable from './VirtualTable';


const components = {
  Layout,
  // Carousel,
  // Icon,
  // Card,
  // VirtualTable
};

const install: any = function (Vue, opts = {}) {
  if (install.installed) return;
  Object.keys(components).forEach(component => Vue.component(component, components[component]))
};

const API = {
  install,
  ...components,
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}


export default API;
