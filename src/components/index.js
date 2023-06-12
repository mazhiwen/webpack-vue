// import AppHeader from './AppHeader';
import Layout from './Layout';
import Icon from './Icon';
import Card from './Card';


const components = {
  // AppHeader,
  Layout,
  Icon,
  Card,
};

const install = function (Vue, opts = {}) {
  if (install.installed) return;
  Object.keys(components).forEach(component => Vue.component(component, components[component]));
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
