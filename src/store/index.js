import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import configData from './modules/configData';


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const modules = {
  configData,
};

export default new Vuex.Store({
  modules,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
