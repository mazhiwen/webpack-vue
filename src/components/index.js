// import AppHeader from './AppHeader';
import Layout from './Layout';
import Carousel from './Carousel';
import Icon from './Icon';
import Card from './Card';
import VirtualTable from './VirtualTable';


const components = {
  // AppHeader,
  Layout,
  Carousel,
  Icon,
  Card,
  VirtualTable
};

const install = function (Vue, opts = {}) {
  if (install.installed) return;
  Object.keys(components).forEach(component => Vue.component(component, components[component]))
};

const API = {
  install,
  ...components,
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}


export default API;
