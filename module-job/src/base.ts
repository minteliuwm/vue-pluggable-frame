import Vue from 'vue';
import modules from './store';

const VUE_APP_NAME = process.env.VUE_APP_NAME;

if (Vue.__GLOBAL_POOL__.store) {
  const keys = Object.keys(modules);
  keys.forEach(key => {
    Vue.__GLOBAL_POOL__.store.registerModule(`${VUE_APP_NAME}/${key}`, modules[key]);
  });
}

export default null;
