import Vue from 'vue';
import store from './store';

// 子项目异步注册 store module
Vue.__GLOBAL_POOL__.store && Vue.__GLOBAL_POOL__.store.registerModule(process.env.VUE_APP_NAME, store);

export default null;
