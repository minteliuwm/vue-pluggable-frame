import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const files = require.context('./', false, /\.ts$/);
const modules: any = {};

files.keys().forEach(key => {
  const fileName = key.replace(/(\.\/|\.ts)/g, '');
  if (fileName !== 'index') {
    modules[fileName] = files(key).default;
  }
});

export default new Vuex.Store({
  modules
});
