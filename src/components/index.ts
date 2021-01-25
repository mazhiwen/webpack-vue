import Layout from './Layout/index.vue';
import Carousel from './Carousel/index.vue';
import Icon from './Icon/index.vue';
import Card from './Card/index.vue';
import VirtualTable from './VirtualTable/index.vue';


const components = {
  Layout,
  Carousel,
  Icon,
  Card,
  VirtualTable
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
